import { useQuery } from "@tanstack/react-query";
import { getNowPlaying } from "@/api/movies";

export function useNowPlaying() {
    return useQuery({
        queryKey: ["popularMovies"],
        queryFn: getNowPlaying,
        staleTime: 1000 * 60 * 5,
    });
}