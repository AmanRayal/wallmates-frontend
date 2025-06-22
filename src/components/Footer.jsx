import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#1e1f24] text-gray-300 pt-10 pb-6 relative">
      <div className="max-w-5xl mx-auto px-4 text-center">

        {/* Intro Text Instead of App Badges */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white">
            Discover Stunning Wallpapers
          </h3>
          <p className="text-sm text-gray-400">
            Explore, Search, and Download Free HD Backgrounds
          </p>
        </div>

        {/* Footer Links */}
        <div className="text-sm text-gray-400 mb-4 space-x-4 flex justify-center flex-wrap">
          <a href="#" className="hover:underline">Privacy</a>
          <span>|</span>
          <a href="#" className="hover:underline">TOS</a>
          <span>|</span>
          <a href="#" className="hover:underline">Copyright</a>
          <span>|</span>
          <a href="#" className="hover:underline">Contact Us</a>
        </div>

      
        <div className="text-sm text-gray-500">
          © 2024–{new Date().getFullYear()} wallmates.in 
        </div>
      </div>

    
      <a
        href="#"
        className="fixed bottom-6 right-6 bg-lime-400 hover:bg-lime-500 text-black p-2 rounded-full shadow-lg transition"
        aria-label="Scroll to top"
      >
        ↑
      </a>
    </footer>
  );
};

export default Footer;
