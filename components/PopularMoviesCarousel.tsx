import MovieCard from "../components/MovieCard"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import {usePopularMovies} from '@/hooks/usePopularMovies'


export function PopularMoviesCarousel() {
    const {data, isLoading , error} =usePopularMovies()
    //TODO: add real loading and error screens 
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>There has been an error.</div>;
    }
    if (!data) {
        return null;
    }

    const movies = data.results;
    return (
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
    )
}

export default PopularMoviesCarousel