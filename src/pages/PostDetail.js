import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const POSTS_API_URL = "https://final-project-backend-82js.onrender.com/posts";
const COMMENTS_API_URL =
  "https://final-project-backend-82js.onrender.com/comments";

const PostDetail = () => {
  const { id } = useParams(); // Получаем id поста из URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState({ name: "John Doe", isAuthenticated: true }); // Модель пользователя
  const navigate = useNavigate();

  // Загрузка данных поста и комментариев
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${POSTS_API_URL}/${id}`);
        const postData = await response.json();
        setPost(postData);
        setComments(postData.comments); // Получаем комментарии с постом
        setLoading(false);
      } catch (error) {
        console.error("Ошибка при загрузке поста:", error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Обработка отправки комментария
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Вы не авторизованы!");
        return;
      }

      try {
        const response = await fetch(COMMENTS_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: token,
            postId: post._id,
            content: comment,
          }),
        });

        const newComment = await response.json();
        if (response.ok) {
          setComments([...comments, newComment]);
          setComment(""); // очищаем поле ввода после отправки
        } else {
          alert(newComment.error || "Ошибка при добавлении комментария");
        }
      } catch (error) {
        console.error("Ошибка при отправке комментария:", error);
        alert("Ошибка при выполнении операции!");
      }
    }
  };

  // Удаление комментария
  const handleDeleteComment = async (commentId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Вы не авторизованы!");
      return;
    }

    try {
      const response = await fetch(`${COMMENTS_API_URL}/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setComments(comments.filter((comment) => comment._id !== commentId));
      } else {
        alert(data.error || "Ошибка при удалении комментария");
      }
    } catch (error) {
      console.error("Ошибка при удалении комментария:", error);
      alert("Ошибка при выполнении операции!");
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
            title="Видео NASA"
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
              {comments.length ? (
                comments.map((comment) => (
                  <div key={comment._id} className="comment">
                    <strong>{comment.user.name}:</strong>{" "}
                    <p>{comment.content}</p>
                    {user.isAuthenticated && (
                      <button
                        className="delete-comment"
                        onClick={() => handleDeleteComment(comment._id)}
                      >
                        Удалить
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p>Комментариев еще нет</p>
              )}
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
