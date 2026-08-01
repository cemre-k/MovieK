import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "@/api/movies";

export function usePopularMovies() {
    return useQuery({
        queryKey: ["popularMovies"],
        queryFn: getPopularMovies,
        staleTime: 1000 * 60 * 5,
    });
}