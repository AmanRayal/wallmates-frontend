import api from "./api.js";

// search

export const searchWallpapers = async (query, page = 1, limit = 10) => {
  try {
    const res = await api.get(`/api/v1/wallpapers/search`, {
      params: { query, page, limit },
    });

    const resultData = res.data?.message;

    return {
      wallpapers: resultData?.results || [],
      totalResults: resultData?.totalResults || 0,
      totalPages: resultData?.totalPages || 0,
      currentPage: resultData?.currentPage || 1,
    };
  } catch (err) {
    console.error("Search API error:", err);
    return {
      wallpapers: [],
      totalResults: 0,
      totalPages: 0,
      currentPage: 1,
    };
  }
};

// get all wallpapers

export const getAllWallpapers = async (page = 1, limit = 20) => {
  try {
    const res = await api.get(
      `/api/v1/wallpapers/getallWallpapers?page=${page}&limit=${limit}`
    );

    return res.data?.data;
  } catch (error) {
    console.error(
      "Error fetching wallpapers:",
      error?.response?.data || error.message
    );
    return {
      wallpapers: [],
      totalWallpapers: 0,
      currentPage: 1,
      totalPages: 1,
      limit,
    };
  }
};

// Update a wallpaper
export const editUserWallpaper = async (wallpaperId, data) => {
  try {
    const res = await api.put(
      `/api/v1/wallpapers/editUserWallpaper/${wallpaperId}`,
      data
    );
    return res.data;
  } catch (error) {
    console.error(
      "Error updating wallpaper:",
      error?.response?.data || error.message
    );
    throw error;
  }
};

// Delete a wallpaper
export const deleteUserWallpaper = async (wallpaperId) => {
  try {
    const res = await api.delete(`/api/v1/wallpapers/deleteWallpaper/${wallpaperId}`);
    return res.data;
  } catch (error) {
    console.error(
      "Error deleting wallpaper:",
      error?.response?.data || error.message
    );
    throw error;
  }
};

// download wallpaper

export const downloadWallpaper = async (wallpaperId) => {
  try {
    const res = await api.get(`/api/v1/wallpapers/download/${wallpaperId}`);
    return res.data;
  } catch (error) {
    console.error(
      "Error deleting wallpaper:",
      error?.response?.data || error.message
    );
    throw error;
  }
};

// like wallpaper

export const likeWallpaper = async (wallpaperId) => {
  try {
    const res = await api.post(`/api/v1/wallpapers/like/${wallpaperId}`);
    return res.data;
  } catch (error) {
    console.error(
      "Error deleting wallpaper:",
      error?.response?.data || error.message
    );
    throw error;
  }
};

// get like wallpapers
export const getLikedWallpapers = async () => {
  try {
    const res = await api.get("/api/v1/users/likedWallpaper");
    return res.data?.data || [];
  } catch (error) {
    console.error("Failed to fetch liked wallpapers", error);
    return [];
  }
};
