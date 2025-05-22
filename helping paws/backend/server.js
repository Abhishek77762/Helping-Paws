import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import ngoRoutes from './routes/ngoRoutes.js';
//import animalRoutes from './routes/animalRoutes.js';
import animalRoutes from "./routes/animalRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import path from "path";
import adminRoutes from './routes/adminRoutes.js';
import { animalNewsLetterCron } from "./Automation/animalCron.js";

const app = express();
app.use(cors({
  origin:['http://localhost:5173'],
  methods:["GET","POST","PUT","DELETE"],
  credentials:true,
  }));
  
app.use(express.json());


  

app.use("/api/animals", animalRoutes);
app.use("/api/upload", uploadRoutes);
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



app.use('/api/users', userRoutes);
app.use('/api/ngos', ngoRoutes);
//app.use('/api/animals', animalRoutes);
app.use('/api/admin', adminRoutes);

//mongodb://localhost:27017/
//animalNewsLetterCron();

mongoose.connect("mongodb://localhost:27017/Animal_paws2")
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

 //app.use("/uploads", express.static("uploads"));
  
const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
