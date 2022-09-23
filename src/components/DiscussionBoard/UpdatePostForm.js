import React, { useEffect, useState } from "react";
import "./styles/DiscussionBoardStyles.css";
import StarRating from "./StarRating";

export default function UpdatePostForm(props) {
  const [moviesData, setMoviesData] = useState([]);
  const [newPost, setNewPost] = useState({
    title: props.title,
    content: props.content,
    movie: props.movie,
    rating: props.rating,
  });
  console.log(props._id);
  console.log(newPost);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const checkInputs = () => {
    if (newPost.title.length < 5) {
      return "Title must be at least 5 characters long";
    }
    if (newPost.content.length < 5)
      return "Content must be at least 5 characters long";
    if (!newPost.movie) {
      return "You must select a movie";
    }
    return true;
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
              return alert(check);
            } else {
              return props.handleSubmit(e, props._id, newPost);
            }
          }}>
          <input
            type="text"
            id="title"
            placeholder="Name"
            name="title"
            onChange={handleChange}
            value={newPost.title}
          />

          <textarea
            placeholder="Your Post"
            name="content"
            id="content"
            onChange={handleChange}
            value={newPost.content}
          />

          <select onChange={handleChange} name="movie" id="movie">
            {moviesData.map((movie) => (
              <option selected={newPost.movie === movie._id} value={movie._id}>
                {movie.title}
              </option>
            ))}
          </select>

          {newPost.movie && (
            <StarRating
              defaultValue={newPost.rating}
              handleChange={handleChange}
            />
          )}
          <div className="add-post-actions">
            <button className="post-thread-submit-comment-button">
              Update
            </button>
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
