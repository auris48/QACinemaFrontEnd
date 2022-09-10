import React from "react";
import { dateConverter } from "../../utils/dateConverter";

export default function Comment(props) {
  return (
    <>
      <div className="comment-container">
        <div className="comment-header-info">
          <span className="comment-author">User</span>
          <span className="comment-date">
            {dateConverter(props.dateCreated)}
          </span>
        </div>
        <p className="comment-content">{props.content}</p>
        <div>
          <button className="comment-edit">Edit</button>
          <button className="comment-delete">Delete</button>
          <button className="comment-reply">Reply</button>
        </div>
      </div>
    </>
  );
}
