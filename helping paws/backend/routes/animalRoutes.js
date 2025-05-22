import express from "express";
import Animal from "../models/animal.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();


router.post("/createanimal",protect("user"), async (req, res) => {
  const { name, species, location, image } = req.body;
  try {
    const newAnimal = new Animal({ name, species, location, image });
    await newAnimal.save();
    res.status(201).json(newAnimal);
  } catch (err) {
    res.status(500).json({ error: "Error saving animal details" });
  }
});


router.get("/getanimal", protect("user"), async (req, res) => {
  try {
    const animals = await Animal.find();
    res.json(animals);
  } catch (err) {
    res.status(500).json({ error: "Error fetching animals" });
  }
});

export default router;

