import logo from "@/src/assets/cemrek_logo.png";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";
import { CurrentUserAvatar } from "./current-user-avatar";

function Header() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

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
      <div>
        {user ? (
          <div className='flex gap-12'>
            <CurrentUserAvatar />
            <Button onClick={() => signOut()}>Sign Out</Button>
            <Button> Settings</Button>
          </div>
        ) : (
          <Button onClick={() => navigate("/sign-up")}>Sign Up</Button>
        )}
      </div>
    </div>
  );
}

export default Header;
