import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import EditBoardModal from "../EditBoardModal/EditBoardModal";
import DeleteBoardModal from "../DeleteBoardModal/DeleteBoardModal";
import SearchForm from "../SearchForm/SearchForm";

const Header = ({ boardName }) => {
  const navigate = useNavigate();
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showEditBoardModal, setShowEditBoardModal] = useState(false);
  const [showDeleteBoardModal, setShowDeleteBoardModal] = useState(false);

  return (
    <div>
      <p>{boardName}</p>
      <input
        type="button"
        value="add task"
        onClick={() => setShowAddTaskModal(true)}
      />
      {showAddTaskModal && (
        <AddTaskModal
          boardName={boardName}
          setShowAddTaskModal={setShowAddTaskModal}
        />
      )}
      <input
        type="button"
        value="edit board"
        onClick={() => setShowEditBoardModal(true)}
      />
      <input
        type="button"
        value="delete board"
        onClick={() => setShowDeleteBoardModal(true)}
      />
      <input
        type="button"
        value="back to main page"
        onClick={() => navigate("/")}
      />
      <SearchForm boardName={boardName} />
      {showEditBoardModal && (
        <EditBoardModal
          boardName={boardName}
          setShowEditBoardModal={setShowEditBoardModal}
        />
      )}
      {showDeleteBoardModal && <DeleteBoardModal boardName={boardName} setShowDeleteBoardModal={setShowDeleteBoardModal} />}
    </div>
  );
};

export default Header;
