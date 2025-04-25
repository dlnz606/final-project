import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Вы не авторизованы!");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          "https://final-project-backend-82js.onrender.com/users/me",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Ошибка получения данных пользователя"
          );
        }

        setUser(data);
      } catch (err) {
        alert(err.message);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="profile-container">
      <Header />
      <h2>Профиль пользователя</h2>
      <p>
        <strong>Имя:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Роль:</strong> {user.isAdmin ? "Администратор" : "Пользователь"}
      </p>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
};

export default ProfilePage;
