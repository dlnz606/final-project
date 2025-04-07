import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NASA_API_URL =
  "https://api.nasa.gov/planetary/apod?api_key=tze7pOrJxnCOELz73ktcOfrEd0jDRhEXu62URJKl";

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        <button className="back-button" onClick={() => navigate(-1)}>
          ⬅ Назад
        </button>
        <button className="back-button" onClick={() => navigate("/")}>
          На главную
        </button>
      </div>
      <Footer />
    </>
  );
};

export default PostDetail;
