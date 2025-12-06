import React from 'react'
import { Target, Rocket, Users, TrendingUp, Network, Heart } from 'lucide-react'

const Visimisi = () => {
  const misiList = [
    {
      icon: <Users className="w-6 h-6" />,
      text: "Membangun Lingkungan dan Budaya Kerja yang Mendorong Pertumbuhan dan Peningkatan Diri"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      text: "Meningkatkan Kualitas Pelayanan dan Produk Secara Terus Menerus"
    },
    {
      icon: <Network className="w-6 h-6" />,
      text: "Membangun Jaringan Bisnis yang Efektif, Efisien dan Saling Menguntungkan"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      text: "Meningkatkan Kesejahteraan Karyawan secara Adil Seiring Perkembangan Perusahaan"
    }
  ]

return (
    <div className='flex flex-col items-center justify-center mx-auto p-14 md:px-20 lg:px-32 w-full overflow-hidden'>
        {/* Header */}
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-black to-black bg-clip-text text-transparent">
                Visi & Misi
            </span>
            </h2>
            <p className="text-gray-600 text-lg">Membangun masa depan yang lebih baik bersama</p>
        </div>

      {/* Visi Section */}
        <div className="w-full max-w-5xl mb-16">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-yellow-400 p-3 rounded-xl">
                <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800">Visi</h3>
            </div>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
                Kami membangun orang-orang <span className="text-blue-600 font-bold">Amazing</span> (sholih dan kompeten) untuk melakukan hal-hal luar biasa demi masa depan yang lebih baik.
            </p>
            </div>
        </div>

      {/* Misi Section */}
        <div className="w-full max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
            <div className="bg-blue-600 p-3 rounded-xl">
                <Rocket className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800">Misi</h3>
            </div>

        <div className="grid md:grid-cols-2 gap-6">
            {misiList.map((misi, index) => (
                <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 group"
                >
                <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <div className="text-yellow-600">
                        {misi.icon}
                    </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed flex-1 pt-1">
                    {misi.text}
                    </p>
                </div>
                </div>
            ))}
            </div>
        </div>
    </div>
 )
}

export default Visimisi