import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-gray-900 p-4 shadow-lg rounded-md">
      <div className="container mx-auto flex justify-center">
        <ul className="flex space-x-6">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-gray-200 hover:text-yellow-300 transition duration-300 ease-in-out 
                 ${isActive ? "font-semibold underline" : "font-medium"}`
              }
            >
              Main
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/uncontrolled" 
              className={({ isActive }) => 
                `text-gray-200 hover:text-yellow-300 transition duration-300 ease-in-out 
                 ${isActive ? "font-semibold underline" : "font-medium"}`
              }
            >
              Uncontrolled
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/hook" 
              className={({ isActive }) => 
                `text-gray-200 hover:text-yellow-300 transition duration-300 ease-in-out 
                 ${isActive ? "font-semibold underline" : "font-medium"}`
              }
            >
              React Hook Form
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
