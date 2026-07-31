import { api } from "@/api/client";

type Movie = {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

type PopularMoviesResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
};

type MovieDetails = {
    title: string;
    genres: { id: number; name: string }[];
    homepage: string;
    original_language: string;
    original_title: string;
    poster_path: string | null;
    tagline: string;
    overview: string;
};

export async function getPopularMovies(): Promise<PopularMoviesResponse> {
    const response = await api.get<PopularMoviesResponse>("/movie/popular");

    return response.data;
}

export async function getMovieDetails(movie_id: number): Promise<MovieDetails> {
    const response = await api.get<MovieDetails>(`/movie/${movie_id}`);

    return response.data;
}