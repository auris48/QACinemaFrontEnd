import React, { useEffect, useState, useRef } from "react";
import Post from "./Post";
import "./styles/DiscussionBoardStyles.css";
import AddPostForm from "./AddPostForm";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Link, Routes, Route } from "react-router-dom";
import UpdatePostForm from "./UpdatePostForm";

export default function DiscussionBoard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setAdding] = useState(false);
  const [listRef] = useAutoAnimate();
  const [isUpdating, setIsUpdating] = useState(false);
  const [postToUpdate, setPostToUpdate] = useState({});

  const handleDeletePost = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
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
    fetch("http://localhost:3000/Posts").then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setPosts(data);
          setLoading(false);
        });
      }
    });
  }, []);

  const handleUpdatePost = (e, id, newPost) => {
    e.preventDefault();
    fetch(`http://localhost:3000/Posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newPost }),
    })
      .then((res) => res.json())
      .then((data) => {
        let newPosts = [...posts];
        newPosts = newPosts.map((post) => {
          return post._id === id ? data : post;
        });
        setPosts(newPosts);
        setIsUpdating(false);
      });
  };

  const renderPosts = () => {
    return posts.map((data) => <Post {...data} onDelete={handleDeletePost} />);
  };

  const handleSubmit = (e, post) => {
    e.preventDefault();
    if (post.title.length < 3) {
      alert("Title must be at least 5 characters long");
      return;
    }

    fetch("http://localhost:3000/Posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setPosts([data, ...posts]);
          setAdding(false);
        });
      }
    });
  };

  return (
    <div className="dboard-wrapper">
      {isAdding && (
        <AddPostForm
          bgOnClickHandler={() => {
            setAdding(false);
          }}
          handleSubmit={handleSubmit}
        />
      )}

      {isUpdating && (
        <UpdatePostForm
          bgOnClickHandler={() => {
            setIsUpdating(false);
          }}
          handleSubmit={(e, id, newPost) => {
            handleUpdatePost(e, id, newPost);
          }}
          {...postToUpdate}
        />
      )}

      <button
        id="add-post-btn"
        className="post-thread-submit-comment-button"
        onClick={() => setAdding(true)}>
        New Post
      </button>
      <div ref={listRef} className="dboard-post-list">
        {posts && posts.length > 0 ? (
          posts.map((data) => (
            <Link
              key={data._id}
              to={`/DiscussionBoard/Post/${data._id}`}
              style={{ width: "100%", textDecoration: "none" }}>
              <Post
                key={data._id}
                {...data}
                onDelete={handleDeletePost}
                onUpdate={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsUpdating(true);
                  setPostToUpdate(data);
                }}
              />
            </Link>
          ))
        ) : (
          <p className="no-posts-message">No posts yet...</p>
        )}
      </div>
    </div>
  );
}
