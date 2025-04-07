import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import spaceVideo from "../content/space.mp4";

const WEATHER_API_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=55.7512&longitude=37.6184&current=temperature_2m";
const NEWS_API_URL = "https://api.spaceflightnewsapi.net/v4/articles";

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [news, setNews] = useState([]);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);

  useEffect(() => {
    // Загрузка погоды
    fetch(WEATHER_API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log("Ответ погоды:", data);
        if (data.current) {
          setWeather(data.current.temperature_2m);
        }
        setLoadingWeather(false);
      })
      .catch(() => setLoadingWeather(false));

    // Загрузка новостей
    fetch(NEWS_API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log("Ответ новостей:", data);
        if (data.results || data.articles || data.docs) {
          setNews((data.results || data.articles || data.docs).slice(0, 3));
        }
        setLoadingNews(false);
      })
      .catch(() => setLoadingNews(false));

    let slides = document.querySelectorAll(".slider img");
    let index = 0;

    document.getElementById("next").addEventListener("click", function () {
      slides[index].classList.remove("active");
      index = (index + 1) % slides.length;
      slides[index].classList.add("active");
    });

    document.getElementById("prev").addEventListener("click", function () {
      slides[index].classList.remove("active");
      index = (index - 1 + slides.length) % slides.length;
      slides[index].classList.add("active");
    });
  }, []);

  return (
    <div>
      <Header />
      <div className="main-container">
        <section id="about">
          <div className="video-container">
            <svg width="100%" height="150">
              <defs>
                <path
                  id="curve"
                  d="M 50,150 A 700,700 0 0,1 750,150"
                  fill="transparent"
                />
              </defs>
              <text className="welcome-text">
                <textPath href="#curve" startOffset="50%" textAnchor="middle">
                  Добро пожаловать в космос!
                </textPath>
              </text>
            </svg>
            <video autoPlay muted loop className="background-video">
              <source src={spaceVideo} type="video/mp4" />
              Ваш браузер не поддерживает видео.
            </video>
            <div className="content">
              <h2>Захватывающая бесконечность</h2>
              <p>
                Космос — это бескрайняя вселенная, полная тайн, загадок и
                возможностей. От галактик, возраст которых превышает миллиарды
                лет, до экзопланет, потенциально пригодных для жизни, наш путь к
                звёздам только начинается.
              </p>
            </div>
          </div>
        </section>
        <div className="container-column">
          <div className="left-column">
            <section id="gallery">
              <h2>Исследуйте солнечную систему вместе с нами</h2>
              <div className="slider">
                <button id="prev">⬅</button>
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/021/657/617/small_2x/green-earth-planet-free-png.png"
                  class="active"
                  alt="Земля"
                />
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/020/922/034/small_2x/isolated-realistic-jupiter-illustration-png.png"
                  alt="Юпитер"
                />
                <img
                  src="https://www.atomic-energy.ru/files/taxonomy/mars-1-1.png"
                  alt="Марс"
                />
                <button id="next">➡</button>
              </div>
            </section>

            <section className="facts">
              <h2>Интересные факты о космосе</h2>
              <ul>
                <li>🌍 Один день на Венере длиннее, чем год на Венере.</li>
                <li>🪐 На Сатурне и Юпитере идет дождь из алмазов.</li>
                <li>🚀 Свет от Солнца достигает Земли за 8 минут.</li>
                <li>
                  🌌 Вселенная расширяется со скоростью 67 км/с на мегапарсек.
                </li>
              </ul>
            </section>

            <section className="missions">
              <h2>Миссии NASA и SpaceX</h2>
              <div className="mission">
                <h3>🚀 Artemis II – 2026</h3>
                <p>
                  Второй пилотируемый облет Луны в рамках программы "Артемида".
                </p>
              </div>
              <div className="mission">
                <h3>🚀 SpaceX Starship – 2024</h3>
                <p>
                  Мощнейший ракетоноситель в истории совершил первый успешный
                  суборбитальный полет 14 марта 2024 г.
                </p>
              </div>
            </section>

            <section className="gallery">
              <h2>Галерея космоса</h2>
              <div className="gallery-container">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Andromeda_Galaxy_%28with_h-alpha%29.jpg/411px-Andromeda_Galaxy_%28with_h-alpha%29.jpg"
                  alt="Галактика Андромеды"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/The_VLT_goes_lion_hunting.jpg/1024px-The_VLT_goes_lion_hunting.jpg"
                  alt="Млечный Путь"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/M33_-_Triangulum_Galaxy.jpg/411px-M33_-_Triangulum_Galaxy.jpg"
                  alt="Галактика Треугольника"
                />
              </div>
            </section>
          </div>
          <aside className="right-column">
            <div className="weather">
              <h3>Погода</h3>
              {loadingWeather ? (
                <p>Загрузка...</p>
              ) : (
                <p>{weather ? `${weather}°C` : "Нет данных"}</p>
              )}
            </div>
            <div className="news">
              <h3>Космические новости</h3>
              {loadingNews ? (
                <p>Загрузка...</p>
              ) : news.length > 0 ? (
                news.map((article) => (
                  <div key={article.id} className="news-card">
                    {article.image_url && (
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="news-image"
                      />
                    )}
                    <div className="news-content">
                      <h4>{article.title}</h4>
                      <p>
                        {article.summary
                          ? article.summary.slice(0, 100)
                          : "Нет описания"}
                        ...
                      </p>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="news-button"
                      >
                        Читать далее
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <p>Нет доступных новостей</p>
              )}
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
