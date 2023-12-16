// Importa los módulos necesarios y ajusta las rutas según tu estructura
import express from "express";
import * as userCtrl from "../controllers/ControllerUser.js";

const router = express.Router();

router.post("/api/user/register",userCtrl.Register);
router.post("/api/user/login", userCtrl.Login);
router.post("/api/user/logout", userCtrl.Logout);

export { router };
