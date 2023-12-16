import express from "express";
import * as reviewCtrl from "../controllers/ControllerReview.js";
import * as jwtAuth from "../config/jwt.config.js";


const router = express.Router();

router.post("/api/movie/:idMovie/review/create", jwtAuth.authenticate, reviewCtrl.createReview);
router.get("/api/movie/:idMovie/review/get", jwtAuth.authenticate, reviewCtrl.getReviews);
router.get("/api/movie/:idMovie/review/get/:idReview", jwtAuth.authenticate, reviewCtrl.getOneReview);
router.delete("/api/movie/:idMovie/review/delete/:idReview", jwtAuth.authenticate, reviewCtrl.deleteReview);

/*
router.post("/api/movie/:idMovie/review/create", jwtAuth.authenticate, reviewCtrl.createReview);
router.get("/api/movie/:idMovie/review/get", jwtAuth.authenticate, reviewCtrl.getReviews);
router.get("/api/movie/:idMovie/review/get/:idReview", jwtAuth.authenticate, reviewCtrl.getOneReview);
router.delete("/api/movie/:idMovie/review/delete/:idReview", jwtAuth.authenticate, reviewCtrl.deleteReview);

*/
export { router };
