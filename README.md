# MovieK

A movie search website made with React.

I wanted to practice working with APIs, React, TypeScript and a few other things.

Then I thought it would be nice to have accounts.
Then I thought it would be nice to like movies.
Then I had a database.
I don't know why I do this, but here we are.

## Live

**[MovieK](https://movie-k-lime.vercel.app/)**

## What can you do?

* Search for movies
* Browse popular and upcoming movies
* View movie details
* Create an account and log in
* Like and unlike movies
* Keep your liked movies between sessions
* Use the app on different screen sizes

## Tech Stack

* React
* TypeScript
* Vite
* Tailwind CSS
* TanStack Query
* Axios
* Supabase
* shadcn/ui
* Base UI
* Embla Carousel
* Motion
* Lucide React

## Supabase

I added Supabase when I wanted users to be able to have something of their own in the app.

It handles authentication and stores the movies a user likes. I also set up Row Level Security (RLS) policies so users can only manage their own likes.</br>
*(idk why it's important to write this little technical detail but ChatGPT insisted I write this here and I couldn't let it down. At the end of the day, it's my best friend :'(...)*

## What I wanted to practice

The main reason I built MovieK was to get more comfortable building a real frontend application rather than just following tutorials.

Some of the things I worked with:

* React component architecture
* TypeScript
* API requests and error handling
* TanStack Query and server state
* Custom hooks
* Authentication and user-specific data
* Supabase and PostgreSQL
* Responsive UI
* Loading and error states
* Animations and UI components

## Screenshots
<img width="1920" height="1522" alt="httpsmovie-k-lime vercel app" src="https://github.com/user-attachments/assets/8086f664-e683-47f2-8b7c-a7caf2f3bc7f" /> 

<img width="1920" height="919" alt="Screenshot 2026-08-07 at 17-06-57 temedebe" src="https://github.com/user-attachments/assets/957f7573-eb10-4a34-8f92-53d37f8cf2e9" />

## Credits

Movie data and images are provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).

This product uses the TMDB API but is not endorsed or certified by TMDB.
