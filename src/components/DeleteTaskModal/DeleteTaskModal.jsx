import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../features/allBoards/allBoardsSlice";

const DeleteTaskModal = ({
  task,
  boardName,
  columnName,
  setShowDeleteModal,
  setIsModalVisible,
}) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(
      deleteTask({
        ...task,
        boardName,
        columnName,
      })
    );
    setShowDeleteModal(false);
    setIsModalVisible(false);
  };

  return (
    <div>
      <h3>Delete this task?</h3>
      <p>
        Are you sure you want to delete the ‘Build settings UI’ task and its
        subtasks? This action cannot be reversed.
      </p>
      <div>
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
        <button type="button" onClick={() => setShowDeleteModal(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
