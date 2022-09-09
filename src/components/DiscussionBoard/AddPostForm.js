import React, { useState } from "react";

export default function AddPostForm(props) {
  const [post, setPost] = useState({
    title: "",
    content: "",
    movie: "",
    rating: 0,
  });
  console.log(post);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  return (
    <>
      <div
        onClick={() => props.bgOnClickHandler(false)}
        className="dboard-pagemask"></div>
      <div className="add-post-wrapper">
        <form onSubmit={(e) => props.handleSubmit(e, post)}>
          <input
            type="text"
            placeholder="Name"
            name="title"
            onChange={handleChange}
            value={post.title}
          />

          <textarea
            placeholder="Your Post"
            name="content"
            onChange={handleChange}
            value={post.content}
          />

          <select name="movie">
            <option value="">--- Select Movie --- </option>
          </select>

          <div>
            <button>Add</button>
            <button type="button" onClick={() => props.bgOnClickHandler(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
