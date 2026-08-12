import { useMemo } from "react";
import { useNavigate } from "react-router";

import MovieCard from "@/components/MovieCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useLikedMovies } from "@/hooks/useLikedMovies";
import { supabase } from "@/utils/supabase";

function calculateAge(birthDate: string): number | null {
  const date = new Date(birthDate);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const monthDifference = today.getMonth() - date.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < date.getDate())
  ) {
    age -= 1;
  }

  return age;
}

function UserProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    data: likedMovies = [],
    isLoading: isLoadingLikedMovies,
    isError: isLikedMoviesError,
  } = useLikedMovies();

  const metadata = (user?.user_metadata ?? {}) as Record<string, unknown>;

  const fullName =
    typeof metadata.full_name === "string" && metadata.full_name.trim().length
      ? metadata.full_name.trim()
      : "Unknown User";

  const birthDate =
    typeof metadata.birth_date === "string" ? metadata.birth_date : "";
  const age = birthDate ? calculateAge(birthDate) : null;

  const avatarPath =
    typeof metadata.avatar_url === "string" ? metadata.avatar_url : "";

  const profileImageUrl = useMemo(() => {
    if (!avatarPath) {
      return "";
    }

    const { data } = supabase.storage
      .from("profile_pictures")
      .getPublicUrl(avatarPath);

    return data?.publicUrl ?? "";
  }, [avatarPath]);

  const initials = fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className='mt-20 flex flex-1 flex-col gap-6 px-4 pb-10 md:px-10'>
      <Card className='bg-background/90'>
        <CardHeader className='gap-4 sm:flex sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex items-center gap-4'>
            <Avatar
              size='lg'
              className='size-16'
            >
              {profileImageUrl ? (
                <AvatarImage
                  src={profileImageUrl}
                  alt={fullName}
                />
              ) : null}
              <AvatarFallback>{initials || "U"}</AvatarFallback>
            </Avatar>

            <div>
              <CardTitle className='text-2xl'>{fullName}</CardTitle>
              <CardDescription>
                {user?.email ?? "No email provided"}
              </CardDescription>
            </div>
          </div>

          <Button onClick={() => navigate("/update-profile")}>
            Edit Profile
          </Button>
        </CardHeader>

        <CardContent className='flex flex-wrap gap-2'>
          <Badge variant='secondary'>Age: {age ?? "Not set"}</Badge>
          <Badge variant='outline'>Liked Movies: {likedMovies.length}</Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Liked Movies</CardTitle>
          <CardDescription>
            Movies you liked are shown here. Tap any movie to see more details.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {isLoadingLikedMovies ? (
            <p className='text-sm text-muted-foreground'>
              Loading liked movies...
            </p>
          ) : isLikedMoviesError ? (
            <p className='text-sm text-destructive'>
              Failed to load liked movies.
            </p>
          ) : likedMovies.length === 0 ? (
            <p className='text-sm text-muted-foreground'>
              You have not liked any movies yet.
            </p>
          ) : (
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5'>
              {likedMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default UserProfile;
