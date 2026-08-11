import CategoryHeader from "./CategoryHeader";
import type { Movie } from "@/api/types";
import MovieCard from "../components/MovieCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MovieError } from "@/components/MovieError";

type MovieCategoryCarouselProps = {
  title: string;
  useMovies: () => {
    data?: {
      results: Movie[];
    };
    isLoading: boolean;
    error: unknown;
  };
};

export function MovieCategoryCarousel({
  title,
  useMovies,
}: MovieCategoryCarouselProps) {
  const { data, isLoading } = useMovies();

  const error = 1;
  // TODO: replace with real loading/error components
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <MovieError />;
  }

  if (!data) {
    return <MovieError />;
  }
  const movies = data.results;

  return (
    <div className='mb-4 flex w-full flex-col items-start justify-start gap-2'>
      <CategoryHeader>{title}</CategoryHeader>
      <Carousel className='w-full'>
        <CarouselContent>
          {movies.map((el) => (
            <CarouselItem
              key={el.id}
              className='basis-auto'
            >
              <MovieCard movie={el} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='hidden md:flex' />
        <CarouselNext className='hidden md:flex' />
      </Carousel>
    </div>
  );
}

export default MovieCategoryCarousel;
