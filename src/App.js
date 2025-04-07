import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import About from "./pages/About";
import Missions from "./pages/Missions";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "./contexts/Auth";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ProfilePage from "./pages/Profile";

const PrivateRoute = ({ element }) => {
  const { user } = useAuth();
  return user ? element : <Navigate to="/login" />;
};

const AppRoutes = () => {
  const { user } = useAuth(); // Получаем данные пользователя

  return (
    <Routes>
      {/* Главная страница доступна всем */}
      <Route path="/" element={<Home />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/post/:id" element={<PostDetail />} />
      <Route path="/about" element={<About />} />
      <Route
        path="/missions"
        element={<PrivateRoute element={<Missions />} />}
      />
      <Route
        path="/profile"
        element={<PrivateRoute element={<ProfilePage />} />}
      />
      <Route path="/notfound" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/notfound" />} />
      <Route
        path="/login"
        element={!user ? <LoginPage /> : <Navigate to="/" />}
      />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

// Оборачиваем в AuthProvider
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
