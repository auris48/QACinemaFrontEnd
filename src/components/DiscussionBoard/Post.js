import React, { useEffect, useState, useContext } from "react";
import "./styles/DiscussionBoardStyles.css";
import { dateConverter } from "../../utils/dateConverter";
import { loginContext } from "../../appContext/Context";

export default function Post(props) {
  const { loggedIn } = useContext(loginContext);
  const { user } = useContext(loginContext);
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/User/${props.user}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsername(data.username);
      });
  }, []);

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
          <p>{username}</p>
          <p>{dateConverter(props.dateCreated)}</p>
          {loggedIn && user._id === props.user && (
            <div className="post-actions">
              <button onClick={props.onUpdate} className="comment-button">
                Edit
              </button>
              <button
                className="comment-button"
                onClick={(e) => {
                  props.onDelete(e, props._id);
                }}>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
