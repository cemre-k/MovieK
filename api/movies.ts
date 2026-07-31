import {api} from "@/api/client"

export async function getPopularMovies(){
    const response = await api.get("/movie/popular")
    return response.data;
}