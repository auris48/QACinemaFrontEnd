import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles/DiscussionBoardStyles.css";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { dateConverter } from "../../utils/dateConverter";

export default function PostThread() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [listRef] = useAutoAnimate();

  console.log(post);
  useEffect(() => {
    fetch(`http://localhost:3000/Posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      });
  }, []);

  const handleAddReply = (e, commentID) => {
    e.preventDefault();
    let isAdded = false; 
    fetch(`http://localhost:3000/Posts/Add_Comment_Reply/${commentID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: e.target.replyMessage.value }),
    })
      .then((res) => res.json())
      .then((data) => {
        let newPost = { ...post };
        newPost.comments = newPost.comments.map((comment) => {
          if (comment._id === commentID) {
            return { ...comment, replies: [...comment.replies, data] };
          } else {
            return comment;
          }
        });
        setPost(newPost);
    });
  };

  const submitComment = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/Posts/Add_Comment/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: e.target.comment.value }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setPost({ ...post, comments: [data, ...post.comments] });
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
          <img
            alt="user"
            src="https://upload.wikimedia.org/wikipedia/en/5/59/The_Gray_Man_poster.png"
          />
          <div className="opening-post-content-wrapper">
            <h3 className="opening-post-title">{post.title}</h3>
            <p className="opening-post-content">{post.content}</p>
            <div className="opening-post-footer">
              <span>User</span>
              <span>{post.dateCreated && dateConverter(post.dateCreated)}</span>
            </div>
          </div>
        </div>
        <CommentForm handleSubmit={submitComment} />
        <div ref={listRef} className="comments-container">
          {post.comments &&
            post.comments
              .sort((a, b) => {
                if (a.dateCreated > b.dateCreated) {
                  return -1;
                } else if (a.dateCreated < b.dateCreated) {
                  return 1;
                }
                return 0;
              })
              .map((comment) => (
                <Comment
                  key={comment._id}
                  handleReplySubmit={handleAddReply}
                  {...comment}
                />
              ))}
        </div>
      </div>
    </>
  );
}
