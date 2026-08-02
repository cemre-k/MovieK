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
  const { data, isLoading, error } = useMovies();

  // TODO: replace with real loading/error components
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
        <CarouselPrevious className='hidden md:block' />
        <CarouselNext className='hidden md:block' />
      </Carousel>
    </div>
  );
}

export default MovieCategoryCarousel;
