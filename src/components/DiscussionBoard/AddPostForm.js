import React, { useEffect, useState, useContext } from "react";
import "./styles/DiscussionBoardStyles.css";
import StarRating from "./StarRating";

export default function AddPostForm(props) {
  const [moviesData, setMoviesData] = useState([]);
  const [post, setPost] = useState({
    title: "",
    content: "",
    movie: "",
    rating: 1,
  });

  const checkInputs = () => {
    if (post.title.length < 5) {
      return "Title must be at least 5 characters long";
    }
    if (post.content.length < 5)
      return "Content must be at least 5 characters long";
    if (!post.movie) {
      return "You must select a movie";
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  useEffect(() => {
    fetch(`http://localhost:3000/Movie`).then((response) =>
      response.json().then((data) => {
        setMoviesData(data);
      })
    );
  }, []);

  return (
    <>
      <div
        onClick={() => props.bgOnClickHandler(false)}
        className="dboard-pagemask"></div>
      <div className="add-post-wrapper">
        <form
          onSubmit={(e) => {
            const check = checkInputs();
            e.preventDefault();
            if (check !== true) {
              return alert(checkInputs());
            } else {
              return props.handleSubmit(e, post);
            }
          }}>
          <input
            type="text"
            id="title"
            placeholder="Name"
            name="title"
            onChange={handleChange}
            value={post.title}
          />

          <textarea
            placeholder="Your Post"
            name="content"
            id="content"
            onChange={handleChange}
            value={post.content}
          />
          <select onChange={handleChange} name="movie" id="movie">
            <option selected disabled hidden>
              ---Select Movie---{" "}
            </option>
            {moviesData.map((movie) => (
              <option value={movie._id}>{movie.title}</option>
            ))}
          </select>
          {post.movie && (
            <StarRating rating={post.rating} handleChange={handleChange} />
          )}
          <div className="add-post-actions">
            <button className="post-thread-submit-comment-button">Add</button>
            <button
              type="button"
              className="post-thread-submit-comment-button"
              onClick={() => props.bgOnClickHandler(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
