import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "@/api/movies";


export function useMovieDetails(movieId:number) {
    return useQuery({
        queryKey: ["movieDetails" , movieId],
        queryFn: () => getMovieDetails(movieId),
        staleTime: 1000 * 60 * 5,
    });
}