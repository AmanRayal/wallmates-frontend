import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";

const wallpapers = [
  "/wall1.jpg",
  "/wall2.jpg",
  "/wall3.jpg",
  "/wall4.jpg",

];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % wallpapers.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?q=${e.target.value}`);
    }
  };

  return (
    <section className="relative h-[100vh] sm:h-[100vh] min-h-[400px] w-full overflow-hidden -mt-24.5 bg-black">
  {/* Background Layer */}
  <div className="absolute inset-0 z-0 transition-opacity duration-[2000ms] ease-in-out">
    {wallpapers.map((wall, i) => (
      <div
        key={i}
        className={`absolute inset-0 bg-center bg-cover transition-opacity duration-[2000ms] ease-in-out transform scale-110 pointer-events-none`}
        style={{
          backgroundImage: `url(${wall})`,
          opacity: i === index ? 1 : 0,
          zIndex: 0, // consistent z-index
        }}
      ></div>
    ))}
  </div>

  {/* Content Layer */}
  <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 sm:px-10 text-center z-20">
    <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow-xl leading-tight">
      Discover Stunning Wallpapers
    </h1>
    <p className="text-lg sm:text-xl mb-6 drop-shadow-md">
      Explore, Search, and Download Free HD Backgrounds
    </p>

    {/* Search Input */}
   <div className="w-full max-w-md relative">
  <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400 transition-all duration-300 ease-in-out" />
  <Input
    type="text"
    placeholder="Search wallpapers..."
    onKeyDown={handleSearch}
    className="pl-14 py-3 rounded-full bg-white text-black border-2 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none hover:border-blue-300 hover:ring-2 hover:ring-blue-300 transition-all duration-300 ease-in-out shadow-md"
  />
</div>


  </div>
</section>



  );
};

export default Hero;
