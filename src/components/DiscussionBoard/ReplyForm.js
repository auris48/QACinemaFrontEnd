import React from "react";

export default function ReplyForm({ onCancel, handleSubmit }) {
  return (
    <>
      <form className="comment-reply-form" onSubmit={handleSubmit}>
        <input name="replyMessage" placeholder="Reply to this comment" type="text" />

        <div className="comment-reply-form-actions">
          <button className="comment-button">Add Reply</button>
          <button
            type="button"
            className="comment-button"
            onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
