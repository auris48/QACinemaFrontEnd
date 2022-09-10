export default function CommentForm({ handleSubmit }) {
  return (
    <>
      <form onSubmit={handleSubmit} className="comment-form">
        <input type="text" placeholder="Comment" name="comment" />
        <button>Submit</button>
      </form>
    </>
  );
}
