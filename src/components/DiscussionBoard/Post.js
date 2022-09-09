import React, { useState } from "react";
import "./styles/DiscussionBoardStyles.css";

export default function Post(props) {
  return (
    <div className="post-wrapper" >
      <div className="post-header">
        <h2>{props.title}</h2>
      </div>
      <div className="post-content">
        <h3>{props.content}</h3>
        <h4>{props.dateCreated}</h4>
      </div>
      <div className="post-actions">
        <button className="post-edit">Edit</button>
        <button
          className="post-delete"
          onClick={() => props.onDelete(props._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
