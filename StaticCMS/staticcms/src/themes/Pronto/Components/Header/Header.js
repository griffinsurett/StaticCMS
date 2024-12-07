import React, { useState, useEffect } from "react";
import "./header.css";
import Menu from "./Menu";
import Hamburger from "./Hamburger";

const Header = ({ siteSettings }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Automatically close the menu when the screen is resized
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false); // Close the menu when resizing to desktop
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="site-header">
        <div className="container">
          <div className="header-content">
            {/* Site Title */}
            <h1 className="site-title">{siteSettings.siteTitle}</h1>

            {/* Hamburger Menu */}
            <Hamburger isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

            {/* Navigation Menu */}
            <Menu siteSettings={siteSettings} isMenuOpen={isMenuOpen} />
          </div>
        </div>
      </header>

      {/* Full-screen overlay */}
      {isMenuOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}
    </>
  );
};

export default Header;
