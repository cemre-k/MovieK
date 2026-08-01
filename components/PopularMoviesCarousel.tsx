import CategoryHeader from './CategoryHeader';
import MoviesCarousel from './MoviesCarousel';

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
       <div className="w-full flex flex-col justify-start items-start gap-2">
            <CategoryHeader>Popular Movies</CategoryHeader>
            <MoviesCarousel movies={movies}/>
        </div>
    )
}

export default PopularMoviesCarousel