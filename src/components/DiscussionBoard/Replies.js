import React, { useState, useEffect } from "react";
import { dateConverter } from "../../utils/dateConverter";
import "./styles/DiscussionBoardStyles.css";

export default function Replies(props) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/User/${props.user}`)
      .then((response) => response.json())
      .then((data) => {
        setUsername(data.username);
      });
  }, []);

  return (
    <div className="comment-replies-container">
      <div className="reply-container">
        <div className="reply-header">
          <span>{username}</span>
          <span>{dateConverter(props.dateCreated)}</span>
        </div>
        <div className="reply-content">{props.content}</div>
        {/*    <div className="reply-footer">
                <button className="comment-button">Edit</button>
                <button className="comment-button">Delete</button>
                <button className="comment-button">Reply</button>
              </div> */}
        <hr />
      </div>
    </div>
  );
}
