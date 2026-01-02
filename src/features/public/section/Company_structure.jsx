import React from 'react';
import AstonAPI from "../../../assets/AstonAPI.png";
const StrukturPerusahaan = () => {
    const komisaris = {
        name: "Ahmad Agus Purnawan S.T",
        position: "Komisaris",
        image: "/komisaris.jpg"
    };

    const companies = [
        {
        id: 1,
        name: "Aston Printer Indonesia",
        logo: AstonAPI,
        b2b: true,
        b2c: true
        },
        {
        id: 2,
        name: "Solusi Simpel Indonesia",
        logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop"
        },
        {
        id: 3,
        name: "AMAZINK",
        logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop"
        },
        {
        id: 4,
        name: "Printex",
        logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop"
        },
        {
        id: 5,
        name: "Happy Chili",
        logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop"
        },
        {
        id: 6,
        name: "Print Factory",
        logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop"
        },
        {
        id: 7,
        name: "Wahana sistem Indonesia",
        logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop"
        },
        {
        id: 8,
        name: "Seblak Jawara",
        logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop"
        }
    ];

    return (
        <div className="min-h-screen bg-white py-8 px-4 md:py-16 md:px-8 overflow-hidden relative" id='structure'>
        {/* Background Pattern - Circular Waves */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Wave patterns from bottom left */}
            {[...Array(15)].map((_, i) => (
            <div
                key={i}
                className="absolute border-2 border-gray-400 rounded-full opacity-30"
                style={{
                bottom: '-20%',
                left: '-10%',
                width: `${150 + i * 80}px`,
                height: `${150 + i * 80}px`,
                }}
            ></div>
            ))}
            
            {[...Array(12)].map((_, i) => (
            <div
                key={`r-${i}`}
                className="absolute border-2 border-gray-200 rounded-full opacity-20"
                style={{
                bottom: '-15%',
                right: '-5%',
                width: `${120 + i * 70}px`,
                height: `${120 + i * 70}px`,
                }}
            ></div>
            ))}
        </div>

        {/* Content */}
        <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16">
                <h1 className="text-3xl md:text-5xl font-bold mb-2">
                Struktur <span className="text-yellow-400">Perusahaan</span>
                </h1>
            </div>

            <div className="max-w-7xl mx-auto">
            {/* Layout for All Screens - Centered Vertical */}
            <div className="flex flex-col items-center">
                {/* Komisaris */}
                <div className="bg-white rounded-3xl shadow-xl p-6 w-80 border border-gray-200 mb-4">
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-3">
                        <img 
                            src={komisaris.image}
                            alt={komisaris.name}
                            className="w-full h-full object-cover scale-150 transition-transform duration-300 hover:scale-140"
                        />
                        
                    </div>
                    <h3 className="text-blue-600 font-bold text-sm text-center mb-1">{komisaris.name}</h3>
                    <p className="text-gray-600 text-xs">{komisaris.position}</p>
                </div>
                </div>

                <div className="w-0.5 h-12 bg-gray-300"></div>

                {/* Amazink People Group */}
                <div className="bg-white rounded-3xl shadow-xl p-5 w-64 border-2 border-blue-700 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white-600 rounded-xl flex items-center justify-center">
                        <img
                                    src="/amazink_logo_blue.svg"
                                    alt="Amazink People"
                                    className="w-8 h-8 object-contain"
                                />
                        </div>
                        <div>
                        <p className="text-blue-700 font-bold text-xs">Amazink people</p>
                        <p className="text-blue-700 font-bold text-xs">group</p>
                        </div>
                    </div>
                </div>

                {/* Companies */}
                <div className="flex flex-col gap-4 items-center w-full max-w-md">
                {companies.map((company) => (
                    <div key={company.id} className="w-full">
                    <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full mb-2"></div>
                        <div className="w-0.5 h-8 bg-gray-300 mb-2"></div>
                    </div>
                    <div className="bg-white rounded-3xl shadow-lg p-5 border border-gray-200 hover:shadow-xl transition-shadow">
                        <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                            <div className="w-12 h-12  flex items-center justify-center overflow-hidden">
                                <img
                                    src={company.logo}
                                    alt={company.name}
                                    className="w-16 h-16 object-contain"
                                />
                            </div>

                        </div>
                        <div className="flex-1">
                            <p className="text-gray-800 font-bold text-xs">{company.name}</p>
                        </div>
                        </div>
                        {company.b2b && company.b2c && (
                        <div className="flex gap-2 mt-3 justify-end">
                            <span className="bg-yellow-400 text-white text-xs px-2 py-0.5 rounded-md font-semibold">B2B</span>
                            <span className="bg-yellow-400 text-white text-xs px-2 py-0.5 rounded-md font-semibold">B2C</span>
                        </div>
                        )}
                    </div>
                    </div>
                ))}
                </div>
            </div>

            {/* Footer Note */}
            <div className="mt-16 text-center px-4">
                <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                Saat ini semua cabang dari anak perusahaan Amazink people group tersedia di{' '}
                <span className="font-bold">Jawa timur, Jawa tengah, DKI Jakarta, Banjarmasin</span>
                </p>
            </div>
            </div>
        </div>
        </div>
    );
};

export default StrukturPerusahaan;