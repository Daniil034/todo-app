import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBoard } from "../../features/allBoards/allBoardsSlice";
import { columnsEnums } from "../../helperFunc";
import "./AddBoardModal.scss";

const AddBoardModal = ({ setShowAddBoardModal }) => {
  const dispatch = useDispatch();
  const [boardName, setBoardName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addBoard({
        name: boardName.trim(),
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
      <form
        className="add-board-modal"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h3 className="add-board-modal__title">Add New Board</h3>
        <h4 className="add-board-modal__subtitle">Board Name</h4>
        <input
          className="add-board-modal__input"
          type="text"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          placeholder="e.g. Web Design"
          required
        />
        <input
          className="add-board-modal__submit"
          type="submit"
          value="Create New Board"
        />
      </form>
    </div>
  );
};

export default AddBoardModal;
