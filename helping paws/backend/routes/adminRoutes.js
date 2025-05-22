import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { 
  getAllUsers, 
  updateUser, 
  deleteUser,
  getAllAnimals,
  updateAnimal,
  deleteAnimal
} from "../controllers/adminController.js";

const router = express.Router();


router.get("/users", protect("admin"), getAllUsers);
router.put("/users/:id", protect("admin"), updateUser);
router.delete("/users/:id", protect("admin"),  deleteUser);

router.get("/animals", protect("admin"), getAllAnimals);
router.put("/animals/:id", protect("admin"), updateAnimal);
router.delete("/animals/:id",protect("admin"),  deleteAnimal);



export default router;
