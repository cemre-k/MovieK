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
      description=''
      srcExpanded={`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}
    >
      <div className='flex flex-col gap-8 items-end justify-center'>
        {movie.overview}
      </div>
      <MovieExtraDetails movieId={movie.id} />
    </ExpandableCard>
  );
}

export default MovieCard;
