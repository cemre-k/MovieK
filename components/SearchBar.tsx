import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

function SearchBar() {
  const [searchVal, setSearchVal] = useState("");

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(searchVal);
    setSearchVal("");
  }

  return (
    <div className='w-32'>
      <Button
        className='md:hidden flex'
        variant={"ghost"}
      >
        Search
        <Search />
      </Button>
      <form
        onSubmit={handleSearch}
        className='md:w-sm hidden md:block -translate-x-1/2'
      >
        <InputGroup>
          <InputGroupInput
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder='Search...'
          />
          <InputGroupAddon align={"inline-end"}>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </form>
    </div>
  );
}

export default SearchBar;
