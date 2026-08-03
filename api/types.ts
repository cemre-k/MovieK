export type Movie = {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

export type PopularMoviesResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
};

export type MovieDetails = {
    title: string;
    genres: { id: number; name: string }[];
    homepage: string;
    original_language: string;
    original_title: string;
    poster_path: string | null;
    tagline: string;
    overview: string;
};

export type CastMember = {
    adult: boolean;
    gender: number | null;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;

    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
};

export type CrewMember = {
    adult: boolean;
    gender: number | null;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;

    credit_id: string;
    department: string;
    job: string;
};

export type MovieCredits = {
    id: number;
    cast: CastMember[];
    crew: CrewMember[];
};