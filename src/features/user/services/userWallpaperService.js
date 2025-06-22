import API from "../../../services/api.js"; 

export const getUserWallpapers = async (page = 1, limit = 20) => {
  try {
    const res = await API.get(`/wallpapers/getUserWallpaper?page=${page}&limit=${limit}`);
    return res.data?.data?.wallpaper || [];
  } catch (error) {
    console.error("Error fetching user wallpapers:", error?.response?.data || error.message);
    return [];
  }
};
