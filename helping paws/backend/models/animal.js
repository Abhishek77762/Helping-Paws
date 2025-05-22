import mongoose from "mongoose";

const animalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  location: { type: String, required: true }, 
  image: { type: String, required: true },
  isRescued: { type: Boolean, default: false },  
  rescuedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
});

export default mongoose.model("Animal", animalSchema);
