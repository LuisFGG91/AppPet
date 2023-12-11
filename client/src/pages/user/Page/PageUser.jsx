import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container,Typography,TextField,Button,Grid } from "@mui/material";
import { useAuth } from '../../../context/AuthContext';

const RegisterUserPage = () => {
  const { login } = useAuth();
  const [nickNameRegis, setNickNameRegis] = useState("");
  const [mailRegis, setMailRegis] = useState("");
  const [passwordRegis, setPasswordRegis] = useState("");
  const [confirmPasswordRegis, setConfirmPasswordRegis] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const navigate = useNavigate();

  const userRegister = async () => {
    try {
      // Validaciones de campos
      if (
        nickNameRegis === "" ||
        mailRegis === "" ||
        passwordRegis === "" ||
        confirmPasswordRegis === ""
      ) {
        alert("Por favor, completa el formulario");
        return;
      }

      if (passwordRegis !== confirmPasswordRegis) {
        alert("Las contraseñas deben coincidir");
        return;
      }

      // Objeto de usuario para el registro
      const userObj = {
        nick: nickNameRegis,
        email: mailRegis,
        password: passwordRegis,
        confirmPassword: confirmPasswordRegis,
      };

      // Realizar la solicitud HTTP para registrar al usuario
      const responseUser = await axios.post(
        "http://localhost:8110/api/user/register",
        userObj
      );

      // Verificar el estado de la respuesta
      if (responseUser.status !== 201) {
        alert("Hubo un error al registrar el usuario");
        return;
      }

      // Éxito en el registro
      alert("El registro fue exitoso");
      // Limpiar los campos después del registro exitoso
      setNickNameRegis("");
      setMailRegis("");
      setPasswordRegis("");
      setConfirmPasswordRegis("");
    } catch (error) {
      console.error("Error during user registration:", error);
      // Puedes manejar los errores de manera más específica según tus necesidades
      alert("Hubo un error durante el registro del usuario");
    }
  };

  const userLogin = async () => {
    try {
      setLoading(true);
      // Validaciones de campos
      if (emailLogin === '' || passwordLogin === '') {
        alert('Completa el formulario');
        return;
      }

      // Realizar la solicitud HTTP para iniciar sesión
      const response = await axios.post(
        "http://localhost:8110/api/user/login",
        { email: emailLogin, password: passwordLogin }
      );

      // Verificar el estado de la respuesta
      if (response.status === 200) {
        // Login exitoso
        login();
        navigate("/pets");
      } else {
        // Manejar errores de inicio de sesión
        alert("Hubo un error durante el inicio de sesión");
      }
    } catch (error) {
      console.error("Error during user login:", error);
      // Puedes manejar los errores de manera más específica según tus necesidades
      alert("Hubo un error durante el inicio de sesión");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container
      sx={{
        background: "linear-gradient(to top, rgba(0, 107, 129, 1), rgba(0, 107, 129, 0.5))",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to Pet Shelter
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography 
            variant="h5"
            align="center"
            gutterBottom
            sx={{ color: "#003a47" }}>
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nick Name"
              fullWidth
              value={nickNameRegis}
              onChange={(e) => setNickNameRegis(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Email"
              fullWidth
              value={mailRegis}
              onChange={(e) => setMailRegis(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Password"
              fullWidth
              type="password"
              value={passwordRegis}
              onChange={(e) => setPasswordRegis(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Confirm Password"
              fullWidth
              type="password"
              value={confirmPasswordRegis}
              onChange={(e) => setConfirmPasswordRegis(e.target.value)}
              margin="normal"
            />
            <br />
            <Button sx={{ backgroundColor: "#00a3c3" }} variant="contained" color="primary" onClick={userRegister}>
              Register
            </Button>
          </form>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              fullWidth
              value={emailLogin}
              onChange={(e) => setEmailLogin(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Password"
              fullWidth
              type="password"
              value={passwordLogin}
              onChange={(e) => setPasswordLogin(e.target.value)}
              margin="normal"
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={userLogin}
              disabled={loading}
              sx={{ backgroundColor: "#00a3c3" }}
            >
              Login
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegisterUserPage;
