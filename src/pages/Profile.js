import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = {
      email: "user@example.com",
      username: "cosmic_explorer",
    };
    setUser(userData);
  }, []);

  const handleLogout = () => {
    console.log("Logged out");
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
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
};

export default ProfilePage;
