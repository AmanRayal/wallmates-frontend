// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import api from "../services/api";

// const Signup = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     username: "",
//     avatar: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "avatar") {
//       setFormData({ ...formData, avatar: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { fullName, email, password, username, avatar } = formData;

//     // Basic frontend validation
//     if (!fullName || !email || !password || !username) {
//       toast.error("❗ Please fill in all required fields.");
//       return;
//     }

//     // Email format validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       toast.error("❗ Please enter a valid email.");
//       return;
//     }

//     // Password length validation
//     if (password.length < 6) {
//       toast.error("❗ Password must be at least 6 characters.");
//       return;
//     }

//     try {
//       const form = new FormData();
//       form.append("fullName", fullName);
//       form.append("email", email);
//       form.append("password", password);
//       form.append("username", username);
//       if (avatar) form.append("avatar", avatar);

//       console.log("Submitting form data:");
//       for (let [key, value] of form.entries()) {
//         console.log(`${key}:`, value);
//       }

//       const res = await api.post("/users/register", form);
//       console.log("User registered:", res.data);

//       toast.success("🎉 Signup successful! Redirecting to login...");
//       setTimeout(() => {
//         navigate("/login");
//       }, 2000);
//     } catch (error) {
//       const errMsg = error?.response?.data?.message || "Registration failed";
//       toast.error(`❌ ${errMsg}`);
//       console.error("Error:", errMsg);
//     }
//   };

//   return (
//     <>
//       <ToastContainer position="top-center" autoClose={3000} />
//       <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
//         <h2 className="text-2xl font-semibold text-center mb-4">Create an Account</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="fullName"
//             placeholder="Full Name"
//             value={formData.fullName}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//             required
//           />
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={formData.username}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password (min 6 characters)"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//             required
//           />
//           <input
//             type="file"
//             name="avatar"
//             accept="image/*"
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//           />

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//           >
//             Sign Up
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Signup;


import "./Signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../services/api";
import wave from "../assets/output-onlinepngtools(1).png";
import register from "../assets/download(2).svg";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import avatar from "../assets/download(3).svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from "./log-sign-up-nav";


const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    username: "",
    avatar: null,
  });

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [focus, setFocus] = useState({
    fullName: false,
    email: false,
    password: false,
    username: false,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setFormData({ ...formData, avatar: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFocus = (field) => {
    setFocus((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    if (!formData[field]) {
      setFocus((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, password, username, avatar } = formData;

    if (!fullName || !email || !password || !username) {
      toast.error("❗ Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("❗ Please enter a valid email.");
      return;
    }

    if (password.length < 6) {
      toast.error("❗ Password must be at least 6 characters.");
      return;
    }

    try {
      const form = new FormData();
      form.append("fullName", fullName);
      form.append("email", email);
      form.append("password", password);
      form.append("username", username);
      if (avatar) form.append("avatar", avatar);

      const res = await api.post("/users/register", form);
      toast.success("🎉 Signup successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      const errMsg = error?.response?.data?.message || "Registration failed";
      toast.error(`❌ ${errMsg}`);
    }
  };

  return (
    <>
    <Navbar/>
      <ToastContainer position="top-center" autoClose={3000} />
      <img className="signup-wave" src={wave} alt="wave" />
      <div className="signup-container">
        <div className="signup-img">
          <img src={register} alt="background" className="signup-bg-image" />
        </div>
        <div className="signup-content">
          <form onSubmit={handleSubmit} className="signup-form">
            <img src={avatar} alt="avatar" className="login-avatar" />
           <h2 className="signup-title">
  <span className="signup-title-start">New </span>
  <span className="signup-title-span">here!</span>
</h2>


            {/* Full Name Input */}
            <div className={`signup-input-div ${focus.fullName ? "focus" : ""}`}>
              <div className="signup-i">
                <FaUser />
              </div>
              <div className="signup-div">
                <h5 className="signup-label">Full Name</h5>
                <input
                  type="text"
                  name="fullName"
                  className="signup-input"
                  value={formData.fullName}
                  onChange={handleChange}
                  onFocus={() => handleFocus("fullName")}
                  onBlur={() => handleBlur("fullName")}
                  required
                />
              </div>
            </div>

            {/* Username Input */}
            <div className={`signup-input-div ${focus.username ? "focus" : ""}`}>
              <div className="signup-i">
                <FaUser />
              </div>
              <div className="signup-div">
                <h5 className="signup-label">Username</h5>
                <input
                  type="text"
                  name="username"
                  className="signup-input"
                  value={formData.username}
                  onChange={handleChange}
                  onFocus={() => handleFocus("username")}
                  onBlur={() => handleBlur("username")}
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className={`signup-input-div ${focus.email ? "focus" : ""}`}>
              <div className="signup-i">
                <FaEnvelope />
              </div>
              <div className="signup-div">
                <h5 className="signup-label">Email Address</h5>
                <input
                  type="email"
                  name="email"
                  className="signup-input"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={() => handleBlur("email")}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className={`signup-input-div ${focus.password ? "focus" : ""}`}>
              <div className="signup-i">
                <FaLock />
              </div>
              <div className="signup-div">
                <h5 className="signup-label">Password</h5>
                <input
                  type={showPassword ? "text" : "password"} // Toggle between 'password' and 'text' for visibility
                  name="password"
                  className="signup-input"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => handleFocus("password")}
                  onBlur={() => handleBlur("password")}
                  required
                />
                {/* Toggle Password Visibility Icon */}
                <div
                  className="signup-password-toggle"
                  onClick={() => setShowPassword(!showPassword)} 
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            {/* Avatar Upload */}
            <div className="signup-input-div">
              <div className="signup-i">
                <FaUser />
              </div>
              <div className="signup-div">
                <h5 className="signup-label">
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handleChange}
                    className="signup-input"
                    id="input"
                  />
                </h5>
              </div>
            </div>

            <button type="submit" className="signup-btn">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
