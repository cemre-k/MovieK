import { ExpandableCard } from "@/components/ui/expandable-card";
import type { Movie } from "@/api/types";
import MovieExtraDetails from "./MovieExtraDetails";

type MovieCardProps = {
  movie: Movie;
};

function MovieCard({ movie }: MovieCardProps) {
  return (
    <ExpandableCard
      title={movie.title}
      src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
      description={movie.release_date}
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
      <MovieExtraDetails movieId={movie.id} />
    </ExpandableCard>
  );
}

export default MovieCard;
