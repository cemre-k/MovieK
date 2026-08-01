import { ExpandableCard } from "@/components/ui/expandable-card";
import type { Movie } from "@/api/types";
import { Button } from "@/components/ui/button";

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
        <Button className='w-32'>Go to Movie page</Button>
      </div>
    </ExpandableCard>
  );
}

export default MovieCard;
