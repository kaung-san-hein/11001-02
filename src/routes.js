import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PlayerList from "./pages/Players";
import TeamList from "./pages/teams/Teams";

export const routes = [
  {
    name: "Dashboard",
    icon: DashboardIcon,
    path: "/dashboard",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    name: "Login",
    icon: null,
    path: "/login",
    component: <Login />,
    layout: "/auth",
    invisible: true,
  },
  {
    name: "Players",
    icon: AccountCircleIcon,
    path: "/players",
    component: <PlayerList />,
    layout: "/admin",
  },
  {
    name: "Teams",
    icon: AccountCircleIcon,
    path: "/teams",
    component: <TeamList />,
    layout: "/admin",
  },
];
