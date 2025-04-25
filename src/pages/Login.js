import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://final-project-backend-82js.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Ошибка входа");
      }

      localStorage.setItem("token", data.token);
      alert("Вход выполнен успешно!");
      navigate("/profile");
    } catch (error) {
      alert(`Ошибка: ${error.message}`);
    }
  };

  return (
    <div>
      <Header />
      <div className="auth-container">
        <h2>Вход в аккаунт</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Войти</button>
        </form>
        <p>
          Нет аккаунта? <a href="/register">Зарегистрироваться</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
