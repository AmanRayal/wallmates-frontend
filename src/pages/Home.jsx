import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
// import CategorySection from "../components/CategorySection.jsx";
import WallpaperGrid from "../features/wallpapers/WallpaperGrid.jsx";
import Footer from "@/components/Footer.jsx";

const Home = () => {
  return (
    <div>
   
      <Navbar />
      <Hero />
      {/* <CategorySection /> */}
      <WallpaperGrid />
      <Footer/>
    </div>
  );
};

export default Home;








