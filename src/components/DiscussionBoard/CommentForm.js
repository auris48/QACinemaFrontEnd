export default function CommentForm({ handleSubmit }) {
  return (
    <>
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea type="text" placeholder="Comment" name="comment" />
        <div className="comment-form-actions">
          <button className="post-thread-submit-comment-button">Submit</button>
          <button type="reset" className="post-thread-submit-comment-button">Cancel</button>
        </div>
      </form>
    </>
  );
}
