import './App.css'
import MovieCard from "../components/MovieCard"
import {getPopularMovies} from "@/api/movies"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { useEffect } from 'react'

const response =await getPopularMovies()
const movies =response.results

function App() {
  useEffect(()=>{
    document.documentElement.classList.add("dark")
  },[])

  return (
    <div className='flex gap-4 m-24'>
      <Carousel className='w-full'>
      <CarouselContent>
        {movies.map((el) => (
          <CarouselItem key={el.id} className="basis-auto">
            <MovieCard movie={el} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

  
    </div>
  )
}

export default App
