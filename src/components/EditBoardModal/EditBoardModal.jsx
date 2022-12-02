import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editBoard } from "../../features/allBoards/allBoardsSlice";
import { useNavigate } from "react-router-dom";

const EditBoardModal = ({boardName, setShowEditBoardModal}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newBoardName, setNewBoardName] = useState(boardName);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editBoard({boardName: newBoardName, oldBoardName: boardName}));
    setShowEditBoardModal(false)
    navigate(`/${newBoardName}`);
  }

  return (
    <div className="overlay" onClick={() => setShowEditBoardModal(false)}>
      <form
        className="add-board-modal"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => handleSubmit(e)}
      >
        <h3>Edit Board</h3>
        <h4>Board Name</h4>
        <input
          type="text"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
          name='newBoardName'
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default EditBoardModal;
