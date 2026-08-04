import { useQuery } from "@tanstack/react-query";
import { search } from "@/api/movies";

export function useSearch(query:string) {
    const normalizedQuery = query.trim().toLowerCase();
    return useQuery({
        queryKey: ["search" , normalizedQuery],
        queryFn: ()=>(search(normalizedQuery)),
        staleTime: 1000 * 60 * 5,
        enabled: normalizedQuery !== "",
    });
}