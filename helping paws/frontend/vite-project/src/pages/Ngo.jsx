import React, { useEffect, useState } from "react";
import api from "../services/api"; 

function NGOPanel() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAnimals();
  }, []);

  
  const fetchAnimals = async () => {
    setLoading(true);
    try {
      const response = await api.get("ngos/animals"); 
      setAnimals(response.data);
    } catch (error) {
      console.error("Error fetching animals:", error.response?.data?.message || error.message);
    }
    setLoading(false);
  };


  const rescueAnimal = async (id) => {
    try {
      const response = await api.put(`ngos/rescue/${id}`); 
      setAnimals((prevAnimals) =>
        prevAnimals.map((animal) =>
          animal._id === id ? { ...animal, isRescued: true, rescuedBy: "Current NGO User" } : animal
        )
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error rescuing animal:", error.response?.data?.message || error.message);
      alert("Failed to mark as rescued. Ensure you are logged in.");
    }
  };

  return (
    <div className=" p-6 bg-blue-100  min-h-screen flex flex-col">
         <li className="  text-2xl w-25 pl-5 h-10 bg-blue-200 pt-1 shadow list-none text-amber-50 " onClick={() => {window.location.href="/userprofile"}}>Profile</li>
      <h2 className=" text-3xl font-bold mb-14 flex justify-center HeaderText ">NGO Animal Rescue Panel</h2>

      {loading ? (
        <p>Loading animals...</p>
      ) : animals.length === 0 ? (
        <p>No unrescued animals available.</p>
      ) : (
        <ul className="  grid grid-cols-3 gap-5    ">
          {animals.map((animal) => (
            <li key={animal._id} className="border-0 p-4 rounded-xl shadow NGOardShadow bg-white">
              <h3 className="text-2xl font-semibold italic">{animal.name}</h3>
              <p className="text-gray-700">Species: {animal.species}</p>

              <p>
                Location:{" "}
                <a
                  href={`${(animal.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View on Google Maps
                </a>
              </p>

              <img
                src={animal.image}
                alt={animal.name}
                className="w-full h-40 object-cover rounded mt-2"
              />

              <p className="text-gray-600 mt-2">
                Reported by: {animal.reportedBy?.name || "Unknown"} ({animal.reportedBy?.email || "N/A"})
              </p>

              {animal.isRescued ? (
                <p className="text-green-600 mt-2">Rescued by: {animal.rescuedBy?.name || "NGO"}</p>
              ) : (
                <button
                  onClick={() => rescueAnimal(animal._id)}
                  className="mt-3 px-4 py-2 bg-green-600 text-white rounded w-full"
                >
                  Mark as Rescued
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NGOPanel;

