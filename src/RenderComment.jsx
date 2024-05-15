import { useState } from "react";

function RenderComment({ cur, onDeleteItem, handleDelete }) {
  const [editedComment, setEditedComment] = useState("");

  const [editCmtIndex, setEditCmtIndex] = useState(null);

  function handleEdit(i, cur) {
    setEditCmtIndex(i);
    setEditedComment(cur);
  }

  function handleSave(index) {
    if (editedComment.trim() !== "") {
      const newData = editedComment;
      console.log(index, newData);
      cur.text = newData;
    }
    setEditCmtIndex(null);
    setEditedComment("");
  }

  return (
    <>
      <div className="comment_container" key={cur.id}>
        <img className="img" src={cur.img} alt={cur.name} />
        <div className="comment_box">
          <h5>{cur.name}</h5>

          {editCmtIndex === cur.id ? (
            <input
              type="text"
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
              autoFocus
            ></input>
          ) : (
            <p className=" comments">{cur.text}</p>
          )}
        </div>
        <div className="buttons">
          {editCmtIndex === cur.id ? (
            <button onClick={() => handleSave(cur.id)}>
              <i className="fa-solid fa-check"></i>
            </button>
          ) : (
            <button onClick={() => handleEdit(cur.id, cur.text)}>
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
          )}

          <button onClick={() => handleDelete(cur.id)}>
            <i className="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default RenderComment;
