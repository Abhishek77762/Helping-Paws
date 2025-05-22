
import User from "../models/user.js";
import Animal from "../models/animal.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body; 
    const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// CRUD for Animals
export const getAllAnimals = async (req, res) => {
  try {
    const animals = await Animal.find();
    res.json(animals);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateAnimal = async (req, res) => {
  try {
    const animalId = req.params.id;
    const updates = req.body; 
    const animal = await Animal.findByIdAndUpdate(animalId, updates, { new: true });
    if (!animal) {
      return res.status(404).json({ message: "Animal not found" });
    }
    res.json(animal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAnimal = async (req, res) => {
  try {
    const animalId = req.params.id;
    const animal = await Animal.findByIdAndDelete(animalId);
    if (!animal) {
      return res.status(404).json({ message: "Animal not found" });
    }
    res.json({ message: "Animal deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
