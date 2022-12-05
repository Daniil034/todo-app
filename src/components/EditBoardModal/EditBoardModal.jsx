import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editBoard } from "../../features/allBoards/allBoardsSlice";
import { useNavigate } from "react-router-dom";
import './EditBoardModal.scss';

const EditBoardModal = ({ boardName, setShowEditBoardModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newBoardName, setNewBoardName] = useState(boardName);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editBoard({ boardName: newBoardName.trim(), oldBoardName: boardName })
    );
    setShowEditBoardModal(false);
    navigate(`/${newBoardName}`);
  };

  return (
    <div className="overlay" onClick={() => setShowEditBoardModal(false)}>
      <form
        className="edit-board-modal"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => handleSubmit(e)}
      >
        <h3 className="edit-board-modal__title">Edit Board</h3>
        <h4 className="edit-board-modal__subtitle">Board Name</h4>
        <input
          className="edit-board-modal__input"
          type="text"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
          name="newBoardName"
        />
        <input className="edit-board-modal__submit" type="submit" value='Save Changes' />
      </form>
    </div>
  );
};

export default EditBoardModal;
