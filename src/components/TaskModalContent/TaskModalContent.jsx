import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { useSubtasksInputs } from "../../customHooks/useSubtasksInputs/useSubtasksInputs";
import {
  addTask,
  deleteTask,
  editTask,
} from "../../features/allBoards/allBoardsSlice";
import AddCommentSection from "../AddCommentSection/AddCommentSection";
import Comment from "../Comment/Comment";
import "./TaskModalContent.scss";

const TaskModalContent = ({
  task,
  boardName,
  columnName,
  setIsEditable,
  setShowDeleteModal,
}) => {
  const { status, files, subtasks } = task;
  const dispatch = useDispatch();
  const [taskStatus, setTaskStatus] = useState(status);
  const [componentDidMount, setComponentDidMount] = useState(false);
  const options = ["Queue", "Development", "Done"];

  const completedTasks = subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;

  const [subtasksInputs, setSubtasksInput] = useSubtasksInputs({ subtasks });

  const newTask = {
    ...task,
    status: taskStatus,
    subtasks: subtasksInputs,
  };

  if (taskStatus === options[2]) {
    newTask.closed = moment();
  } else if (typeof newTask.closed !== "undefined") {
    delete newTask.closed;
  }

  const handleInputsChange = (e, subtask, index) => {
    const newValue = e.target.checked;
    setSubtasksInput({
      newState: { title: subtask.title, isCompleted: newValue },
      index,
    });
  };

  const handleClickEdit = () => {
    setShowDeleteModal(true);
  };

  useEffect(() => {
    if (componentDidMount) {
      dispatch(editTask([newTask, { boardName, columnName }]));
    }
  }, [subtasksInputs]);

  useEffect(() => {
    if (componentDidMount) {
      dispatch(deleteTask([newTask, { boardName, columnName }]));
      dispatch(addTask([newTask, { boardName, columnName: taskStatus }]));
    }
    setComponentDidMount(true);
  }, [taskStatus]);

  return (
    <>
      <div className="task-modal__header">
        <h3 className="task-modal__title">{task.title}</h3>
        <div className="task-modal__buttons">
          <input
            type="button"
            onClick={() => setIsEditable(true)}
            value="Edit Task"
            className="task-modal__edit-button"
          />
          <input
            type="button"
            onClick={handleClickEdit}
            className="task-modal__delete-button"
            value="Delete Task"
          />
        </div>
      </div>
      <p className="task-modal__id">
        Number: <span className="task-modal__id-span">{task.id}</span>
      </p>
      <p className="task-modal__created">
        Created at:{" "}
        <span className="task-modal__created-span">
          {moment(task.createdAt).format("lll")}
        </span>
      </p>
      {task.closed ? (
        <p className="task-modal__closed">
          Closed:{" "}
          <span className="task-modal__closed-span">
            {moment(task.closed).format("lll")}
          </span>
        </p>
      ) : (
        <p className="task-modal__atwork">
          At work:{" "}
          <span className="task-modal__atwork-span">
            {moment(task.createdAt).fromNow(true)}
          </span>
        </p>
      )}
      {task.description && (
        <p className="task-modal__description">{task.description}</p>
      )}
      <form>
        {task.subtasks.length > 0 && (
          <>
            <h4 className="task-modal__subtitle">
              Subtasks ({completedTasks} of {subtasksInputs.length})
            </h4>
            <ul className="task-modal__subtasks">
              {subtasksInputs?.map((subtask, index) => {
                return (
                  <label className="task-modal__subtask" key={index}>
                    <input
                      className="task-modal__subtask-checkbox"
                      type="checkbox"
                      name={`subtask_${index}`}
                      checked={subtasksInputs[index].isCompleted}
                      onChange={(e) => handleInputsChange(e, subtask, index)}
                    ></input>
                    {subtask.title}
                  </label>
                );
              })}
            </ul>
          </>
        )}
        <h4 className="task-modal__status">Current Status</h4>
        <select
          name="taskStatus"
          onChange={(e) => setTaskStatus(e.currentTarget.value)}
          className="task-modal__select"
          value={taskStatus}
        >
          {options.map((option, index) => (
            <option className="task-modal__option" key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        {files.length > 0 && (
          <div className="task-modal__images">
            {files?.map((file) => (
              <img className="task-modal__img" width="150px" src={file} />
            ))}
          </div>
        )}
        {task.comments.length > 0 && (
          <div className="task-modal__comments">
            <h3 className="task-modal__comments-title">Comments:</h3>
            <ul className="task-modal__comments-list">
              {task.comments?.map((comment, index) => (
                <p className="task-modal__comments-item" key={index}>
                  {comment.content}
                </p>
              ))}
            </ul>
            <AddCommentSection task={task} boardName={boardName} columnName={columnName} />
          </div>
        )}
      </form>
    </>
  );
};

export default TaskModalContent;
