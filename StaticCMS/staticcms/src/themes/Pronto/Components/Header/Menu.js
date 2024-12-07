import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Menu = ({ siteSettings, isMenuOpen }) => {
  const primaryMenu = siteSettings.menus.find((menu) => menu.name === "Primary");

  return (
    <nav className={`site-nav ${isMenuOpen ? "open" : ""}`}>
      <ul className="menu-list">
        {primaryMenu?.items.map((item, index) => (
          <li key={index} className="menu-item">
            <div className="submenu-container">
              {item.slug ? (
                <Link to={item.slug} onClick={() => (isMenuOpen ? null : null)}>
                  {item.title}
                </Link>
              ) : (
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              )}
              {item.items?.length > 0 && (
                <span className="submenu-indicator">▼</span>
              )}
            </div>
            {item.items?.length > 0 && (
              <ul className="submenu">
                {item.items.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    {subItem.slug ? (
                      <Link to={subItem.slug}>{subItem.title}</Link>
                    ) : (
                      <a
                        href={subItem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {subItem.title}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
