import RenderComment from "./RenderComment";

function Comment({
  onSelect,
  onComment,
  onSetComment,
  onSubmits,
  data,
  onDeleteItem,
  newCmts,
  handleDelete,
}) {
  return (
    <>
      <h4>Comments</h4>
      <div className="cmt_container">
        {newCmts.map((cur, i) => (
          <RenderComment
            cur={cur}
            key={i}
            onDeleteItem={onDeleteItem}
            handleDelete={handleDelete}
          />
        ))}
      </div>

      <div className="comment_input_box">
        {data.map(
          (cur) =>
            cur.id === onSelect && (
              <img className="img" src={cur.img} alt="user_img" key={cur.id} />
            )
        )}

        <form className="input" onSubmit={(e) => onSubmits(e, onSelect)}>
          <input
            type="text"
            value={onComment}
            placeholder="write comment..."
            onChange={(e) => onSetComment(e.target.value)}
          ></input>
          <button>
            <i className="fa-regular fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </>
  );
}
export default Comment;
