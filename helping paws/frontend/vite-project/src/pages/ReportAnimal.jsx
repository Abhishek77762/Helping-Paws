import React, { useState } from "react";
import api from "../services/api"; 
import reportAnimation from "../Video Material/ReportAnimation.mp4";

function ReportAnimal() {
  const [location, setLocation] = useState(""); 
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  //const [detail , setDetail] = useState("");

  
  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

        
          const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
          setLocation(mapsUrl);
        },
        (error) => {
          console.error("Error fetching location:", error.message);
          alert("Failed to get location.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };


  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (!file) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setImageUrl(data.imageUrl);
      } else {
        alert("Error uploading image.");
      }
    } catch (error) {
      console.error("Image upload error:", error.message);
    }
  };

  
  const handleSubmit = async () => {
    if (!name || !species || !location || !imageUrl) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    try {
      const response = await api.post("/animals/createanimal", {
        name,
        species,
        location, 
        image: imageUrl,
        reportedBy: "userId-placeholder", 
      });

      if (response.status === 201) {
        alert("Animal reported successfully!");
        setName("");
        setSpecies("");
        setLocation("");
        setImageUrl("");
      } else {
        alert("Error submitting details.");
      }
    } catch (error) {
      console.error("Submission error:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-around p-6 space-x-4 min-h-screen bg-amber-50">


      <video src={reportAnimation} autoPlay loop muted className="w-96 h-96 mb-4 mix-blend-multiply " />

    
      

      <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 text-6xl font-bold
      mb-30">ANIMAL DETAILS</h1>
<div className="flex flex-col space-y-4  p-12 rounded-lg shadowBox bg-transparent bg-opacity-50 "> 
<input
        type="text"
        placeholder="Animal Name"
        className="border p-4 rounded mb-5 w-120 text-amber-600"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

   
<input
        type="text"
        placeholder="Species"
        className="border p-4 rounded mb-5 w-120 text-amber-600"
        value={species}
        onChange={(e) => setSpecies(e.target.value)}
      />
      <button
        onClick={getLocation}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Get Current Location
      </button>

      {location && (
        <p className="mb-2">
          <a
            href={location}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View Location on Google Maps
          </a>
        </p>
      )}

      <input type="file" onChange={handleImageUpload} className="mb-2" />
      {imageUrl && (
        <img src={imageUrl} alt="Uploaded" className="w-32 h-32 object-cover mb-2" />
      )}

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Submit Report
      </button>
      </div>
    </div>
  );
}

export default ReportAnimal;

