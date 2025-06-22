import axios from "axios";

const API = axios.create({
  baseURL: "https://wallmates-backend.onrender.com/api/v1/users",
  withCredentials: true,
});

export const updateProfile = async (data) => {
  const res = await API.put("/updateProfile", data);
  return res.data;
};
