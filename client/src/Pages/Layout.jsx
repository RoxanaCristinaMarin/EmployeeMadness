import { Outlet, Link } from "react-router-dom";

import "./Layout.css";

const Layout = () => (
  <div className="Layout">
    <nav>
      <ul>
        <li className="grow">
          <Link to="/">Employees</Link>
        </li>
        <li className="grow">
          <Link to="/equipments">Equipments</Link>
        </li>
        <li>
          <Link to="/missing">
            <button type="button">Missing Employees</button>
          </Link>
          <Link to="/create">
            <button type="button">Create Employee</button>
          </Link>
          <Link to="/create-equipment">
            <button type="button">Create Equipment</button>
          </Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </div>
);

export default Layout;
