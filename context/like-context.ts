import { createContext } from "react";
import type { Movie } from "@/api/types";

export type LikeContextVal = {
  likedMovieIds: Set<number>;
  isLoading: boolean;
  likeMovie: (movie: Movie) => Promise<boolean>;
  unlikeMovie: (movieId: number) => Promise<boolean>;
};

export const LikeContext = createContext<LikeContextVal | undefined>(undefined);
