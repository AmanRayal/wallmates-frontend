import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/v1/users",
  withCredentials: true,
});

export const updateProfile = async (data) => {
  const res = await API.put("/updateProfile", data);
  return res.data;
};
