import MovieCard from "../components/MovieCard"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import type { Movie } from "@/api/types"

type MoviesCarouselProps = {
  movies: Movie[];
};

export function MoviesCarousel({movies} : MoviesCarouselProps) {
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

export default MoviesCarousel