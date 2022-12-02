import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteBoard } from "../../features/allBoards/allBoardsSlice";
import './style.css';

const DeleteBoardModal = ({ boardName, setShowDeleteBoardModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteBoard({boardName}));
    navigate("/");
  };

  return (
    <div className="overlay" onClick={() => setShowDeleteBoardModal(false)}>
      <div className="delete-board-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Delete this board?</h3>
        <p>
          Are you sure you want to delete the ‘Platform Launch’ board? This
          action will remove all columns and tasks and cannot be reversed.
        </p>
        <div>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
          <button type="button" onClick={() => setShowDeleteBoardModal(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBoardModal;
