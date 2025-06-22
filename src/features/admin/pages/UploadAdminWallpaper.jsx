import { useState } from "react";
import { toast } from "react-toastify";
import  { uploadAdminWallpaper}   from "../services/adminService.js";

const UploadAdminWallpaper = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    resolution: "",
    tags: "",
    file: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.file) {
      return toast.error("Please select a file!");
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));

    try {
      setLoading(true);
      await uploadAdminWallpaper(formData);
      toast.success("Wallpaper uploaded successfully!");
      setForm({
        title: "",
        description: "",
        category: "",
        resolution: "",
        tags: "",
        file: null,
      });
    } catch (err) {
      toast.error(err.message || "Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Upload Admin Wallpaper</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title *"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="category"
            placeholder="Category *"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="resolution"
            placeholder="Resolution (e.g. 1920x1080)"
            value={form.resolution}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma-separated)"
            value={form.tags}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="file"
            name="file"
            accept="image/*,video/*"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Wallpaper"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadAdminWallpaper;
