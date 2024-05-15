import { useState } from "react";
import Comment from "./Comment";
const initialData = [
  {
    id: "1",
    name: "Rolex",
    img: "https://i.pravatar.cc/1080?u=118876",
    cmts: [],
  },
  {
    id: "2",
    name: "Dead Pool",
    img: "https://i.pravatar.cc/1080?u=110033",
    cmts: [],
  },
  {
    id: "3",
    name: "Dhoni",
    img: "https://i.pravatar.cc/1080?u=118855",
    cmts: [],
  },
];
function App() {
  const [data, setData] = useState(initialData);
  const [select, setSelect] = useState("");

  const [comment, setComment] = useState("");

  const [newCmts, setNewCmts] = useState([]);

  const findData =
    select !== "" &&
    data.find((cur) => select && select === cur.id && cur.name);

  let newCmtData = {
    id: newCmts.length + 1,
    name: findData.name,
    img: findData.img,
    text: comment,
  };

  const deleteCmts = (id) => {
    console.log("hi");
    setNewCmts((cur) => cur.filter((item) => item.id !== id));
  };

  const deleteItem = (id, curId) => {
    const dltCmt = data.map((cur) =>
      curId === cur.id
        ? { ...cur, cmts: cur.cmts.filter((curr) => curr !== id) }
        : cur
    );

    setData(dltCmt);
  };

  const commentSubmit = (e, onSelect) => {
    e.preventDefault();

    if (!comment || select === "") return;

    const newComment = comment;

    const newData = data.map((cur) =>
      cur.id === select ? { ...cur, cmts: [newComment, ...cur.cmts] } : cur
    );

    setNewCmts([newCmtData, ...newCmts]);
    setData(newData);
    setComment("");
  };

  return (
    <div className="app">
      <Booking data={data} onSelect={select} onSetSelect={setSelect} />
      <Comment
        data={data}
        onSelect={select}
        onComment={comment}
        onSetComment={setComment}
        onSubmits={commentSubmit}
        onDeleteItem={deleteItem}
        newCmts={newCmts}
        handleDelete={deleteCmts}
      />
    </div>
  );
}

export default App;

function Booking({ onSelect, onSetSelect, data }) {
  const [event, setEvent] = useState("");
  const [date, setDate] = useState("");

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  // const handleEventChange = (e) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     // Handle the enter key press here, such as updating the state
  //     setEvent("");
  //   } else {
  //     setEvent(e.target.value);
  //   }
  // };
  const onSelectChange = (e) => {
    e.preventDefault();
    onSetSelect(e.target.value);
  };

  const manager = data.find((cur) => cur.id === onSelect && cur.name);

  const handleEvent = (e) => {
    e.preventDefault();
    if (!event || !date || !onSelect) return;

    alert(`Your ${event} is Booked and assigned to ${manager.name} on ${date}`);
    setDate("");
    setEvent("");
  };

  return (
    <>
      <form className="form_container">
        <div className="btns">
          <button onClick={handleEvent}>
            <i className="fa-regular fa-circle-check"></i>
          </button>
          <div className="delete_btn_box">
            <div className="btn">
              <i className="fa-solid fa-trash-can"></i>
            </div>
            <div className="btn">
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
        </div>
        <div className="input_boxes">
          <input
            type="text"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            className="input"
            // onKeyDown={handleEventChange}
            placeholder="type event..."
          ></input>

          <input
            type="date"
            className="input"
            value={date}
            onChange={handleDateChange}
          ></input>
        </div>

        <div className="dropDown_boxes">
          <div className="dropDown">
            <div className="assign">
              <span>
                <i className="fa-regular fa-user"></i>
              </span>
              <p className="italic">Assign to:</p>
            </div>

            <div className="select">
              {data.map(
                (cur) =>
                  cur.id === onSelect && (
                    <img
                      className="img"
                      src={cur.img}
                      alt="user img"
                      key={cur.id}
                    />
                  )
              )}

              <select value={onSelect} onChange={(e) => onSelectChange(e)}>
                <option value="">Assign One</option>
                {data.map((cur) => (
                  <option value={cur.id} key={cur.id}>
                    {cur.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="notes">
            <div className="notes_text">
              <span>
                <i className="fa-regular fa-note-sticky"></i>
              </span>
              <p className="italic">Note:</p>
            </div>
            <input type="text" placeholder={`www.flowervendor.com`}></input>
          </div>
        </div>
      </form>
    </>
  );
}
