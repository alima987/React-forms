import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink 
          to="/" 
          className={({ isActive }) => {
      return isActive ? "active-link" : "";
    }}
           >Main
        </NavLink>
        </li>
        <li>
          <NavLink to="/uncontrolled" 
          className={({ isActive }) => {
            return isActive ? "active-link" : "";
          }}
          >Uncontrolled
          </NavLink>
        </li>
        <li>
          <NavLink 
          to="/hook"  
          className={({ isActive }) => {
          return isActive ? "active-link" : "";
            }}
          >React Hook Form
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;