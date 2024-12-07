// Footer.js
import React from "react";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = ({ siteSettings }) => {
  const footerMenu = siteSettings.menus.find((menu) => menu.name === "Footer");
  const contactMenu = siteSettings.menus.find((menu) => menu.name === "Contact Info");
  const socialMenu = siteSettings.menus.find((menu) => menu.name === "Social Media");

  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <ul className="footer-menu">
          {footerMenu?.items.map((item, index) => (
            <li key={index} className="footer-item">
              <a href={item.slug || item.link}>{item.title}</a>
            </li>
          ))}
        </ul>

        {contactMenu && (
          <ul className="contact-menu">
            <h4>Contact Info</h4>
            {contactMenu.items.map((item, index) => (
              <li key={index} className="contact-item">
                <a href={item.link}>{item.title}</a>
              </li>
            ))}
          </ul>
        )}

        {socialMenu && (
          <ul className="social-menu">
            <h4>Follow Us</h4>
            {socialMenu.items.map((item, index) => (
              <li key={index} className="social-item">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={item.icon} />
                </a>
              </li>
            ))}
          </ul>
        )}

        <p>{siteSettings.Copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;
