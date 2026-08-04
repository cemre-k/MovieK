import { api } from "@/api/client";
import type { PopularMoviesResponse , MovieDetails, MovieCredits, MultiSearchResponse, SearchResult } from "./types";

export async function getPopularMovies(): Promise<PopularMoviesResponse> {
    const response = await api.get<PopularMoviesResponse>("/movie/popular");

    return response.data;
}

export async function getNowPlaying(): Promise<PopularMoviesResponse> {
    const response = await api.get<PopularMoviesResponse>("/movie/now_playing");

    return response.data;
}

export async function getTopRated(): Promise<PopularMoviesResponse> {
    const response = await api.get<PopularMoviesResponse>("/movie/top_rated");

    return response.data;
}

export async function getMovieDetails(movie_id: number): Promise<MovieDetails> {
    const response = await api.get<MovieDetails>(`/movie/${movie_id}`);

    return response.data;
}

export async function getMovieCredits(movieId: number):Promise<MovieCredits> {
  const { data } = await api.get<MovieCredits>(`/movie/${movieId}/credits`);
  return data;
}

export async function search(query:string):Promise<SearchResult[]> {
  const { data } = await api.get<MultiSearchResponse>(`/search/multi` , {params:{
    query,
  }});
  return data.results;
}