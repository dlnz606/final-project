import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div>
    <Header />
    <div className="NotFound-container">
      <h2>Страница не найдена</h2>
      <p>К сожалению, запрашиваемая страница не существует.</p>
      <Link to="/" className="back-btn">
        Вернуться на главную
      </Link>
    </div>
  </div>
);

export default NotFound;
