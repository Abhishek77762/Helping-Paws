import React ,{useEffect, useState}from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MainHome from "./pages/MainHome";
import Register from "./pages/Register";
import ReportAnimal from "./pages/ReportAnimal";
import AdminDashboard from "./pages/AdminDashboard";
import Ngo from "./pages/Ngo";
import "./App.css";
import data from "./Info.json"
import UserProfile from "./pages/UserProfile";
import InfoDetails from "./pages/InfoDetails";

function App() {
  const [info, setInfo] = useState([]);
  useEffect(() => {
    setInfo(data);
  }, []);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<MainHome info={info}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/report" element={<ReportAnimal />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/ngo" element={<Ngo />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/info/:id" element={<InfoDetails info={info}/>} />

      </Routes>
    </Router>
  );
}

export default App;

