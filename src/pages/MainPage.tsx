import { MovieCategoryCarousel } from "@/components/MovieCategoryCarousel";
import { useEffect } from "react";
import { usePopularMovies } from "@/hooks/usePopularMovies";
import { useTopRated } from "@/hooks/useTopRated";
import Header from "@/components/Header";
import { HeroCarousel } from "@/components/heroCarousel";

function MainPage() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

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
