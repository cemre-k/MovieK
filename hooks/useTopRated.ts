import { useQuery } from "@tanstack/react-query";
import { getTopRated } from "@/api/movies";

export function useTopRated() {
    return useQuery({
        queryKey: ["top_rated"],
        queryFn: getTopRated,
        staleTime: 1000 * 60 * 5,
    });
}