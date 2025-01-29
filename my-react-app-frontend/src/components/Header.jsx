import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import "./Header.css";
import FlashlightOnIcon from '@mui/icons-material/FlashlightOn';
import Button from '@mui/material/Button';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (

    <nav>
      <Link to="/" className="title">
        <FlashlightOnIcon />
        MyKeeper
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li className="nav_btn">
          <Button size="large">
            <NavLink to="/signup">Sign Up</NavLink>
          </Button>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
