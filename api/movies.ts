import { api } from "@/api/client";
import type { PopularMoviesResponse , MovieDetails } from "./types";

export async function getPopularMovies(): Promise<PopularMoviesResponse> {
    const response = await api.get<PopularMoviesResponse>("/movie/popular");

    return response.data;
}

export async function getMovieDetails(movie_id: number): Promise<MovieDetails> {
    const response = await api.get<MovieDetails>(`/movie/${movie_id}`);

    return response.data;
}