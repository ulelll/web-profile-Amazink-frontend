import { useEffect, useState } from 'react'

const Header = () => {
  const slides = [
    {
      id: 1,
      image: '/bgheader.jpg',
      title: 'Lorem Ipsum Dolor Sit Amet',
      subtitle: 'Lorem Ipsum Dolor Sit Amet'
    },
    {
      id: 2,
      image: '/bgheader2.jpg', 
      title: 'Consectetur Adipiscing Elit',
      subtitle: 'Lorem Ipsum Dolor Sit Amet'
    },
    {
      id: 3,
      image: '/bgheader3.jpg', 
      title: 'Sed Do Eiusmod Tempor',
      subtitle: 'Lorem Ipsum Dolor Sit Amet'
    },
    {
      id: 4,
      image: '/bgheader4.jpg', 
      title: 'Sed Do Eiusmod Tempor',
      subtitle: 'Lorem Ipsum Dolor Sit Amet'
    },
    {
      id: 5,
      image: '/bgheader5.jpg', 
      title: 'Sed Do Eiusmod Tempor', 
      subtitle: 'Lorem Ipsum Dolor Sit Amet'
    }
  ]

  const [currentSlide, setCurrentSlide] = useState(0)
  const [progress, setProgress] = useState(0)
  const slideDuration = 5000 // 5 detik per slide

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0
        }
        return prev + (100 / (slideDuration / 50))
      })
    }, 50)

    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
      setProgress(0)
    }, slideDuration)

    return () => {
      clearInterval(progressInterval)
      clearInterval(slideInterval)
    }
  }, [currentSlide])

  const goToSlide = (index) => {
    setCurrentSlide(index)
    setProgress(0)
  }

  return (
    <div className='min-h-screen mb-4 relative flex items-center w-full overflow-hidden' id='Header'>
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className='absolute inset-0 bg-cover bg-center transition-opacity duration-1000'
          style={{
            backgroundImage: `url('${slide.image}')`,
            opacity: currentSlide === index ? 1 : 0,
            zIndex: currentSlide === index ? 1 : 0
          }}
        />
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent z-[2]"></div>

      {/* Content */}
      <div className='z-10 container text-center mx-auto py-4 px-6 md:px-20 lg:px-32 text-white'>
        <div className='flex flex-col items-center pt-20'>
          <h2 className='text-5xl sm:text-6xl md:text-[82px] max-w-3xl font-semibold'>
            {slides[currentSlide].title}
          </h2>
          
          <h4 className='text-1xl sm:text-3xl md:text-4xl max-w-3xl font-reguler mt-6'>
            {slides[currentSlide].subtitle}
          </h4>
        </div>
      </div>

      {/* Slider Indicators dengan Progress Bar */}
      <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex gap-3'>
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className='group flex flex-col items-center gap-1'
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className='w-16 sm:w-20 h-1 bg-white/30 rounded-full overflow-hidden'>
              <div
                className='h-full bg-white rounded-full transition-all duration-100'
                style={{
                  width: currentSlide === index ? `${progress}%` : '0%'
                }}
              />
            </div>
            <div
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index ? 'bg-white' : 'bg-white/50'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default Header