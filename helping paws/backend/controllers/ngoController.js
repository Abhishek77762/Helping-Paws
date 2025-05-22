
import Animal from "../models/animal.js";


export const getAllAnimals = async (req, res) => {
  try {
    const animals = await Animal.find({ isRescued: false}).populate("reportedBy", "name email");
    res.json(animals);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const rescueAnimal = async (req, res) => {
  try {
    const { id } = req.params;
    const animal = await Animal.findById(id);
    if (!animal) {
      return res.status(404).json({ message: "Animal not found" });
    }
    if (animal.isRescued) {
      return res.status(400).json({ message: "Animal is already rescued" });
    }

    animal.isRescued = true;
    animal.rescuedBy = req.user._id; 
    await animal.save();

    res.json({ message: "Animal successfully rescued", animal });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
