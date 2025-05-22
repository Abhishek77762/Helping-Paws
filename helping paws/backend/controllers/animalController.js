import Animal from "../models/animal";
export const createanimal =async (req, res) => {
  const { name, species, location, image } = req.body;
  try {
    const newAnimal = new Animal({ name, species, location, image });
    await newAnimal.save();
    res.status(201).json(newAnimal);
  } catch (err) {
    res.status(500).json({ error: "Error saving animal details" });
  }
}


export const getanimal= async (req, res) => {
  try {
    const animals = await Animal.find();
    res.json(animals);
  } catch (err) {
    res.status(500).json({ error: "Error fetching animals" });
  }
}