import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTask } from "../../features/allBoards/allBoardsSlice";
import "./DeleteTaskModal.scss";

const DeleteTaskModal = ({
  task,
  boardName,
  columnName,
  setShowDeleteModal,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(
      deleteTask([task, { boardName, columnName }])
    );
    setShowDeleteModal(false);
    navigate(-1);
  };

  return (
    <div className="delete-task">
      <h3 className="delete-task__title">Delete this task?</h3>
      <p className="delete-task__info">
        Are you sure you want to delete the '{task.title}' task and its
        subtasks? This action cannot be reversed.
      </p>
      <div className="delete-task__buttons">
        <button
          className="delete-task__button-delete"
          type="button"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className="delete-task__button-cancel"
          type="button"
          onClick={() => setShowDeleteModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
