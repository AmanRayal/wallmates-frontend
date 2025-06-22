// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import api from "../services/api";
// import useAuthStore from "../store/authStore.js";

// const Login = () => {
//   const navigate = useNavigate();
//   const setAuth = useAuthStore((state) => state.setAuth);

//   const [formData, setFormData] = useState({
//     emailOrUsername: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { emailOrUsername, password } = formData;

//     if (!emailOrUsername || !password) {
//       toast.error("Please fill all fields.");
//       return;
//     }

//     const isEmail = emailOrUsername.includes("@");
//     const payload = isEmail
//       ? { email: emailOrUsername, password }
//       : { username: emailOrUsername, password };

//     try {
//       const res = await api.post("/users/login", payload);
//       const { user, accessToken } = res.data?.data;

//       setAuth({ user, accessToken });

//       toast.success("🎉 Login successful!");
//       setTimeout(() => navigate("/"), 1500);
//     } catch (error) {
//       const errMsg = error?.response?.data?.message || "Login failed";
//       toast.error(`❌ ${errMsg}`);
//     }
//   };

//   return (
//     <>
//       <ToastContainer position="top-center" autoClose={3000} />
//       <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
//         <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="emailOrUsername"
//             placeholder="Email or Username"
//             value={formData.emailOrUsername}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Login;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../services/api";
import useAuthStore from "../store/authStore.js";
import "./Login.css"; // CSS file
import wave from "../assets/output-onlinepngtools.png"; // Image paths
import bg from "../assets/download(1).svg";
import avatar from "../assets/download.svg"; 
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; 
import Navbar from "./log-sign-up-nav";

const Login = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });

  const [focus, setFocus] = useState({
    emailOrUsername: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

    const { emailOrUsername, password } = formData;

    if (!emailOrUsername || !password) {
      toast.error("Please fill all fields.");
      return;
    }

    const isEmail = emailOrUsername.includes("@");
    const payload = isEmail
      ? { email: emailOrUsername, password }
      : { username: emailOrUsername, password };

    try {
      const res = await api.post("/users/login", payload);
      const { user, accessToken } = res.data?.data;

      setAuth({ user, accessToken });

      toast.success("🎉 Login successful!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      const errMsg = error?.response?.data?.message || "Login failed";
      toast.error(`❌ ${errMsg}`);
    }
  };

  return (
    <>
    <Navbar/>
      <ToastContainer position="top-center" autoClose={3000} />
      <img className="login-wave" src={wave} alt="wave" />
      <div className="login-container">
        <div className="login-img">
          <img src={bg} alt="background" className="login-bg-image" />
        </div>
        <div className="login-content">
          <form onSubmit={handleSubmit} className="login-form">
            <img src={avatar} alt="avatar" className="login-avatar" />
          <h2 className="login-title">
  <span className="login-title-start">Wel</span>
  <span className="login-title-span">come</span>
</h2>



            {/* Username Input */}
            <div
              className={`login-input-div one ${
                focus.emailOrUsername ? "focus" : ""
              }`}
            >
              <div className="login-i">
                <FaUser />
              </div>
              <div className="login-div">
                <h5 className="login-label">Username</h5>
                <input
                  type="text"
                  name="emailOrUsername"
                  className="login-input"
                  value={formData.emailOrUsername}
                  onChange={handleChange}
                  onFocus={() => handleFocus("emailOrUsername")}
                  onBlur={() => handleBlur("emailOrUsername")}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className={`login-input-div pass ${focus.password ? "focus" : ""}`}>
              <div className="login-i">
                <FaLock />
              </div>
              <div className="login-div">
                <h5 className="login-label">Password</h5>
                <input
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  className="login-input"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => handleFocus("password")}
                  onBlur={() => handleBlur("password")}
                  required
                />
                 <div
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)} // Toggle show/hide password
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              </div>
             
            </div>
            <input type="submit" className="login-btn" value="Login" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
