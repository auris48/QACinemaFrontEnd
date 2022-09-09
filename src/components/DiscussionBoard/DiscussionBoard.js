import React, { useEffect, useState, useRef } from "react";
import Post from "./Post";
import "./styles/DiscussionBoardStyles.css";
import AddPostForm from "./AddPostForm";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function DiscussionBoard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setAdding] = useState(false);
  const [listRef] = useAutoAnimate();

  const handleDeletePost = (id) => {
    fetch(`http://localhost:3000/Posts/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.status)
      .then((status) => {
        if (status === 200) {
          setPosts(posts.filter((post) => post._id !== id));
        }
      });
  };

  useEffect(() => {
    fetch("http://localhost:3000/Posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  const renderPosts = () => {
    return posts.map((data) => <Post {...data} onDelete={handleDeletePost} />);
  };

  const handleSubmit = (e, post) => {
    e.preventDefault();
    fetch("http://localhost:3000/Posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: post.title, content: post.content }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts([...posts, data]);
        setAdding(false);
      });
  };

  return (
    <div className="dboard-wrapper">
      {isAdding && (
        <AddPostForm
          onClick={() => setAdding(true)}
          bgOnClickHandler={() => {
            setAdding(false);
          }}
          handleSubmit={handleSubmit}
        />
      )}
      <button
        className="dboard-add-post"
        onClick={() => setAdding(true)}></button>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div ref={listRef} className="dboard-post-list">
          {posts.map((data) => (
            <Post key={data._id} {...data} onDelete={handleDeletePost} />
          ))}{" "}
        </div>
      )}
    </div>
  );
}
