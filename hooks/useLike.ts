import { LikeContext } from "@/context/like-context";
import { useContext } from "react";

export function useLike() {
  const context = useContext(LikeContext);

  if (!context) {
    throw new Error("useLike must be used within LikeContextProvider");
  }

  return context;
}
