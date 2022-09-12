import React, { useState } from "react";
import "./styles/DiscussionBoardStyles.css";
import { dateConverter } from "../../utils/dateConverter";

export default function Post(props) {
  return (
    <div className="post-container">
      <div className="post-wrapper">
        <div className="post-header">
          <h2>{props.title}</h2>
        </div>
        <div className="post-content">
          <p>{props.content}</p>
        </div>
        <div className="post-footer">
          <p>By Username....</p>
          <p>{dateConverter(props.dateCreated)}</p>
          <div className="post-actions">
            <button className="comment-button">Edit</button>
            <button
              className="comment-button"
              onClick={(e) => {
                props.onDelete(e, props._id);
              }}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
