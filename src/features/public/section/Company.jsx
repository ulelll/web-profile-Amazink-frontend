import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import astonPrinter from '@/assets/astonprinter_figma.png';
import amazink from '@/assets/amazink_figma.png';
import ssi from '@/assets/ssi_figma.png';
import printex from '@/assets/printex_figma.png';
import printfactory from '@/assets/printfactory_figma.png';
import seblakjawara from '@/assets/seblak_figma.png';

function ContentSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      title: "Aston Printer",
      description: " Aston Printer adalah salah satu bidang usaha yang bergerak dibidang retailuntuk brand printer yang sudah tersebar lebih dari10 kota di indonesia",
      image: astonPrinter,
      bgColor: "bg-blue-700",
      link: "#presentations"
    },
    {
      title: "Amazink",
      description: "Ikuti perkembangan industri terbaru dan strategi inovatif kami secara berkala.",
      image: amazink,
      bgColor: "bg-blue-700",
      link: "#newsletters"
    },
    {
      title: "Solusi Simple Indonesia",
      description: "Jelajahi informasi terbaru tentang obligasi Pertamina, peluang investasi, serta komitmen kami terhadap pertumbuhan berkelanjutan.",
      image: ssi,
      bgColor: "bg-blue-700",
      link: "#bonds"
    },
    {
      title: "PRINTEX",
      description: "Printex merupakan Perusahaan yang bergerak dibidang jasa printing untuk textile. seperti hijab, jersey,atau kaos. dan sudah tersebar di 6 kota di indonesia",
      image: printex,
      bgColor: "bg-blue-700",
      link: "#bonds"
    },
    {
      title: "Print Factory",
      description: " Print Factory bergerak dibidang digital printing dengan tujuan untuk membantu perkambangan UMKM disekitarnya. saat ini Print Factory berada di salatiga",
      image: printfactory,
      bgColor: "bg-blue-700",
      link: "#bonds"
    },
    {
      title: " NUSANTARA REMPAH DUNIA",
      description: " Merupakan perusahaan yang bergerak di bidang kuliner yang saat ini telah tersebar di Salatiga dan sekitarnya. Mulai dariSoto Mbok Sini, Ayam Ambarukmo dan Seblak Jawara. ",
      image: seblakjawara,
      bgColor: "bg-blue-700",
      link: "#bonds"
    },
  ];

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="w-full bg-gray-50 py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
            {/* Section Title */}
            <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                Anak Perusahaan
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="relative overflow-hidden">
            {/* Slider Container */}
            <div className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {slides.map((slide, index) => (
                <div key={index} className="min-w-full">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Image Section */}
                    <div className="order-2 md:order-1">
                        <div className="rounded-2xl overflow-hidden shadow-2xl h-[400px] md:h-[500px]">
                        <img 
                            src={slide.image} 
                            alt={slide.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="order-1 md:order-2">
                        <div className={`${slide.bgColor} ${slide.textColor || 'text-white'} rounded-2xl p-8 md:p-12 shadow-xl min-h-[400px] md:min-h-[500px] flex flex-col justify-between`}>
                        <div>
                            <div className="w-12 h-1 bg-white mb-6 rounded-full"></div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                            {slide.title}
                            </h2>
                            <p className={`text-base md:text-lg leading-relaxed ${slide.textColor ? 'text-gray-600' : 'text-blue-100'} mb-8`}>
                            {slide.description}
                            </p>
                        </div>
                        
                        <a 
                            href={slide.link}
                            className={`inline-flex items-center gap-2 ${slide.textColor ? 'text-gray-900 hover:text-blue-700' : 'text-white hover:text-blue-200'} font-semibold transition-colors group`}
                        >
                            <span>Learn More</span>
                            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                        </div>
                    </div>
                    </div>
                </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center md:justify-end gap-4 mt-8">
                <button
                onClick={prevSlide}
                className="p-3 rounded-lg border-2 border-gray-300 hover:border-yellow-500 hover:bg-yellow-50 transition-all group"
                aria-label="Previous slide"
                >
                <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-yellow-500" />
                </button>
                <button
                onClick={nextSlide}
                className="p-3 rounded-lg border-2 border-gray-300 hover:border-yellow-500 hover:bg-yellow-50 transition-all group"
                aria-label="Next slide"
                >
                <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-yellow-500" />
                </button>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-6">
                {slides.map((_, index) => (
                <button
                    key={index} 
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                    currentIndex === index 
                        ? 'w-8 bg-yellow-400' 
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                />
                ))}
            </div>
            </div>
        </div>
        </div>
    );
}

export default ContentSlider;