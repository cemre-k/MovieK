const TMDB_TOKEN =import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN


import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
  },
});