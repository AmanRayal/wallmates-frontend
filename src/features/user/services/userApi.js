import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1/users`,
  withCredentials: true,
});

export const updateProfile = async (data) => {
  const res = await API.put("/updateProfile", data);
  return res.data;
};
