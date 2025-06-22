import api from "../../../services/api.js";

export const adminLoginService = async (credentials) => {
  try {
    const res = await api.post("/admin/login", credentials);
    return res.data.message;
  } catch (error) {
    const errMsg =
      error?.response?.data?.message || "Admin login failed. Please try again.";
    throw new Error(errMsg);
  }
};

export const getPendingWallpapers = async () => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    throw new Error("Unauthorized: No admin token found.");
  }

  try {
    const res = await api.get("/admin/pendingWallpapers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.message.pendingWallpapers || [];
  } catch (error) {
    console.error("Error fetching pending wallpapers:", error);
    const message =
      error.response?.data?.message || "Failed to fetch pending wallpapers.";
    throw new Error(message);
  }
};


export const uploadAdminWallpaper = async (formData) => {
  try {
    const res = await api.post("/admin/uploadWallpapers", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.data;
  } catch (error) {
    console.error("Error uploading wallpaper:", error);
    const message =
      error.response?.data?.message || "Wallpaper upload failed.";
    throw new Error(message);
  }
};

// Approve a wallpaper
export const approveWallpaper = async (wallpaperId) => {
  try {
    const res = await api.put(`/admin/approveWallpaper/${wallpaperId}`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });

    
    return res.data.data;
  } catch (error) {
    console.error("Error approving wallpaper:", error);
    const message =
      error.response?.data?.message || "Failed to approve wallpaper.";
    throw new Error(message);
  }
};


// Reject a wallpaper
export const rejectWallpaper = async (wallpaperId) => {
  try {
    const res = await api.delete(`/admin/rejectWallpaper/${wallpaperId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });
    return res.data.message;
  } catch (error) {
    console.error("Error rejecting wallpaper:", error);
    const message =
      error.response?.data?.message || "Failed to reject wallpaper.";
    throw new Error(message);
  }
};
