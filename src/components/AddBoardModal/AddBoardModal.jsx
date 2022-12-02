import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBoard } from "../../features/allBoards/allBoardsSlice";
import { columnsEnums } from "../../helperFunc";
import "./style.css";

const AddBoardModal = ({ setShowAddBoardModal }) => {
  const dispatch = useDispatch();
  const [boardName, setBoardName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addBoard({
        name: boardName,
        columns: [
          {
            name: columnsEnums[1],
            tasks: [],
          },
          {
            name: columnsEnums[2],
            tasks: [],
          },
          {
            name: columnsEnums[3],
            tasks: [],
          },
        ],
      })
    );
    setShowAddBoardModal(false);
  };

  return (
    <div className="overlay" onClick={() => setShowAddBoardModal(false)}>
      <form className="add-board-modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h3>Add New Board</h3>
        <h4>Board Name</h4>
        <input type="text" value={boardName} onChange={(e) => setBoardName(e.target.value)} />
        <input type="submit" />
      </form>
    </div>
  );
};

export default AddBoardModal;
