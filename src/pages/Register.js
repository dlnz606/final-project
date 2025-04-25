import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Пароли не совпадают!");
      return;
    }

    try {
      const response = await fetch(
        "https://final-project-backend-82js.onrender.com/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            isAdmin: false, // по умолчанию false
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Ошибка регистрации");
      }

      alert("Регистрация успешна!");
      navigate("/login");
    } catch (error) {
      alert(`Ошибка: ${error.message}`);
    }
  };

  return (
    <div>
      <Header />
      <div className="auth-container">
        <h2>Регистрация</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <input
            type="password"
            placeholder="Подтвердите пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Зарегистрироваться</button>
        </form>
        <p>
          Уже есть аккаунт? <a href="/login">Войти</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
