import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteBoard } from "../../features/allBoards/allBoardsSlice";
import './DeleteBoardModal.scss';

const DeleteBoardModal = ({ boardName, setShowDeleteBoardModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteBoard({ boardName }));
    navigate("/");
  };

  return (
    <div className="overlay" onClick={() => setShowDeleteBoardModal(false)}>
      <div className="delete-board__modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="delete-board__title">Delete this board?</h3>
        <p className="delete-board__info">
          Are you sure you want to delete the ‘Platform Launch’ board? This
          action will remove all columns and tasks and cannot be reversed.
        </p>
        <div className="delete-board__buttons">
          <button
            className="delete-board__button-delete"
            type="button"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="delete-board__button-cancel"
            type="button"
            onClick={() => setShowDeleteBoardModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBoardModal;
