// import { useNavigate, Link } from "react-router-dom";
// // import { Button } from "@/components/ui/button";
// import useAuthStore from "../store/authStore.js";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { useState, useRef, useEffect } from "react";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const user = useAuthStore((state) => state.user);
//   const logout = useAuthStore((state) => state.logout);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const handleLogout = async () => {
//     try {
//       await axios.post(
//         "http://localhost:8000/api/v1/users/logout",
//         {},
//         { withCredentials: true }
//       );
//       logout();
//       toast.success("Logged out successfully!");
//       navigate("/");
//     } catch (error) {
//       toast.error("Logout failed. Please try again.");
//       console.error("Logout Error:", error);
//     }
//   };

//   const handleProfileClick = () => {
//     navigate("/profile");
//     setDropdownOpen(false);
//   };

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const defaultAvatar =
//     "https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_1280.png";

//   return (
// <header className="w-full sticky top-0 z-50 backdrop-blur-sm bg-white/10 border-b border-white/10 shadow-lg">
//   <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between"> {/* Changed py-4 to py-6 */}
//     <Link
//   to="/"
//   className="
//     inline-block
//     text-lg font-bold text-white
//     transition-all
//     relative duration-300 ease-in-out
//     hover:text-blue-400
//     after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px]
//     after:bg-blue-400 after:transition-all after:duration-500 hover:after:w-full
//     sm:text-2xl
//   "
// >
//   <span className="text-blue-400 text-3xl " >Wall</span>mates
// </Link>



//     {user ? (
//       <div className="relative flex items-center space-x-4" ref={dropdownRef}>
//         <button
//           onClick={() => setDropdownOpen((prev) => !prev)}
//           className="focus:outline-none"
//         >
//           <img
//             src={user.avatar || defaultAvatar}
//             alt="avatar"
//             className="w-12 h-12 rounded-full object-cover border border-white/40 shadow-lg backdrop-blur-md"
//           />
//         </button>

//         {/* Dropdown */}
//         <div
//           className={`absolute right-0 top-14 backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl rounded-md w-44 z-50 transition-all duration-200 ease-out ${
//             dropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
//           }`}
//         >
//           <button
//             onClick={handleProfileClick}
//             className="w-full text-left px-4 py-2 text-white hover:bg-white/10"
//           >
//             Profile
//           </button>
//           <button
//             onClick={handleLogout}
//             className="w-full text-left px-4 py-2 text-red-300 hover:bg-white/10"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     ) : (
//       <div className="space-x-3 flex items-center">
//         <Link to="/login">
//           <button className="px-5 py-2 rounded-full border-2 border-blue-400 backdrop-blur-md bg-white/10 text-black font-semibold shadow-[0_0_12px_rgba(59,130,246,0.4)] hover:shadow-[0_0_14px_4px_rgba(59,130,246,0.5)] hover:text-blue-500 text-lg transition duration-300">
//             Login
//           </button>
//         </Link>
//         <Link to="/signup">
//           <button className="px-5 py-2 rounded-full border-2 border-purple-400 backdrop-blur-md bg-white/10 text-black font-semibold shadow-[0_0_20px_rgba(128,0,128,0.6)] hover:shadow-[0_0_24px_6px_rgba(128,0,128,0.75)]
//  hover:text-purple-500 text-lg transition duration-300">
//             Sign Up
//           </button>
//         </Link>
//       </div>
//     )}
//   </div>
// </header>
//   );
// };

// export default Navbar;




import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../store/authStore.js";
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa"; // Import icons

const Navbar = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://wallmates-backend.onrender.com",
        {},
        { withCredentials: true }
      );
      logout();
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout Error:", error);
    }
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setDropdownOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const defaultAvatar =
    "https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_1280.png";

  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur-sm bg-white/10 border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        <Link
          to="/"
          className="inline-block text-lg font-bold text-white transition-all relative duration-300 ease-in-out hover:text-blue-400 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-400 after:transition-all after:duration-500 hover:after:w-full sm:text-2xl"
        >
          <span className="text-blue-400 text-3xl">Wall</span>mates
        </Link>

        {user ? (
          <div className="relative flex items-center space-x-4" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="focus:outline-none"
            >
              {/* Profile Image */}
              <img
                src={user.avatar || defaultAvatar}
                alt="avatar"
                className="w-12 h-12 rounded-full object-cover border border-white/40 shadow-lg backdrop-blur-md"
              />
            </button>

            {/* Dropdown */}
            <div
  className={`absolute right-0 top-14 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-xl w-72 z-50 transition-all duration-200 ease-out transform ${
    dropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
  }`}
>
  {/* Profile Info */}
  <div className="px-5 py-4 text-white flex items-center space-x-4">
    <img
      src={user.avatar || defaultAvatar}
      alt="avatar"
      className="w-16 h-16 rounded-full object-cover border-2 border-white/30 shadow-md"
    />
    <div className="text-left">
      <h3 className="text-base font-semibold">{user.username}</h3>
      <p className="text-sm text-gray-300 truncate">{user.email}</p>
    </div>
  </div>

  <hr className="border-white/20" />

  {/* Dropdown Options */}
  <div className="py-2">
    <button
      onClick={handleProfileClick}
      className="w-full flex items-center gap-3 px-5 py-3 text-sm text-white hover:bg-white/20 transition rounded-md"
    >
      <FaUserCircle className="text-green-300 text-lg" />
      <span>Profile</span>
    </button>

    <button
      onClick={handleLogout}
      className="w-full flex items-center gap-3 px-5 py-3 text-sm text-red-300 hover:bg-red-400/20 transition rounded-md"
    >
      <FaSignOutAlt className="text-red-300 text-lg" />
      <span>Logout</span>
    </button>
  </div>
</div>

          </div>
        ) : (
          <div className="space-x-3 flex items-center">
            <Link to="/login">
              <button className="px-5 py-2 rounded-full border-2 border-blue-400 backdrop-blur-md bg-white/10 text-black font-semibold shadow-[0_0_12px_rgba(59,130,246,0.4)] hover:shadow-[0_0_14px_4px_rgba(59,130,246,0.5)] hover:text-blue-500 text-lg transition duration-300">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-5 py-2 rounded-full border-2 border-purple-400 backdrop-blur-md bg-white/10 text-black font-semibold shadow-[0_0_20px_rgba(128,0,128,0.6)] hover:shadow-[0_0_24px_6px_rgba(128,0,128,0.75)] hover:text-purple-500 text-lg transition duration-300">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;


