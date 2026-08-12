import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/utils/supabase";
import type { Movie, MovieSearchResult, TvSearchResult } from "@/api/types";
import type { ReactNode } from "react";
import type { LikeContextVal } from "./like-context";
import { LikeContext } from "./like-context";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";

function LikeContextProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [likedMovieIds, setLikedMovieIds] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  const queryClient = useQueryClient();

  useEffect(() => {
    const getLiked = async () => {
      setIsLoading(true);

      if (!user) {
        setLikedMovieIds(new Set());
        setIsLoading(false);
        return;
      }

      const { data: likes, error } = await supabase
        .from("likes")
        .select("movie_id")
        .eq("user_id", user.id);

      if (error) {
        console.error("Failed to fetch liked movies:", error);
        setIsLoading(false);
        return;
      }

      const movieIds = new Set(likes.map((like) => like.movie_id));

      setLikedMovieIds(movieIds);
      setIsLoading(false);
    };

    getLiked();
  }, [user]);

  const likeMovie = async (
    movie: Movie | MovieSearchResult | TvSearchResult,
  ): Promise<boolean> => {
    const title =
      "media_type" in movie && movie.media_type === "tv"
        ? movie.name
        : movie.title;

    const { error } = await supabase.rpc("like_movie", {
      p_movie_backdrop_path: movie.backdrop_path,
      p_movie_id: movie.id,
      p_movie_overview: movie.overview,
      p_movie_popularity: movie.popularity,
      p_movie_poster_path: movie.poster_path,
      p_movie_title: title,
      p_movie_vote_avg: movie.vote_average,
      p_movie_vote_count: movie.vote_count,
    });

    if (error) {
      console.error("Failed to like movie:", error);
      return false;
    }

    setLikedMovieIds((previous) => new Set(previous).add(movie.id));
    queryClient.invalidateQueries({ queryKey: ["likedMovies", user?.id] });

    return true;
  };

  const unlikeMovie = async (movieId: number): Promise<boolean> => {
    const { error } = await supabase.rpc("unlike_movie", {
      p_movie_id: movieId,
    });

    if (error) {
      console.error("Failed to unlike movie:", error);
      return false;
    }

    setLikedMovieIds((previous) => {
      const next = new Set(previous);
      next.delete(movieId);
      return next;
    });
    queryClient.invalidateQueries({ queryKey: ["likedMovies", user?.id] });

    return true;
  };

  const value = useMemo<LikeContextVal>(
    () => ({
      likedMovieIds,
      isLoading,
      likeMovie,
      unlikeMovie,
    }),
    [likedMovieIds, isLoading],
  );

  return <LikeContext.Provider value={value}>{children}</LikeContext.Provider>;
}

export default LikeContextProvider;
