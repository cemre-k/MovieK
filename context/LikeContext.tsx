import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/utils/supabase";
import type { Movie } from "@/api/types";
import type { ReactNode } from "react";
import type { LikeContextVal } from "./like-context";
import { LikeContext } from "./like-context";

function LikeContextProvider({ children }: { children: ReactNode }) {
  const [likedMovieIds, setLikedMovieIds] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getLiked = async () => {
      const { data: likes, error } = await supabase
        .from("likes")
        .select("movie_id");

      if (error) {
        console.log("error", error);
        return;
      }
      console.log("likes:", likes);
    };
    getLiked();
  }, []);

  const likeMovie = async (movie: Movie): Promise<boolean> => {
    const { error } = await supabase.rpc("like_movie", {
      p_movie_backdrop_path: movie.backdrop_path,
      p_movie_id: movie.id,
      p_movie_overview: movie.overview,
      p_movie_popularity: movie.popularity,
      p_movie_poster_path: movie.poster_path,
      p_movie_title: movie.title,
      p_movie_vote_avg: movie.vote_average,
      p_movie_vote_count: movie.vote_count,
    });

    if (error) {
      console.error("Failed to like movie:", error);
      return false;
    }

    setLikedMovieIds((previous) => {
      const next = new Set(previous);
      next.add(movie.id);
      return next;
    });

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
