import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import "./Header.css";
import FlashlightOnIcon from '@mui/icons-material/FlashlightOn';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/" className="title">
      <FlashlightOnIcon />
        MyKeeper
      </Link>
      <div 
        className="menu" 
        onClick={() => 
          setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
        <ul className={menuOpen ? "open" : ""}>
          <li className="nav_btn">
            <NavLink to="/signin" className="button">
              Sign in
            </NavLink>
            </li>
        </ul>
    </nav>
  );
}

export default Header;
