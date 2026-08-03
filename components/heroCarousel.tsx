import { useState } from "react";
import { ExpandableCard } from "@/components/ui/expandable-card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useNowPlaying } from "@/hooks/useNowPlaying";
import type { Movie } from "@/api/types";
import MovieExtraDetails from "./MovieExtraDetails";

function buildImageUrl(
  path: string | null | undefined,
  size: "w780" | "original" = "w780",
) {
  if (!path) {
    return "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80";
  }

  return `https://image.tmdb.org/t/p/${size}/${path}`;
}

function formatMovieMeta(movie: Movie) {
  const year = movie.release_date?.split("-")[0] ?? "New";
  return `${year} • ⭐ ${movie.vote_average.toFixed(1)}/10`;
}

export function HeroCarousel() {
  const { data, isLoading, error } = useNowPlaying();
  const [activeMovieId, setActiveMovieId] = useState<number | null>(null);

  if (isLoading) {
    return (
      <section className='relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/90 p-8 text-sm text-zinc-400'>
        Loading featured titles...
      </section>
    );
  }

  if (error || !data?.results?.length) {
    return null;
  }

  const featuredMovies = data.results.slice(0, 5);

  return (
    <section className='relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-2xl shadow-black/30'>
      <Carousel
        opts={{ loop: true }}
        className='w-full'
      >
        <CarouselContent className='ml-0'>
          {featuredMovies.map((movie) => {
            const backdropUrl = buildImageUrl(movie.backdrop_path, "original");
            const posterUrl = buildImageUrl(movie.poster_path, "w780");

            return (
              <CarouselItem
                key={movie.id}
                className='pl-0'
              >
                <div className='relative min-h-[480px] overflow-hidden md:min-h-[560px] flex items-end-safe'>
                  <img
                    src={backdropUrl}
                    alt={movie.title}
                    className='absolute inset-0 h-full w-full object-cover'
                  />
                  <div className='absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/25' />
                  <div className='absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent' />

                  <div className='relative z-10 flex h-full flex-col justify-between gap-8 p-6 sm:p-8 lg:flex-row lg:items-end lg:p-10 md:ms-12 md:mb-12'>
                    <div className='max-w-2xl'>
                      <p className='mb-3 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-200 backdrop-blur-sm'>
                        Featured now
                      </p>
                      <h2 className='text-3xl font-semibold text-white sm:text-4xl lg:text-6xl'>
                        {movie.title}
                      </h2>
                      <p className='mt-4 max-w-xl text-sm leading-7 text-zinc-300 sm:text-base'>
                        {movie.overview ||
                          "A new cinematic experience is waiting for you."}
                      </p>

                      <div className='mt-6 flex flex-wrap gap-3  '>
                        <ExpandableCard
                          title={movie.title}
                          src={posterUrl}
                          srcExpanded={backdropUrl}
                          description={movie.release_date}
                          showPreview={false}
                          open={activeMovieId === movie.id}
                          onOpenChange={(open) =>
                            setActiveMovieId(open ? movie.id : null)
                          }
                          trigger={
                            <Button
                              variant='outline'
                              className='rounded-full border-white/20 md:w-xl bg-black/30 text-white hover:bg-black/50 '
                            >
                              More info
                            </Button>
                          }
                          classNameExpanded='bg-zinc-950'
                        >
                          <div className='flex flex-col gap-4 text-sm text-zinc-300 '>
                            <p>
                              {movie.overview ||
                                "A cinematic experience to discover."}
                            </p>
                            <div className='flex flex-wrap gap-2'>
                              <span className='rounded-full bg-white/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.2em]'>
                                {movie.original_language.toUpperCase()}
                              </span>
                              <span className='rounded-full bg-white/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.2em]'>
                                TMDB Rating : {movie.vote_average}
                              </span>
                            </div>
                          </div>
                          <MovieExtraDetails movieId={movie.id} />
                        </ExpandableCard>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious className='left-4 top-0 z-20 hidden  border-white/20 bg-black/50 text-white hover:bg-black/80 md:flex' />
        <CarouselNext className='right-4 top-0 z-20 hidden border-white/20 bg-black/50 text-white hover:bg-black/80 md:flex' />
      </Carousel>
    </section>
  );
}

export default HeroCarousel;
