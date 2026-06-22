import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/features/auth/context/AuthContext"
import {
  BellIcon,
  LogOutIcon,
  Settings,
  User,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

export function DropdownMenuAvatar() {
  const navigate = useNavigate();
  const { logout, user, isAuthenticated } = useAuth();
  const navigateToProfilePage = () => navigate('/u');
  const navigateToLogin = () => navigate('/login');
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage src={isAuthenticated ? user?.avatar?.url : ""} alt={"user avatar"} />
            <AvatarFallback>UK</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={navigateToProfilePage}>
            <User />
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem>
            <BellIcon />
            Notifications
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Settings />
            Settings
          </DropdownMenuItem>

        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={isAuthenticated ? logout : navigateToLogin}>
          <LogOutIcon />
          {isAuthenticated ? "Sign Out" : "Sign in"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
