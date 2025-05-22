import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function UserProfile({ onClose }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get("users/profile");
        setUser(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleClose = () => {
    if (onClose) onClose();

    if (user?.role === "admin") {
      navigate("/admin");
    } else if (user?.role === "ngo") {
      navigate("/ngo");
    } else {
      navigate("/home");
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center">
        <p className="text-white text-lg">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center">
        <p className="text-red-600 font-semibold">Error: {error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center">
        <p className="text-gray-600">No user data available.</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
        >
          ✕
        </button>
        <div className="space-y-4">
          <p>
            <strong className="font-semibold">Name:</strong> {user.name}
          </p>
          <p>
            <strong className="font-semibold">Email:</strong> {user.email}
          </p>
          <p>
            <strong className="font-semibold">Role:</strong> {user.role || "User"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
