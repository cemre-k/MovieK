import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "@/api/movies";


export function useMovieCredits(movieId:number) {
    return useQuery({
        queryKey: ["movieCredits" , movieId],
        queryFn: () => getMovieCredits(movieId),
        staleTime: 1000 * 60 * 5,
    });
}