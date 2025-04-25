import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Header from "../components/Header";

// URL для получения постов с бэкенда
const POSTS_API_URL = "https://final-project-backend-82js.onrender.com/posts";
const COMMENTS_API_URL =
  "https://final-project-backend-82js.onrender.com/comments";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Получаем все посты
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(POSTS_API_URL);
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Ошибка при получении постов:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <Header />
      <div className="container">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </>
  );
};

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");

  // Проверка, лайкнул ли пользователь пост
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userLiked = post.likes.some((like) => like.user._id === token);
      setLiked(userLiked);
    }
  }, [post.likes]);

  // Обработчик лайка
  const handleLike = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Вы не авторизованы!");
      return;
    }

    try {
      const response = await fetch(
        "https://final-project-backend-82js.onrender.com/likes",
        {
          method: liked ? "DELETE" : "POST", // Лайк или его удаление
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: token,
            postId: post._id,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setLiked(!liked);
        setLikeCount(liked ? likeCount - 1 : likeCount + 1);
      } else {
        alert(data.error || "Ошибка при обработке лайка");
      }
    } catch (error) {
      console.error("Ошибка при лайке поста:", error);
      alert("Ошибка при выполнении операции!");
    }
  };

  // Создание комментария
  const handleAddComment = async () => {
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
          content: newComment,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setComments((prevComments) => [...prevComments, data]);
        setNewComment("");
      } else {
        alert(data.error || "Ошибка при добавлении комментария");
      }
    } catch (error) {
      console.error("Ошибка при добавлении комментария:", error);
      alert("Ошибка при выполнении операции!");
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
        setComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentId)
        );
      } else {
        alert(data.error || "Ошибка при удалении комментария");
      }
    } catch (error) {
      console.error("Ошибка при удалении комментария:", error);
      alert("Ошибка при выполнении операции!");
    }
  };

  return (
    <div className="post">
      <img src={post.image} alt={post.title} className="post-image" />
      <h3 className="post-title">{post.title}</h3>
      <p className="post-date">{post.date}</p>
      <p className="post-explanation">{post.explanation.slice(0, 150)}...</p>

      <div className="post-actions">
        <button className="like-button" onClick={handleLike}>
          <FaHeart color={liked ? "red" : "white"} />
          {likeCount > 0 && <span>{likeCount}</span>}
        </button>

        <div className="comments">
          <h4>Комментарии:</h4>
          {comments.length ? (
            comments.map((comment) => (
              <div key={comment._id} className="comment">
                <p>{comment.content}</p>
                <button onClick={() => handleDeleteComment(comment._id)}>
                  Удалить
                </button>
              </div>
            ))
          ) : (
            <p>Комментариев еще нет</p>
          )}
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Добавьте комментарий"
          />
          <button onClick={handleAddComment}>Отправить</button>
        </div>

        <Link to={`/post/${post._id}`} className="post-link">
          Подробнее
        </Link>
      </div>
    </div>
  );
};

export default Posts;
