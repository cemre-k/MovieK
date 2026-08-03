import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search, X } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

function SearchBar() {
  const [searchVal, setSearchVal] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      const el = document.getElementById(
        "mobile-search-input",
      ) as HTMLInputElement | null;
      el?.focus();
    }
  }, [mobileOpen]);

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(searchVal);
    setSearchVal("");
    setMobileOpen(false);
  }

  return (
    <div className='w-32 relative'>
      {/* Mobile button - opens overlay */}
      <Button
        className='md:hidden flex'
        variant={"ghost"}
        onClick={() => setMobileOpen(true)}
      >
        Search
        <Search />
      </Button>

      {/* Mobile overlay + backdrop */}
      {mobileOpen && (
        <>
          <div
            className='fixed inset-0 bg-black/50 z-40'
            onClick={() => setMobileOpen(false)}
          />

          <div className='fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4 bg-black '>
            <form
              onSubmit={handleSearch}
              className='w-full'
            >
              <InputGroup>
                <InputGroupInput
                  id='mobile-search-input'
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder='Search...'
                />
                <InputGroupAddon align={"inline-end"}>
                  <Button
                    type='submit'
                    variant='ghost'
                    aria-label='Search'
                  >
                    <Search />
                  </Button>
                  <Button
                    type='button'
                    variant='ghost'
                    onClick={() => setMobileOpen(false)}
                    aria-label='Close search'
                  >
                    <X />
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </form>
          </div>
        </>
      )}

      {/* Desktop/form */}
      <form
        onSubmit={handleSearch}
        className='md:w-sm hidden md:block -translate-x-1/2'
      >
        <InputGroup className='focus-within:!ring-primary/40 focus-within:!border-primary/40'>
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
