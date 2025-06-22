import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();

  const cards = [
    { title: "Pending Wallpapers", path: "pending", emoji: "🕓" },
    { title: "Approved Wallpapers", path: "approved", emoji: "✅" },
    { title: "Upload Wallpaper", path: "upload", emoji: "📤" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div
          key={card.path}
          onClick={() => navigate(card.path)}
          className="cursor-pointer bg-white shadow-md rounded-xl p-6 flex flex-col items-center justify-center hover:bg-gray-50 transition"
        >
          <div className="text-4xl">{card.emoji}</div>
          <h3 className="mt-4 text-lg font-semibold">{card.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default AdminHome;
