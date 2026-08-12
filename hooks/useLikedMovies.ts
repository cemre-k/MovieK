import { useQuery } from "@tanstack/react-query";

import type { Movie } from "@/api/types";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/utils/supabase";

type MovieTableRow = {
  movie_id: number;
  movie_title: string | null;
  movie_overview: string | null;
  movie_poster_path: string | null;
  movie_backdrop_path: string | null;
  movie_popularity: number | null;
  movie_vote_avg: number | null;
  movie_vote_count: number | null;
};

type LikedMovieWithDetailsRow = {
  movie_id: number;
  movie: MovieTableRow | MovieTableRow[] | null;
};

function mapMovieRowToMovie(row: MovieTableRow): Movie {
  return {
    adult: false,
    backdrop_path: row.movie_backdrop_path,
    genre_ids: [],
    id: row.movie_id,
    original_language: "en",
    original_title: row.movie_title ?? "Untitled",
    overview: row.movie_overview ?? "No overview available.",
    popularity: row.movie_popularity ?? 0,
    poster_path: row.movie_poster_path,
    release_date: "",
    title: row.movie_title ?? "Untitled",
    video: false,
    vote_average: row.movie_vote_avg ?? 0,
    vote_count: row.movie_vote_count ?? 0,
  };
}

export function useLikedMovies() {
  const { user } = useAuth();

  return useQuery<Movie[]>({
    queryKey: ["likedMovies", user?.id],
    enabled: Boolean(user?.id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("likes")
        .select(
          "movie_id, movie:movies!inner(movie_id, movie_title, movie_overview, movie_poster_path, movie_backdrop_path, movie_popularity, movie_vote_avg, movie_vote_count)",
        )
        .eq("user_id", user!.id);

      if (error) {
        throw error;
      }

      const rows = (data as LikedMovieWithDetailsRow[]) ?? [];

      return rows
        .map((row) =>
          Array.isArray(row.movie) ? (row.movie[0] ?? null) : row.movie,
        )
        .filter((movie): movie is MovieTableRow => movie !== null)
        .map(mapMovieRowToMovie)
        .filter((movie) => movie.id > 0);
    },
    staleTime: 1000 * 60 * 5,
  });
}
