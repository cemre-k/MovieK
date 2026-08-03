import { useMovieCredits } from "@/hooks/useMovieCredits";
import { useMovieDetails } from "@/hooks/useMovieDetails";
import { buttonVariants } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

function buildCastPhotoUrl(profilePath: string | null) {
  if (!profilePath) {
    return "https://via.placeholder.com/154x231?text=No+Photo";
  }

  return `https://image.tmdb.org/t/p/w154${profilePath}`;
}

type props = {
  movieId: number;
};

function MovieExtraDetails({ movieId }: props) {
  const {
    data: credits,
    isLoading: isCreditsLoading,
    error: creditsError,
  } = useMovieCredits(movieId);
  const {
    data: details,
    isLoading: isDetailsLoading,
    error: detailsError,
  } = useMovieDetails(movieId);

  if (isCreditsLoading || isDetailsLoading) {
    return (
      <section className='relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/90 p-8 text-sm text-zinc-400'>
        Loading featured titles...
      </section>
    );
  }

  if (creditsError || detailsError || !credits || !details) {
    return null;
  }

  const topCast = credits.cast.slice(0, 10);

  return (
    <div className='flex w-full flex-col gap-8 p-5'>
      {topCast.length > 0 ? (
        <Carousel
          opts={{ align: "start" }}
          className='w-full'
        >
          <CarouselContent>
            {topCast.map((castMember) => (
              <CarouselItem
                key={castMember.cast_id}
                className='basis-auto'
              >
                <div className='flex w-28 flex-col items-center gap-2 text-center'>
                  <img
                    src={buildCastPhotoUrl(castMember.profile_path)}
                    alt={castMember.name}
                    className='h-36 w-28 rounded-lg object-cover'
                  />
                  <p className='text-xs font-semibold text-white'>
                    {castMember.name}
                  </p>
                  <p className='text-[11px] text-zinc-400'>
                    as {castMember.character}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : null}

      {details.homepage ? (
        <div className='w-full flex justify-end'>
          <a
            href={details.homepage}
            target='_blank'
            rel='noopener noreferrer'
            className={buttonVariants({
              variant: "default",
              size: "lg",
              className:
                "w-fit rounded-full border-white/20 bg-black/30 text-white hover:bg-black/50 px-8",
            })}
          >
            Official site
          </a>
        </div>
      ) : null}
    </div>
  );
}

export default MovieExtraDetails;
