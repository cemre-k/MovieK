import MovieCard from "@/components/MovieCard";
import { useSearch } from "@/hooks/useSearch";
import { useSearchParams } from "react-router";

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  console.log(searchParams);

  const queryString = searchParams.get("q") ?? "";

  const { data, isLoading, error } = useSearch(queryString);
  console.log(data);

  if (isLoading) {
    return <div className='mt-24 p-2 md:mx-16'>loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div className='mt-24 p-2 md:mx-16'>something went wrong</div>;
  }

  if (!data || data.length === 0) {
    return <div className='mt-24 p-2 md:mx-16'>no data</div>;
  }

  return (
    <div className='mt-24 flex h-screen flex-wrap gap-4 p-2 md:mx-16 justify-center'>
      {data.map((result) => (
        <MovieCard
          key={result.id}
          movie={result}
        />
      ))}
    </div>
  );
}

export default SearchResultsPage;
