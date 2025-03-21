import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link,useNavigate } from "react-router-dom";
import Connectwallet from "./Connectwallet";

const Navbar = () => {
  const navigate = useNavigate()
  const isauth = window.localStorage.getItem("auth")
  const [isMobile, setIsMobile] = useState(false);

  // Listen for changes in screen size
  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isSmallScreen && isMobile); // Only update if small screen and already mobile view
    };

    window.addEventListener("resize", handleResize);

    // Remove event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  return (
    <nav className="navbar">
      <h3 >
        <Link to="/" className="logo">UpShare</Link>
      </h3>
      <ul
        className={isMobile ? "nav-links-mobile active" : "nav-links"}
        onClick={() => setIsMobile(false)}
      >
        {!isauth?<>
          <Link to="/auth/signin/level1" className="item">
          <li>login</li>
        </Link>
        <Link to="/auth/signup/level1" className="item">
          <li>Signup</li>
        </Link>
        </>
        :
        <>
        <Link to="/Secondpage" className="item">
          <li>Upload</li>
        </Link>
        <li onClick={()=>{
          window.localStorage.clear()
          navigate("/auth/signin/level1")
        }}>Logout</li>
        </>
        }
        <Link className="item">
          <li>
            <Connectwallet />
          </li>
        </Link>
      </ul>
      <button
        className="mobile-menu-icon"
        onClick={() => setIsMobile(!isMobile)}
      >
        {isMobile ? (
          <i className="fas fa-times"></i>
        ) : (
          <i className="fas fa-bars"></i>
        )}
      </button>
    </nav>
  );
};

export default Navbar;

