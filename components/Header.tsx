import logo from "@/src/assets/cemrek_logo.png";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router";

function Header() {
  const navigate = useNavigate();

  return (
    <div className='absolute top-0 left-0 border-b border-border shadow-shadow w-full h-16 flex justify-between items-center md:px-24 px-3'>
      <div>
        <img
          onClick={() => navigate("/")}
          className='w-32 aspect-auto cursor-pointer'
          src={logo}
          alt=''
        />
      </div>
      <SearchBar />
      <div>actions</div>
    </div>
  );
}

export default Header;
