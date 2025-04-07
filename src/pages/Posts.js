import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import Loader from "../components/Loader";
import Header from "../components/Header";

// URL для получения данных о NASA
const NASA_API_URL =
  "https://api.nasa.gov/planetary/apod?api_key=tze7pOrJxnCOELz73ktcOfrEd0jDRhEXu62URJKl";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(NASA_API_URL)
      .then((res) => res.json())
      .then((data) => {
        setPosts([
          {
            id: data.date, // Уникальный идентификатор поста по дате
            title: data.title,
            image: data.url,
            date: data.date,
            explanation: data.explanation, // Добавлено описание для поста
          },
        ]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <Header />
      <div className="container">
        {posts.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            image={post.image}
            date={post.date}
            explanation={post.explanation}
            id={post.id}
          />
        ))}
      </div>
    </>
  );
};

const Post = ({ title, image, id, date, explanation }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="post">
      <img src={image} alt={title} className="post-image" />
      <h3 className="post-title">{title}</h3>
      <p className="post-date">{date}</p>
      <p className="post-explanation">{explanation.slice(0, 150)}...</p>
      <div className="post-actions">
        <button className="like-button" onClick={() => setLiked(!liked)}>
          <FaHeart color={liked ? "red" : "white"} />
        </button>
        <Link to={`/post/${id}`} className="post-link">
          Подробнее
        </Link>
      </div>
    </div>
  );
};

export default Posts;
