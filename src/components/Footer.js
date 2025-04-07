import React from "react";
import { Link } from "react-router-dom";

/*Страницы Контакты не существует, отображается NotFound*/
const Footer = () => (
  <footer>
    <div className="footer-content">
      <p>© 2025 Space Explorer | Контакты: info@spaceexp.com</p>
      <nav>
        <ul>
          <li>
            <Link to="/about">О нас</Link>
          </li>
          <li>
            <Link to="/missions">Миссии</Link>
          </li>
          <li>
            <Link to="/contact">Контакты</Link>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
);

export default Footer;
