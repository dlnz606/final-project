import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div>
      <Header />
      <div className="about-container">
        <h1>О проекте</h1>
        <p>
          Space Explorer — это сайт, посвященный исследованию космоса. Здесь вы
          найдете информацию о последних миссиях, астрономические фотографии и
          космические новости.
        </p>
        <h2>Функции</h2>
        <ul>
          <li>Фото дня от NASA</li>
          <li>Информация о последних запусках SpaceX</li>
          <li>Космические новости</li>
          <li>Темная и светлая темы</li>
        </ul>
        <h2>Источники данных</h2>
        <p>Мы используем API NASA, SpaceX и другие открытые источники.</p>
      </div>
      <Footer />
    </div>
  );
};

export default About;
