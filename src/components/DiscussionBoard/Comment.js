import React, { useState } from "react";
import { dateConverter } from "../../utils/dateConverter";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import ReplyForm from "./ReplyForm";
export default function Comment(props) {
  const [isShowReplies, setIsShowReplies] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [commentRef] = useAutoAnimate();

  const renderChildren = () => {
    if (props.replies.length > 0) {
      return (
        <div className="comment-replies-container">
          {props.replies.map((reply) => (
            <div className="reply-container">
              <div className="reply-header">
                <span>User</span>
                <span>{dateConverter(reply.dateCreated)}</span>
              </div>
              <div className="reply-content">{reply.content}</div>
           {/*    <div className="reply-footer">
                <button className="comment-button">Edit</button>
                <button className="comment-button">Delete</button>
                <button className="comment-button">Reply</button>
              </div> */}
              <hr/>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <>
      <div className="comment-container" ref={commentRef}>
        <div className="comment-header-info">
          <span className="comment-author">User</span>
          <span className="comment-date">
            {dateConverter(props.dateCreated)}
          </span>
        </div>
        <p className="comment-content">{props.content}</p>
        <div className="comment-footer">
          <button id="comment-edit-button" className="comment-button">
            Edit
          </button>
          <button id="comment-delete-button" className="comment-button">
            Delete
          </button>
          <button
            id="comment-add-reply-button"
            onClick={() => setIsReplying(true)}
            className="comment-button">
            Reply
          </button>
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
            handleSubmit={(e) => {
              props.handleReplySubmit(e, props._id);
            }}
            onCancel={() => setIsReplying(false)}
          />
        )}
      </div>
      {isShowReplies && renderChildren()}
    </>
  );
}
