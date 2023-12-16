import express from "express";
import * as movieCtrl from "../controllers/ControllerMovie.js";
import * as jwtAuth from "../config/jwt.config.js";


const router = express.Router();

// Rutas para las películas
router.post("/api/movie/create", jwtAuth.authenticate, movieCtrl.createMovie);
router.get("/api/movie/get", jwtAuth.authenticate, movieCtrl.getMovies);
router.get("/api/movie/:idMovie", jwtAuth.authenticate, movieCtrl.getOneMovie);
router.put("/api/movie/:idMovie", jwtAuth.authenticate, movieCtrl.updateMovie);
router.delete("/api/movie/:idMovie", jwtAuth.authenticate, movieCtrl.deleteMovie);


/*

router.post("/movies", jwtAuth.authenticate, movieCtrl.createMovie);
router.get("/movies", jwtAuth.authenticate, movieCtrl.getMovies);
router.get("/movies/:idMovie", jwtAuth.authenticate, movieCtrl.getOneMovie);
router.put("/movies/:idMovie", jwtAuth.authenticate, movieCtrl.updateMovie);
router.delete("/movies/:idMovie", jwtAuth.authenticate, movieCtrl.deleteMovie);

*/

export { router };