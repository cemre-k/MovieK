import { useQuery } from "@tanstack/react-query";
import { search } from "@/api/movies";

export function useSearch(query:string) {
    return useQuery({
        queryKey: ["search" , query],
        queryFn: ()=>(search(query)),
        staleTime: 1000 * 60 * 5,
        enabled: query.trim() !== "",
    });
}