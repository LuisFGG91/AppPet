import express from "express";
import * as petCtrl from "../controllers/ControllerPet.js";

const router = express.Router();

router.post("/api/pet/create", petCtrl.createPet);
router.get("/api/pet/get", petCtrl.getPets);
router.get("/api/pet/get/:idPet", petCtrl.getOnePet);
router.delete("/api/pet/delete/:idPet", petCtrl.deletePet);
router.put("/api/pet/adopt/:idPet", petCtrl.adoptPet);
router.put("/api/pet/like/:idPet", petCtrl.likePet);

export { router };
