import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/add-product">Add product</Link>
      <Link to="/saved-books">Saved books</Link>
      <Link to="/auth">User</Link>
    </nav>
  );
};

export default NavBar;
