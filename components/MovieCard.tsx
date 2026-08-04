import { ExpandableCard } from "@/components/ui/expandable-card";
import type { Movie, SearchResult } from "@/api/types";
import MovieExtraDetails from "./MovieExtraDetails";

type MovieCardProps = {
  movie: Movie | SearchResult;
};

function MovieCard({ movie }: MovieCardProps) {
  if ("media_type" in movie && movie.media_type === "person") return;

  const isTvResult = "media_type" in movie && movie.media_type === "tv";
  const title =
    "media_type" in movie && movie.media_type === "tv" ? movie.name : movie.title;
  const description =
    "media_type" in movie && movie.media_type === "tv"
      ? movie.first_air_date
      : movie.release_date;

  return (
    <ExpandableCard
      title={title}
      src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
      description={description}
      srcExpanded={`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}
    >
      <div className='flex flex-col gap-8 items-end justify-center'>
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
