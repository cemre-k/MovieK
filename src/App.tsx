import { MovieCategoryCarousel } from "@/components/MovieCategoryCarousel";
import "./App.css";
import { useEffect } from "react";
import { usePopularMovies } from "@/hooks/usePopularMovies";
import { useTopRated } from "@/hooks/useTopRated";
function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className='m-24 flex h-full flex-col gap-4'>
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

export default App;
