import express from "express";
import { getAllAnimals, rescueAnimal } from "../controllers/ngoController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.get("/animals", protect("ngo"),  getAllAnimals);
router.put("/rescue/:id", protect("ngo"), rescueAnimal);

export default router;
