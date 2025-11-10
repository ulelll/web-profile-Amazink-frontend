import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; 
import logoAmazinkWhite from "../assets/amazink_logo_white.svg";
import logoAmazinkBlue from "../assets/amazink_logo_blue.svg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if scrolled down from top
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Show/hide navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setVisible(false);
      } else {
        // Scrolling up
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${
        scrolled 
          ? "bg-white shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32">
        {/* logo */}
        <img
          src={scrolled ? logoAmazinkBlue : logoAmazinkWhite}
          alt="Logo amazink"
          className={`h-auto select-none transition-all duration-300 ${
            scrolled ? "w-16" : "w-16"
          }`}
        />

        {/* desktop nav */}
        <ul className={`hidden md:flex gap-7 font-medium transition-colors duration-300 ${
          scrolled ? "text-gray-800" : "text-white"
        }`}>
          <a href="#Header" className={`transition ${scrolled ? "hover:text-blue-600" : "hover:text-gray-400"}`}>Home</a>
          <a href="#About" className={`transition ${scrolled ? "hover:text-blue-600" : "hover:text-gray-400"}`}>Tentang Kami</a>
          <a href="#Visi" className={`transition ${scrolled ? "hover:text-blue-600" : "hover:text-gray-400"}`}>Visi-Misi</a>
          <a href="#Anakperusahaan" className={`transition ${scrolled ? "hover:text-blue-600" : "hover:text-gray-400"}`}>Struktur perusahaan</a>
          <a href="#gallery" className={`transition ${scrolled ? "hover:text-blue-600" : "hover:text-gray-400"}`}>Gallery</a>
          <a href="#karir" className={`transition ${scrolled ? "hover:text-blue-600" : "hover:text-gray-400"}`}>Karir</a>
        </ul>

        {/* desktop button */}
        <button className={`hidden md:block px-8 py-2 rounded-full transition-all duration-300 ${
          scrolled 
            ? "bg-blue-600 text-white hover:bg-blue-700" 
            : "bg-white text-black hover:bg-gray-100"
        }`}>
          Masuk
        </button>

        {/* mobile menu icon */}
        <div 
          className={`md:hidden cursor-pointer z-30 transition-colors duration-300 ${
            scrolled ? "text-gray-800" : "text-white"
          }`} 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* mobile drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 bg-white text-gray-800 flex flex-col items-start gap-6 px-8 py-20 overflow-hidden transform transition-transform duration-300 ease-in-out shadow-2xl ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      > 
        <a href="#Header" className="hover:text-blue-600 transition" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="#About" className="hover:text-blue-600 transition" onClick={() => setMenuOpen(false)}>Tentang Kami</a>
        <a href="#Visi" className="hover:text-blue-600 transition" onClick={() => setMenuOpen(false)}>Visi-Misi</a>
        <a href="#Anakperusahaan" className="hover:text-blue-600 transition" onClick={() => setMenuOpen(false)}>Struktur perusahaan</a>
        <a href="#gallery" className="hover:text-blue-600 transition" onClick={() => setMenuOpen(false)}>Gallery</a>
        <a href="#karir" className="hover:text-blue-600 transition" onClick={() => setMenuOpen(false)}>Karir</a>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition" onClick={() => setMenuOpen(false)}>
          Masuk
        </button>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Navbar;