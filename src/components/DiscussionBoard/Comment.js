import React, { useEffect, useRef, useState, useContext } from "react";
import { dateConverter } from "../../utils/dateConverter";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import ReplyForm from "./ReplyForm";
import { loginContext } from "../../appContext/Context";
import Replies from "./Replies";
export default function Comment(props) {
  const [isShowReplies, setIsShowReplies] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [commentRef] = useAutoAnimate();
  const [isEditing, setIsEditing] = useState(false);
  const [commentText, setCommentText] = useState(props.comment);
  const { user } = useContext(loginContext);
  const { loggedIn } = useContext(loginContext);
  const inputRef = useRef(null);
  const [username, setUsername] = useState();

  useEffect(() => {
    fetch(`http://localhost:3000/User/${props.user}`)
      .then((response) => response.json())
      .then((data) => {
        setUsername(data.username);
      });
  }, []);

  useEffect(() => {
    setIsReplying(false);
  }, [props.replies]);

  useEffect(() => {
    inputRef.current.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsEditing(false);
      }
      if (e.key === "Enter") {
        console.log(inputRef.current.innerText);
        props.handleEditComment({
          content: inputRef.current.innerText,
        });

        setIsEditing(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isEditing]);

  return (
    <>
      <div className="comment-container" ref={commentRef}>
        <div className="comment-header-info">
          <strong className="comment-author">{username}</strong>
          <span className="comment-date">
            {dateConverter(props.dateCreated)}
          </span>
        </div>
        <p
          suppressContentEditableWarning={true}
          contentEditable={isEditing}
          ref={inputRef}
          className="comment-content"
          value>
          {props.content}
        </p>
        <div className="comment-footer">
          {loggedIn && user._id === props.user && (
            <>
              <button
                onClick={() => setIsEditing((prev) => !prev)}
                id="comment-edit-button"
                className="comment-button">
                Edit
              </button>
              <button
                id="comment-delete-button"
                onClick={props.handleDeleteComment}
                className="comment-button">
                Delete
              </button>
            </>
          )}
          {loggedIn && (
            <>
              <button
                id="comment-add-reply-button"
                onClick={() => setIsReplying((prev) => !prev)}
                className="comment-button">
                Reply
              </button>
            </>
          )}
          {props.replies.length > 0 && (
            <button
              className={
                isShowReplies
                  ? "view-replies-button up-arrow"
                  : "view-replies-button down-arrow"
              }
              onClick={() => setIsShowReplies((prev) => !prev)}>
              {props.replies.length} Replies
            </button>
          )}
        </div>
        {isReplying && (
          <ReplyForm
            key={props._id}
            handleSubmit={(e) => {
              props.handleReplySubmit(e, props._id);
            }}
            onCancel={() => setIsReplying(false)}
          />
        )}
      </div>

      {isShowReplies &&
        props.replies.length > 0 &&
        props.replies.map((reply) => <Replies key={reply._id} {...reply} />)}
    </>
  );
}
