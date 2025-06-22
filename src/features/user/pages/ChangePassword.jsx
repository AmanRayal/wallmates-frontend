import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        "http://localhost:8000/api/v1/users/changeCurrentPassword",
        formData,
        { withCredentials: true }
      );
      toast.success("Password changed successfully!");
      setFormData({ oldPassword: "", newPassword: "" });
      navigate("/profile");
    } catch (err) {
      toast.error(err.response?.data?.message || "Password change failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1659878997289-b9ab5a0663b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    >
      <div className="absolute inset-0 z-0"></div>

      <div className="relative z-10 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-xl flex flex-col md:flex-row overflow-hidden w-[95%] max-w-5xl animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={() => navigate("/profile")}
          className="absolute top-4 right-4 text-white text-2xl font-bold rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-2xl bg-white/10 hover:bg-white/20 shadow-lg transition duration-300 z-20"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Left Image */}
        <div className="md:w-1/2 w-full p-4 flex items-center justify-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Password Change"
            className="rounded-xl shadow-lg object-cover max-h-[400px] md:max-h-[500px] w-auto overflow-hidden"
          />
        </div>

        {/* Right Form Section */}
        <div className="md:w-1/2 w-full p-8 text-black overflow-hidden">
          <h2 className="text-3xl font-bold mb-6 mt-10 text-center">
            Change Your Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Old Password */}
            <div className="relative">
              <label className="block text-sm font-medium mb-1">Current Password</label>
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                placeholder="Enter current password"
                className="w-full px-4 py-2 pr-10 rounded-lg bg-white/20 border border-white/30 text-black placeholder-black/50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
              <div
               className="absolute inset-y-0 right-3 top-6 flex items-center cursor-pointer text-gray-500 hover:text-blue-400"

                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            {/* New Password */}
            <div className="relative">
              <label className="block text-sm font-medium mb-1">New Password</label>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full px-4 py-2 pr-10 rounded-lg bg-white/20 border border-white/30 text-black placeholder-black/50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
              <div
                className="absolute inset-y-0 right-3 top-6  flex items-center cursor-pointer text-gray-500 hover:text-blue-400"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full h-12 rounded-full text-white text-lg uppercase font-semibold transition-all duration-500 bg-[length:200%] bg-[position:left] ${
                loading
                  ? "bg-blue-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#326cbe] via-[#38a7d3] to-[#3276be] hover:bg-[position:right] cursor-pointer"
              }`}
            >
              {loading ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
