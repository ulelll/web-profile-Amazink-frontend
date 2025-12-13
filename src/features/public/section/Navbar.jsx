import logoAmazinkBlue from "@/assets/amazink_logo_blue.svg";
import logoAmazinkWhite from "@/assets/amazink_logo_white.svg";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

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
    <>

      <div
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${visible ? "translate-y-0" : "-translate-y-full"
          } ${scrolled
            ? "bg-white shadow-lg"
            : "bg-transparent"
          }`}
      >
        <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32">
          {/* logo */}
          <img
            src={scrolled ? logoAmazinkBlue : logoAmazinkWhite}
            alt="Logo amazink"
            className={`h-auto select-none transition-all duration-300 ${scrolled ? "w-16" : "w-16"
              }`}
          />

          {/* desktop nav */}
          <ul className={`hidden md:flex gap-7 font-medium transition-colors duration-300 ${scrolled ? "text-gray-800" : "text-white"
            }`}>
            <a href="#Header" className={`transition ${scrolled ? "hover:text-blue-600" : "hover:text-gray-400"}`}>Home</a>
            <a href="#About" className={`transition ${scrolled ? "hover:text-blue-600" : "hover:text-gray-400"}`}>Tentang Kami</a>
            <a href="#Visi" className={`transition ${scrolled ? "hover:text-blue-600" : "hover:text-gray-400"}`}>Visi-Misi</a>
            <a href="#structure" className={`transition ${scrolled ? "hover:text-blue-600" : "hover:text-gray-400"}`}>Struktur perusahaan</a>
            <a href="#subCompany" className={`transition ${scrolled ? "hover:text-blue-600" : "hover:text-gray-400"}`}>Gallery</a>
            <a href="#news" className={`transition ${scrolled ? "hover:text-blue-600" : "hover:text-gray-400"}`}>Berita</a>
          </ul>

          {/* desktop button */}
          <button className={`hidden md:block px-8 py-2 rounded-full transition-all duration-300 ${scrolled
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-white text-black hover:bg-gray-100"
            }`}>
            Masuk
          </button>

          {/* mobile menu icon */}
          <div
            className={`md:hidden cursor-pointer z-30 transition-colors duration-300 ${scrolled ? "text-gray-800" : "text-white"
              }`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </div>
        </div>
      </div>


      {
        menuOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )
      }

      {/* DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white text-gray-800 flex flex-col justify-between px-6 py-6 transform transition-transform duration-300 ease-in-out shadow-2xl z-50 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* header */}
        <div className="flex items-center justify-between mb-8">
          <img
            src={logoAmazinkBlue}
            alt="Logo amazink"
            className="w-20 select-none"
          />
          <button onClick={() => setMenuOpen(false)}>
            <X size={26} />
          </button>
        </div>

        {/* nav links */}
        <nav className="flex flex-col gap-5 text-base font-medium">
          {[
            { href: "#Header", label: "Home" },
            { href: "#About", label: "Tentang Kami" },
            { href: "#Visi", label: "Visi-Misi" },
            { href: "#Anakperusahaan", label: "Struktur Perusahaan" },
            { href: "#gallery", label: "Gallery" },
            { href: "#karir", label: "Karir" },
          ].map(item => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-600 transition"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* footer button */}
        <div className="mt-10">
          <button
            onClick={() => setMenuOpen(false)}
            className="w-full bg-blue-600 text-white py-3 rounded-full
      hover:bg-blue-700 transition"
          >
            Masuk
          </button>
        </div>
      </div>
    </>

  );
};

export default Navbar;