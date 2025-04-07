import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NASA_API_URL =
  "https://api.nasa.gov/planetary/apod?api_key=tze7pOrJxnCOELz73ktcOfrEd0jDRhEXu62URJKl";

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState({ name: "John Doe", isAuthenticated: true }); // Модель пользователя
  const navigate = useNavigate();

  // Загрузка данных поста
  useEffect(() => {
    fetch(NASA_API_URL)
      .then((res) => res.json())
      .then((data) => {
        setPost({
          title: data.title || "Название недоступно",
          image: data.url || "https://via.placeholder.com/400",
          description: data.explanation || "Описание отсутствует",
          date: data.date || "Дата неизвестна",
          mediaType: data.media_type || "unknown",
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Обработка отправки комментария
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([
        ...comments,
        { name: user.name, text: comment }, // Добавляем имя пользователя в комментарий
      ]);
      setComment(""); // очищаем поле ввода после отправки
    }
  };

  if (loading) return <p>Загрузка...</p>;
  if (!post) return <Navigate to="/notfound" />;

  return (
    <>
      <Header />
      <div className="post-detail">
        <h2>{post.title}</h2>
        <p>
          <strong>Дата:</strong> {post.date}
        </p>
        {post.mediaType === "image" ? (
          <img src={post.image} alt={post.title} />
        ) : (
          <iframe
            src={post.image}
            frameBorder="0"
            allowFullScreen
            title="NASA Video"
            width="560"
            height="315"
          ></iframe>
        )}
        <p>{post.description}</p>

        {user.isAuthenticated ? (
          <div className="comment-section">
            <h3>Комментарии</h3>
            <form onSubmit={handleCommentSubmit}>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Оставьте комментарий..."
                rows="4"
                className="comment-input"
              />
              <button type="submit" className="comment-submit-button">
                Отправить
              </button>
            </form>

            <div className="comments-list">
              {comments.map((comment, index) => (
                <div key={index} className="comment">
                  <strong>{comment.name}:</strong> <p>{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>Чтобы оставить комментарий, пожалуйста, авторизуйтесь.</p>
        )}

        <div className="buttons">
          <button className="back-button" onClick={() => navigate(-1)}>
            ⬅ Назад
          </button>
          <button className="back-button" onClick={() => navigate("/")}>
            На главную
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostDetail;
