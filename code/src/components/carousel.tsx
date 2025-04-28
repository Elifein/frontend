// "use client"

// import { useState, useEffect } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { Pause, Play } from "lucide-react"
// import axios from "axios"

// interface Slide {
//   id: string
//   image: string
//   title: string
// }

// export function Carousel() {
//   const [slides, setSlides] = useState<Slide[]>([])
//   const [currentSlide, setCurrentSlide] = useState(0)
//   const [isPaused, setIsPaused] = useState(false)

//   useEffect(() => {
//     const fetchSlides = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/api/v1/allslides/?status=false")
//         const apiSlides = response.data.data.sliders.map((slider: any) => ({
//           id: slider.slider_id,
//           image: slider.slider_image,
//           title: slider.slider_title,
//         }))
//         setSlides(apiSlides)
//       } catch (error) {
//         console.error("Failed to fetch slides", error)
//       }
//     }

//     fetchSlides()
//   }, [])

//   useEffect(() => {
//     if (!isPaused && slides.length > 0) {
//       const interval = setInterval(() => {
//         setCurrentSlide((prev) => (prev + 1) % slides.length)
//       }, 5000)

//       return () => clearInterval(interval)
//     }
//   }, [isPaused, slides])

//   if (slides.length === 0) {
//     return <div className="h-[300px] flex items-center justify-center">Loading slides...</div>
//   }

//   return (
//     <div className="relative rounded-md overflow-hidden">
//       <div className="relative">
//         <div className="relative h-[300px] w-full">
//           <Image
//             src={slides[currentSlide].image}
//             alt={slides[currentSlide].title}
//             fill
//             className="object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-green-400/80 to-blue-400/80 mix-blend-overlay"></div>
//           <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
//             <h2 className="text-6xl md:text-8xl font-bold mb-4">{slides[currentSlide].title}</h2>
            
            
//           </div>
//         </div>
//       </div>

//       <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             className={`h-2 w-2 rounded-full ${index === currentSlide ? "bg-blue-500" : "bg-gray-300"}`}
//             onClick={() => setCurrentSlide(index)}
//           />
//         ))}
//         <button className="ml-2 h-6 w-6 flex items-center justify-center" onClick={() => setIsPaused(!isPaused)}>
//           {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
//         </button>
//       </div>
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Pause, Play } from "lucide-react"
import axiosInstance from '../lib/axiosInstance';

// Define types for API response data
interface SliderData {
  slider_id: string
  slider_image: string
  slider_title: string
}

interface Slide {
  id: string
  image: string
  title: string
}

export function Carousel() {
  const [slides, setSlides] = useState<Slide[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axiosInstance.get("allslides/?status=false")
        const apiSlides: Slide[] = response.data.data.sliders.map((slider: SliderData) => ({
          id: slider.slider_id,
          image: slider.slider_image,
          title: slider.slider_title,
        }))
        setSlides(apiSlides)
      } catch (error) {
        console.error("Failed to fetch slides", error)
      }
    }

    fetchSlides()
  }, [])

  useEffect(() => {
    if (!isPaused && slides.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [isPaused, slides])

  if (slides.length === 0) {
    return <div className="h-[300px] flex items-center justify-center">Loading slides...</div>
  }

  return (
    <div className="relative rounded-md overflow-hidden">
      <div className="relative">
        <div className="relative h-[300px] w-full">
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-green-400/80 to-blue-400/80 mix-blend-overlay"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h2 className="text-6xl md:text-8xl font-bold mb-4">{slides[currentSlide].title}</h2>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${index === currentSlide ? "bg-blue-500" : "bg-gray-300"}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
        <button className="ml-2 h-6 w-6 flex items-center justify-center" onClick={() => setIsPaused(!isPaused)}>
          {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </button>
      </div>
    </div>
  )
}
