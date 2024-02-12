import { NavLink, Outlet } from "react-router-dom";

export default function MainLayouts() {
  return (
    <div>
      <nav className="flex items-center justify-center gap-5">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/chat">Chat</NavLink>
      </nav>
      <div className="container mx-auto">
        <Outlet />
      </div>
    </div>
  );
}
