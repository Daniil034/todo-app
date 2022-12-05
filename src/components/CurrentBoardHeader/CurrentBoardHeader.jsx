import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import EditBoardModal from "../EditBoardModal/EditBoardModal";
import DeleteBoardModal from "../DeleteBoardModal/DeleteBoardModal";
import SearchForm from "../SearchForm/SearchForm";
import IconDots from "../icons/IconDots";
import IconPlus from "../icons/IconPlus";
import IconBack from "../icons/IconBack";
import "./CurrentBoardHeader.scss";

const CurrentBoardHeader = ({ boardName }) => {
  const navigate = useNavigate();
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showEditBoardModal, setShowEditBoardModal] = useState(false);
  const [showDeleteBoardModal, setShowDeleteBoardModal] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [showHiddenButtons, setShowHiddenButtons] = useState(false);

  const handleEdit = () => {
    setShowEditBoardModal(true);
    setShowHiddenButtons(false);
  };

  const handleDelete = () => {
    setShowDeleteBoardModal(true);
    setShowHiddenButtons(false);
  };

  const handleSearch = () => {
    setShowSearchForm(true);
    setShowHiddenButtons(false);
  };

  return (
    <div className="current-board-header">
      <div className="current-board-header__top">
        <div className="current-board-header__top-left">
          <button
            className="current-board-header__return"
            type="button"
            onClick={() => navigate("/todo-app")}
          >
            <IconBack />
          </button>
          <p className="current-board-header__title">{boardName}</p>
        </div>
        <div className="current-board-header__buttons">
          <button
            className="current-board-header__add-task"
            type="button"
            value="add task"
            onClick={() => setShowAddTaskModal(true)}
          >
            <IconPlus />
            <span className="current-board-header__add-task-span">
              Add New Task
            </span>
          </button>
          <div
            className="current-board-header__dots"
            onClick={() => setShowHiddenButtons(true)}
          >
            <IconDots setShowHiddenButtons={setShowHiddenButtons} />
          </div>
        </div>
        {showAddTaskModal && (
          <AddTaskModal
            boardName={boardName}
            setShowAddTaskModal={setShowAddTaskModal}
          />
        )}

        {showEditBoardModal && (
          <EditBoardModal
            boardName={boardName}
            setShowEditBoardModal={setShowEditBoardModal}
          />
        )}
        {showDeleteBoardModal && (
          <DeleteBoardModal
            boardName={boardName}
            setShowDeleteBoardModal={setShowDeleteBoardModal}
          />
        )}

        {showHiddenButtons && (
          <div
            className="current-board-header__overlay"
            onClick={() => setShowHiddenButtons(false)}
          >
            <div
              className="current-board-header__hidden-buttons"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                className="current-board-header__search"
                type="button"
                value="Search Task"
                onClick={handleSearch}
              />
              <input
                className="current-board-header__edit-board"
                type="button"
                value="Edit Board"
                onClick={handleEdit}
              />
              <input
                className="current-board-header__delete-board"
                type="button"
                value="Delete Board"
                onClick={handleDelete}
              />
            </div>
          </div>
        )}
      </div>
      {showSearchForm && (
        <SearchForm
          boardName={boardName}
          setShowSearchForm={setShowSearchForm}
        />
      )}
    </div>
  );
};

export default CurrentBoardHeader;
