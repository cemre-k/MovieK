import { createContext } from "react";
import type { Movie, MovieSearchResult, TvSearchResult } from "@/api/types";

export type LikeContextVal = {
  likedMovieIds: Set<number>;
  isLoading: boolean;
  likeMovie: (
    movie: Movie | TvSearchResult | MovieSearchResult,
  ) => Promise<boolean>;
  unlikeMovie: (movieId: number) => Promise<boolean>;
};

export const LikeContext = createContext<LikeContextVal | undefined>(undefined);
