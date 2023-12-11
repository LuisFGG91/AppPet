import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
    {
        nick: {
            type: String,
            required: [true, "First name is required"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true, // Asegura que el correo electrónico sea único
            validate: {
                validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: "Please enter a valid email"
            }
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be 8 characters or longer"]
        },
        confirmPassword: {
            type: String,
            validate: {
                validator: function (val) {
                    return val === this.password;
                },
                message: "Password must match confirm password"
            }
        }
    },
    { timestamps: true }
);

// Middleware para validar la confirmación de contraseña
UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

// Middleware para hashear la contraseña antes de guardarla
UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(err => next(err));
});

const User = mongoose.model('User', UserSchema);
export default User;
