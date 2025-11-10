import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Youtube, MapPin, Phone, Mail } from 'lucide-react';

function Footer() {
  const socialMedia = [
    { icon: Facebook, link: "#", label: "Facebook" },
    { icon: Instagram, link: "#", label: "Instagram" },
    { icon: Twitter, link: "#", label: "Twitter" },
    { icon: Linkedin, link: "#", label: "LinkedIn" },
    { icon: Youtube, link: "#", label: "YouTube" }
  ];

  const menuLinks = [
    { title: "Beranda", link: "#home" },
    { title: "Tentang Kami", link: "#about" },
    { title: "Layanan", link: "#services" },
    { title: "Produk", link: "#products" },
    { title: "Karir", link: "#career" },
    { title: "Kontak", link: "#contact" }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Left Section - Social Media & Address */}
          <div className="space-y-6">
            <div>
              <h3 className="text-white text-xl font-bold mb-4">Amazink People Group</h3>
              <p className="text-sm text-gray-400 mb-6">
                Membangun masa depan dengan SDM yang sholih dan kompeten
              </p>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-white font-semibold mb-3">Ikuti Kami</h4>
              <div className="flex gap-3">
                {socialMedia.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.link}
                      aria-label={social.label}
                      className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors group"
                    >
                      <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Address */}
            <div className="space-y-3">
              <h4 className="text-white font-semibold mb-3">Alamat Kantor</h4>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                <p className="text-sm">
                   Jl. Watubelang 1, Noborejo, Kec. Argomulyo, Kota Salatiga, Jawa Tengah 50736
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <p className="text-sm">0813-9127-2655</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <p className="text-sm">info@amazink.co.id</p>
              </div>
            </div>
          </div>

          {/* Middle Section - Menu Links */}
          <div className="space-y-6">
            <div>
              <h4 className="text-white font-semibold mb-4">Menu</h4>
              <ul className="space-y-2">
                {menuLinks.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.link}
                      className="text-sm hover:text-blue-400 transition-colors inline-block hover:translate-x-1 transform duration-200"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div className="pt-4 border-t border-gray-800">
              <h4 className="text-white font-semibold mb-3">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#privacy"
                    className="text-sm hover:text-blue-400 transition-colors inline-block hover:translate-x-1 transform duration-200"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#terms"
                    className="text-sm hover:text-blue-400 transition-colors inline-block hover:translate-x-1 transform duration-200"
                  >
                    Terms and Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Section - Map */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold mb-4">Lokasi Kami</h4>
            <div className="rounded-lg overflow-hidden shadow-lg h-64 md:h-80 lg:h-full border border-gray-800">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.47536947892973!2d110.50630158461634!3d-7.371852097061858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a797dbd4b3915%3A0x5e830f9c86389490!2sAmazink%20People%20Group!5e0!3m2!1sen!2sid!4v1729772000000!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Kantor Amazink People Group"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 text-center md:text-left">
              © {new Date().getFullYear()} Amazink People Group. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 text-center md:text-right">
              Designed with ❤️ in Salatiga
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;