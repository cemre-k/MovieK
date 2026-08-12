import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { CurrentUserAvatar } from "./current-user-avatar";

/* dropdown menu imports  */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
/*  */

function ProfileDropdown() {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  return (
    <div className='flex gap-12'>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <CurrentUserAvatar />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigate("/user")}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/update-profile")}>
              {" "}
              Settings
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => signOut()}
              className='bg-primary/50'
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ProfileDropdown;
