import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import { useAuth } from "../contexts/Auth";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (user) {
      logout();
    } else {
      navigate("/login");
    }
  };

  return (
    <header className={theme}>
      <div className="logo">Space Explorer</div>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              О нас
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/missions"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Миссии
            </NavLink>
          </li>
          <li>
            <button onClick={toggleTheme} className="theme-toggle">
              {theme === "dark" ? "🌞 Светлая" : "🌙 Темная"}
            </button>
          </li>
          <li>
            {user ? (
              <>
                <NavLink
                  to="/profile"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Профиль
                </NavLink>
                <button onClick={logout} className="auth-button">
                  Выйти
                </button>
              </>
            ) : (
              <button onClick={handleAuthClick} className="auth-button">
                {user ? "Выйти" : "Войти"}
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
