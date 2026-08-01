import { ExpandableCard } from "@/components/ui/expandable-card";
import type { Movie } from "@/api/movies";
import { Button } from "@/components/ui/button";

type MovieCardProps = {
  movie: Movie;
};

function MovieCard({ movie }: MovieCardProps) {
  return (
    <ExpandableCard
      title={movie.title}
      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
      description=''
    >
      <div className='flex flex-col gap-8 items-center justify-center'>
        {movie.overview}
        <Button className='w-md'>Go to Movie page</Button>
      </div>
    </ExpandableCard>
  );
}

export default MovieCard;
