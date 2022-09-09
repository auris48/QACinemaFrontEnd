import React, { useState } from "react";
import "./styles/DiscussionBoardStyles.css";
import { dateConverter } from "../../utils/dateConverter";

export default function Post(props) {
  return (
    <div className="post-container">
      <img
        alt="user"
        src="https://upload.wikimedia.org/wikipedia/en/5/59/The_Gray_Man_poster.png"
      />
      <div className="post-wrapper">
        <div className="post-header">
          <h2>{props.title}</h2>
        </div>
        <div className="post-content">
          <p>{props.content}</p>
        </div>
        <div className="post-footer">
          <h4>By Username....</h4>
          <h4>{dateConverter(props.dateCreated)}</h4>
          <div className="post-actions">
            <button className="post-edit">Edit</button>
            <button
              className="post-delete"
              onClick={() => props.onDelete(props._id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
