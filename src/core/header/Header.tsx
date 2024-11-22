import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <nav className="nav-tabs">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/registrants"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              Registrant List
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
