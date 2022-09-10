import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles/DiscussionBoardStyles.css";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function PostThread() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [listRef] = useAutoAnimate();

  useEffect(() => {
    fetch(`http://localhost:3000/Posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      });
  }, []);

  const submitComment = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/Posts/Add_Reply/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: e.target.comment.value }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setPost({ ...post, replies: [data, ...post.replies] });
          e.target.comment.value = "";
        });
      }
    });
  };

  return (
    <>
      <div className="dboard-wrapper">
        <button className="dboard-add-post"></button>
        <div className="post-thread-opening-post-wrapper">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
        <CommentForm handleSubmit={submitComment} />
        <div ref={listRef} className="comments-container">
          {post.replies &&
            post.replies
              .sort((a, b) => {
                if (a.dateCreated > b.dateCreated) {
                  return -1;
                } else if (a.dateCreated < b.dateCreated) {
                  return 1;
                }
                return 0;
              })
              .map((reply) => <Comment key={reply._id} {...reply} />)}
        </div>
      </div>
    </>
  );
}
