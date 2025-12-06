import img from '@/assets/poce.jpg';
import NewsCard from '@/features/public/component/News-Card';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


    const newsContent = [
        {
            id: 1,
            image: img,
            title: 'Berita Panas Hari Ini',
            description: 'Politik • 20 menit lalu',
            synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: 2,
            image: '/news/foto1.jpg',
            title: 'Berita Panas Hari Ini',
            description: 'Politik • 20 menit lalu',
            synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },{
            id: 3,
            image: '/news/foto1.jpg',
            title: 'Berita Panas Hari Ini',
            description: 'Politik • 20 menit lalu',
            synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },{
            id: 4,
            image: '/news/foto1.jpg',
            title: 'Berita Panas Hari Ini',
            description: 'Politik • 20 menit lalu',
            synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        // Add more news items as needed
    ];

  export default function News() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Calculate how many cards can fit on screen (responsive)
  const getCardsPerView = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };
  
  const [cardsPerView, setCardsPerView] = useState(getCardsPerView());
  
  // Update cards per view on window resize
  useState(() => {
    const handleResize = () => setCardsPerView(getCardsPerView());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Create infinite loop by duplicating items
  const extendedContent = [...newsContent, ...newsContent, ...newsContent];
  const startIndex = newsContent.length;
  
  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };
  
  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };
  
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    
    // Reset to middle section for infinite loop
    if (currentIndex >= startIndex + newsContent.length) {
      setCurrentIndex(startIndex);
    } else if (currentIndex < startIndex) {
      setCurrentIndex(startIndex + newsContent.length - 1);
    }
  };

  // Initialize at the start of middle section
  useState(() => {
    setCurrentIndex(startIndex);
  }, []);

  return (
    <div className="w-full bg-gray-50 py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="news-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              News
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="relative">
            {/* Previous Button */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            
            {/* Carousel Container */}
            <div className="overflow-hidden">
              <div
                className={`flex gap-4 ${isTransitioning ? 'transition-transform duration-500 ease-out' : ''}`}
                style={{
                  transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {extendedContent.map((item, idx) => (
                  <div
                    key={`${item.id}-${idx}`}
                    className="flex-shrink-0"
                    style={{ width: `calc(${100 / cardsPerView}% - ${(cardsPerView - 1) * 16 / cardsPerView}px)` }}
                  >
                    <NewsCard
                      image={item.image}
                      title={item.title}
                      description={item.description}
                      synopsis={item.synopsis}
                      onRead={() => console.log("dibaca", item.title)}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
