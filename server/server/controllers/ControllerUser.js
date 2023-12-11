import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/ModelUser.js';

const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const passwordIsValid = await bcrypt.compare(password, user.password);

            if (passwordIsValid) {
                const newJWT = jwt.sign({ _id: user._id }, "mysecret");
                res.cookie("usertoken", newJWT, { httpOnly: true }).json({ success: true, userId: user._id });
            } else {
                res.status(200).json({ success: false });
            }
        } else {
            res.status(200).json({ success: false });
        }
    } catch (error) {
        console.error('Error en la autenticación:', error);
        res.status(500).json({ success: false, error: 'Error en la autenticación' });
    }
};

const Register = async (req, res) => {
    try {
        // Extraer datos del cuerpo de la solicitud
        const { nick, email, password, confirmPassword } = req.body;

        // Verificar si la contraseña y la confirmación coinciden
        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: 'Password and confirmPassword do not match' });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear una instancia del modelo User
        const user = new User({ nick, email, password: hashedPassword, confirmPassword: hashedPassword });

        // Guardar el usuario en la base de datos
        await user.save();

        // Devolver una respuesta exitosa
        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        // Manejar errores durante el registro
        console.error(error);

        // Verificar si el error es de validación (por ejemplo, contraseña no coincidente)
        if (error.errors) {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ success: false, errors: validationErrors });
        }

        // Otros errores, devolver un mensaje genérico de error
        res.status(500).json({ success: false, message: 'Error registering user' });
    }
};
const Logout = (req, res) => {
    try {
        // Eliminar la cookie del token de usuario
        res.clearCookie('usertoken', { httpOnly: true });

        // Respondemos con un código 200 (OK) para indicar que el cierre de sesión fue exitoso
        res.status(200).json({ success: true, message: 'Logout successful' });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ success: false, error: 'Error during logout' });
    }
};
export { Login, Register, Logout };
