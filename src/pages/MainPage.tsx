import { MovieCategoryCarousel } from "@/components/MovieCategoryCarousel";
import { usePopularMovies } from "@/hooks/usePopularMovies";
import { useTopRated } from "@/hooks/useTopRated";
import { HeroCarousel } from "@/components/heroCarousel";

function MainPage() {
  return (
    <div className='mt-24 p-2 md:mx-16 flex h-full flex-col gap-4 '>
      <HeroCarousel />
      <MovieCategoryCarousel
        title='Popular Movies'
        useMovies={usePopularMovies}
      />
      <MovieCategoryCarousel
        title='Top Rated'
        useMovies={useTopRated}
      />
    </div>
  );
}

export default MainPage;
