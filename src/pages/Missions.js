import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SPACEX_MISSIONS_URL = "https://api.spacexdata.com/v4/launches";

const Missions = () => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(SPACEX_MISSIONS_URL)
      .then((res) => res.json())
      .then((data) => {
        setMissions(data.slice(0, 5));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <Header />
      <div className="missions-container">
        <h1>Космические миссии SpaceX</h1>
        {loading ? (
          <p>Загрузка...</p>
        ) : (
          <ul>
            {missions.map((mission) => (
              <li key={mission.id}>
                <h2>{mission.name}</h2>
                <p>
                  <strong>Дата запуска:</strong>{" "}
                  {new Date(mission.date_utc).toLocaleDateString()}
                </p>
                <p>{mission.details || "Нет описания."}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Missions;
