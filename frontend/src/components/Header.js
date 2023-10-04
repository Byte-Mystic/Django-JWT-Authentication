import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import AuthContext from "../context/AuthContext";
import { ReactComponent as Icon } from "../assets/dev.svg";

const Header = () => {
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <div className="nav">
      <div className="logo">
        <Link className="nav-link" to="/">
          <Icon />
        </Link>
      </div>
      <div className="nav-links">
        {user ? (
          <>
            <div className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </div>
            <div className="nav-item">
              <Link to="/notes" className="nav-link">
                Notes
              </Link>
            </div>
            <div className="nav-item">
              <Link className="nav-link" onClick={logoutUser}>
                Logout
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </div>
            <div className="nav-item">
              <Link to="/register" className="nav-link">
                Sign up
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
