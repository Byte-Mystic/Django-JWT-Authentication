import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import AuthContext from "../context/AuthContext";

const Header = () => {
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <div className="header">
      <div className="header-container">
        <div className="nav-links">
          <div className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </div>
          {user ? (
            <div>
              <div className="nav-item">
                <Link className="nav-link" onClick={logoutUser}>
                  Logout
                </Link>
              </div>
              <div className="nav-item">
                <Link to="/notes" className="nav-link">
                  Notes
                </Link>
              </div>
            </div>
          ) : (
            <div>
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
            </div>
          )}
        </div>

        <div className="user-welcome">
          {user && <p>Welcome Back, {user.username}</p>}
        </div>
      </div>
    </div>
  );
};

export default Header;
