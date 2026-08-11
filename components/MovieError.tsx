import { TriangleAlert } from "lucide-react";

export function MovieError() {
  return (
    <div className='flex min-h-[400px] items-center justify-center px-4'>
      <div className='flex max-w-md flex-col items-center rounded-xl border p-8 text-center shadow-sm'>
        <div className='mb-4 rounded-full p-3'>
          <TriangleAlert className='h-8 w-8' />
        </div>

        <h2 className='mb-2 text-xl font-semibold'>Unable to load movies</h2>

        <p className='mb-6 text-sm text-muted-foreground'>
          There was a problem fetching movie data from TMDB. Please try again
          later. In the meantime, you can check the project on GitHub for more
          details and screenshots.
        </p>

        <a
          href='https://github.com/cemre-k/MovieK'
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90'
        >
          View project on GitHub
        </a>
      </div>
    </div>
  );
}
