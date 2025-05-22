
import React ,{useState} from "react";
import UserProfile from "../pages/UserProfile";

const Header = () => {
  const [showProfile, setShowProfile] = useState(false);


  return (
    <div className="Header w-full bg-blue-100  ">
      <nav className="flex items-center p-4 z-10   ">
        <img src="/Logo.jpg" className="logo" />
        <ul
          className=" w-full grid grid-cols-4 grid-rows-1 gap-2
          cursor-pointer pl-10"
        >

        </ul>
        <ul className=" w-60 grid grid-cols-2 grid-rows-1 gap-5 cursor-pointer">
          <li className="  text-2xl w-25 pl-5 h-10 bg-blue-300 pt-1 shadow list-none text-amber-50" onClick={() => { window.location.href = "/report" }}>Report</li>
          <li className="  text-2xl w-25 pl-5 h-10 bg-blue-300 pt-1 shadow list-none text-amber-50 " onClick={() => { setShowProfile(true) }}>Profile</li>
        </ul>
      </nav>

      {/* Add User profile */}
      {showProfile && (
        <UserProfile
          onClose={() => setShowProfile(false)}
        />
      )}
      
      

    </div>
  )
}

export default Header