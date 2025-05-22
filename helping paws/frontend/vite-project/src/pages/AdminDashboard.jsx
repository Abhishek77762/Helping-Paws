import React, { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [animals, setAnimals] = useState([]);
  
  
  const [editUserId, setEditUserId] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({ name: "", email: "", role: "" });


  const [editAnimalId, setEditAnimalId] = useState(null);
  const [updatedAnimalData, setUpdatedAnimalData] = useState({ species: "", location: "", isRescued: false });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userRes = await api.get("admin/users");
      setUsers(userRes.data);

      const animalRes = await api.get("admin/animals");
      setAnimals(animalRes.data);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Deletes a user by their ID from the admin panel.
 * 
 * @param {string} id - The unique identifier of the user to delete.
 * 
 * This function makes an API call to delete the specified user and updates the local state
 * to remove the deleted user from the list. Logs an error message if the operation fails.
 */

/*******  e0a5a866-034a-452c-9787-fca2615960ce  *******/
  const deleteUser = async (id) => {
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  const deleteAnimal = async (id) => {
    try {
      await api.delete(`/admin/animals/${id}`);
      setAnimals(animals.filter((animal) => animal._id !== id));
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  const updateUser = async (id) => {
    try {
      const response = await api.put(`/admin/users/${id}`, updatedUserData);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === id ? response.data : user))
      );
      setEditUserId(null); 
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  const updateAnimal = async (id) => {
    try {
      const response = await api.put(`/admin/animals/${id}`, updatedAnimalData);
      setAnimals((prevAnimals) =>
        prevAnimals.map((animal) => (animal._id === id ? response.data : animal))
      );
      setEditAnimalId(null);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className=" absolute w-full p-6  bg-gray-100 min-h-screen border-l border-r">
      <li className="  text-2xl w-25 pl-5 h-10 bg-blue-200 pt-1 shadow list-none text-amber-50 " onClick={() => {window.location.href="/userprofile"}}>Profile</li>
      <div className="flex items-center justify-center  ">
      
   
      <h2 className="HeaderText text-xl  border-2 p-2  ">Admin Dashboard</h2>
           </div>

      {/* Users Section */}
      <h3 className="HeaderText fformbox mb-2 mt-25">All Users</h3>
      <ul className="mb-6 ">
        {users.map((user) => (
          <li key={user._id} className="p-4 border-b flex items-center justify-between pb-8 text-2xl ShadowBox">
            {editUserId === user._id ? (
              <div className="flex  EditUser space-x-2">
                <input
                  type="text"
                  value={updatedUserData.name}
                  onChange={(e) => setUpdatedUserData({ ...updatedUserData, name: e.target.value })}
                  placeholder="Name"
                  className="border p-2 rounded"
                />
                <input
                  type="email"
                  value={updatedUserData.email}
                  onChange={(e) => setUpdatedUserData({ ...updatedUserData, email: e.target.value })}
                  placeholder="Email"
                  className="border  p-2 rounded"
                />
                <input
                  type="text"
                  value={updatedUserData.role}
                  onChange={(e) => setUpdatedUserData({ ...updatedUserData, role: e.target.value })}
                  placeholder="Role"
                  className="border p-2 rounded"
                  />
              
                  </div>
            ) : (
              <span>{user.name} ({user.email}) - Role: {user.role}</span>
            )}

            <div className="space-x-2 SavCanbtn">
              {editUserId === user._id ? (
                <>
                  <button
                  onClick={() => updateUser(user._id)}
                  className="BtnCss px-3 py-1 bg-green-600 text-white rounded"
                  >
                  Save
                </button>
                <button
                  onClick={() => setEditUserId(null)}
                  className="px-3 BtnCss py-1 bg-gray-500 text-white rounded"
                  >
                  Cancel
                </button>
                  </>

              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditUserId(user._id);
                      setUpdatedUserData({ name: user.name, email: user.email, role: user.role });
                    }}
                    className="px-3 py-1 bg-blue-500 BtnCss mb-3.5 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="px-3 BtnCss py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Animals Section */}
      <h3 className="text-2xl HeaderText formbox  font-semibold mb-2">All Animals</h3>
      <ul>
        {animals.map((animal) => (
          <li key={animal._id} className="p-4 border-b flex items-center animalList justify-between ShadowBox">
            {editAnimalId === animal._id ? (
              <div className="flex EditUser  space-x-2">
                <input
                  type="text"
                  value={updatedAnimalData.species}
                  onChange={(e) => setUpdatedAnimalData({ ...updatedAnimalData, species: e.target.value })}
                  placeholder="Species"
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  value={updatedAnimalData.location}
                  onChange={(e) => setUpdatedAnimalData({ ...updatedAnimalData, location: e.target.value })}
                  placeholder="Location URL"
                  className="border pb-1.5 rounded"
                />
                <select
                  value={updatedAnimalData.isRescued}
                  onChange={(e) => setUpdatedAnimalData({ ...updatedAnimalData, isRescued: e.target.value === "true" })}
                  className="border p-2 mb-2.5 rounded"
                >
                  <option value="false">Not Rescued</option>
                  <option value="true">Rescued</option>
                </select>
                <button
                  onClick={() => updateAnimal(animal._id)}
                  className="px-5  py-2 bg-green-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <span>
                {animal.species} - <a href={animal.location} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Location</a> - {animal.isRescued ? "Rescued" : "Not rescued"}
              </span>
            )}

            <div className="space-x-2 SavCanbtn">
              {editAnimalId === animal._id ? (
                <button
                  onClick={() => setEditAnimalId(null)}
                  className="px-3 BtnCss py-1 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditAnimalId(animal._id);
                      setUpdatedAnimalData({ species: animal.species, location: animal.location, isRescued: animal.isRescued });
                    }}
                    className="px-3 py-1 bg-blue-500 BtnCss text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteAnimal(animal._id)}
                    className="px-3 py-1 bg-red-600 BtnCss text-white rounded"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
