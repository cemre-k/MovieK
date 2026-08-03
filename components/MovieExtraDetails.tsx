import { useMovieDetails } from "@/hooks/useMovieDetails";

type props = {
  movieId: number;
};

function MovieExtraDetails({ movieId }: props) {
  const { data, isLoading, error } = useMovieDetails(movieId);

  if (isLoading) {
    return (
      <section className='relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/90 p-8 text-sm text-zinc-400'>
        Loading featured titles...
      </section>
    );
  }

  if (error || !data) {
    return null;
  }
  console.log(data);

  return <div>{data.genres.join("")}</div>;
}

export default MovieExtraDetails;
