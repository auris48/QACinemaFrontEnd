import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loginContext } from "../../appContext/Context";
import "./styles/DiscussionBoardStyles.css";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { dateConverter } from "../../utils/dateConverter";
import { Link } from "react-router-dom";
export default function PostThread() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [username, setUsername] = useState();
  const [loading, setLoading] = useState(true);
  const [listRef] = useAutoAnimate();
  const [movie, setMovie] = useState({});
  const navigate = useNavigate();
  const { user } = useContext(loginContext);
  const { loggedIn } = useContext(loginContext);

  useEffect(() => {
    fetch(`http://localhost:3000/Posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/User/${post.user}`)
      .then((response) => response.json())
      .then((data) => {
        setUsername(data.username);
      });
  }, [post]);

  const handleEditComment = (id, newComment) => {
    fetch(`http://localhost:3000/Posts/Edit_Reply/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newComment }),
    })
      .then((res) => res.json())
      .then((data) => {
        let newComments = [...post.comments];
        newComments = newComments.map((comment) => {
          return comment._id === id ? data : comment;
        });
        setPost({ ...post, comments: newComments });
      });
  };

  const renderRating = () => {
    let rating = [];
    for (let i = 0; i < post.rating; i++) {
      rating.push(
        <li>
          <span className="postthread-rating-star">★</span>
        </li>
      );
    }
    return <ul className="postthread-rating">{rating}</ul>;
  };

  useEffect(() => {
    if (post.movie) {
      fetch(`http://localhost:3000/movie/${post.movie}`)
        .then((response) => response.json())
        .then((data) => {
          setMovie(data);
        });
    }
  }, [post.movie]);

  const handleAddReply = (e, commentID) => {
    e.preventDefault();
    fetch(`http://localhost:3000/Posts/Add_Comment_Reply/${commentID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: e.target.replyMessage.value,
        user: user,
      }),
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
      body: JSON.stringify({ content: e.target.comment.value, user: user }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setPost({ ...post, comments: [data, ...post.comments] });
          e.target.comment.value = "";
        });
      }
    });
  };

  const deleteComment = (commentID) => {
    fetch(`http://localhost:3000/Posts/Delete_Reply/${commentID}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        let newPost = { ...post };
        newPost.comments = newPost.comments.filter(
          (comment) => comment._id !== commentID
        );
        setPost(newPost);
      }
    });
  };

  return (
    <>
      <div className="discussion-board">
        <div className="dboard-wrapper">
          <button
            onClick={() => navigate(-1)}
            id="add-post-btn"
            className="post-thread-submit-comment-button">
            Back to forum
          </button>
          <div className="post-thread-opening-post-wrapper">
            {movie && (
              <div className="post-movie-poster">
                <img alt="movie image" src={movie.imageURL} />
                {renderRating()}
              </div>
            )}
            <div className="opening-post-content-wrapper">
              <h3 className="opening-post-title">{post.title}</h3>
              <p className="opening-post-content">{post.content}</p>
              <div className="opening-post-footer">
                <span>{username}</span>
                <span>
                  {post.dateCreated && dateConverter(post.dateCreated)}
                </span>
              </div>
            </div>
          </div>
          {loggedIn ? (
            <CommentForm handleSubmit={submitComment} />
          ) : (
            <p style={{ color: "white", margin: "0 auto", padding: "30px" }}>
              You must log in to post comments
            </p>
          )}
          <div ref={listRef} className="comments-container">
            {post.comments && post.comments.length > 0 ? (
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
                    handleReplySubmit={(e) => handleAddReply(e, comment._id)}
                    handleDeleteComment={() => deleteComment(comment._id)}
                    handleEditComment={(newComment) =>
                      handleEditComment(comment._id, newComment)
                    }
                    {...comment}
                  />
                ))
            ) : (
              <p className="no-posts-message">No comments yet...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
