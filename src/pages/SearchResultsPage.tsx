import { useSearch } from "@/hooks/useSearch";
import { useSearchParams } from "react-router";

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  console.log(searchParams);

  const queryString = searchParams.get("q") ?? "";

  const { data, isLoading, error } = useSearch(queryString);

  if (!isLoading && !data) {
    console.log("no match");
  }
  if (error) {
    console.log(error);
  }

  console.log(data);

  return (
    <div className='mt-24 p-2 md:mx-16 flex h-full flex-col gap-4 '>
      {searchParams.get("q")}
    </div>
  );
}

export default SearchResultsPage;
