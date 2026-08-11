import { ExpandableCard } from "@/components/ui/expandable-card";
import type { Movie, SearchResult } from "@/api/types";
import MovieExtraDetails from "./MovieExtraDetails";
import { supabase } from "@/utils/supabase";

type MovieCardProps = {
  movie: Movie | SearchResult;
};

function MovieCard({ movie }: MovieCardProps) {
  if ("media_type" in movie && movie.media_type === "person") return;

  const isTvResult = "media_type" in movie && movie.media_type === "tv";

  const title =
    "media_type" in movie && movie.media_type === "tv"
      ? movie.name
      : movie.title;

  const description =
    "media_type" in movie && movie.media_type === "tv"
      ? movie.first_air_date
      : movie.release_date;

  const handleLike = async () => {
    if (isTvResult) return;

    const { data, error } = await supabase.rpc("like_movie", {
      p_movie_backdrop_path: movie.backdrop_path,
      p_movie_id: movie.id,
      p_movie_overview: movie.overview,
      p_movie_popularity: movie.popularity,
      p_movie_poster_path: movie.poster_path,
      p_movie_title: title,
      p_movie_vote_avg: movie.vote_average,
      p_movie_vote_count: movie.vote_count,
    });

    if (error) {
      console.error("Failed to like movie:", error);
      return;
    }

    console.log("Movie liked:", data);
  };

  return (
    <ExpandableCard
      handleLike={handleLike}
      title={title}
      src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
      description={description}
      srcExpanded={`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}
    >
      <div className='flex flex-col items-end justify-center gap-8'>
        {movie.overview}
      </div>

      <div className='flex gap-2'>
        <span className='rounded-full bg-white/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.2em]'>
          {movie.original_language.toUpperCase()}
        </span>

        <span className='rounded-full bg-white/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.2em]'>
          TMDB Rating : {movie.vote_average}
        </span>
      </div>

      {!isTvResult ? <MovieExtraDetails movieId={movie.id} /> : null}
    </ExpandableCard>
  );
}

export default MovieCard;
