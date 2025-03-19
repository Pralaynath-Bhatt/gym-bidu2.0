import { Outlet, Link } from "react-router-dom";
import ResponsiveAppBar from "./ResponsiveAppBar";
const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/myworkout">MyWorkout</Link>
          </li>
          <li>
            <Link to="/plans">Plans</Link>
          </li>
        </ul>
      </nav>
        <ResponsiveAppBar/>
      <Outlet />
    </>
  )
};

export default Layout;