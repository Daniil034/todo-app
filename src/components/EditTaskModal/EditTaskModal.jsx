import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import moment from 'moment';
import { useSubtasksInputs } from "../../customHooks/useSubtasksInputs/useSubtasksInputs";
import {
  editTask,
  deleteTask,
  addTask,
} from "../../features/allBoards/allBoardsSlice";
import FileUpload from "../FileUpload/FileUpload";
import IconCross from "../icons/IconCross";
import "./EditTaskModal.scss";

const EditTaskModal = ({ task, boardName, columnName, setIsEditable }) => {
  const { title, description, status, subtasks, files } = task;
  const dispatch = useDispatch();
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description);
  const [taskStatus, setTaskStatus] = useState(status);
  const [taskFiles, setTaskFiles] = useState(files);
  const [subtasksInputs, setSubtasksInput] = useSubtasksInputs({ subtasks });
  const textAreaRef = useRef(null);
  const options = ["Queue", "Development", "Done"];

  // handlers

  const newTask = {
    ...task,
    title: taskTitle.trim(),
    description: taskDescription.trim(),
    status: taskStatus,
    subtasks: subtasksInputs
      .map((subtask) => ({ ...subtask, title: subtask.title.trim() }))
      .filter((subtask) => subtask.title.length !== 0),
    files: taskFiles,
  };

  if (taskStatus === options[2]) {
    newTask.closed = moment();
  } else if (typeof newTask.closed !== "undefined") {
    delete newTask.closed;
  }

  useEffect(() => {
    textAreaRef.current.style.height = "112px";
    const ScrollHeight = textAreaRef.current.scrollHeight;
    textAreaRef.current.style.height = ScrollHeight + "px";
  }, [taskDescription]);

  const handleSubtasksInputs = (e, subtask, index) => {
    const newValue = e.target.value;
    setSubtasksInput({
      newState: { title: newValue, isCompleted: subtask.isCompleted },
      index,
    });
  };

  const handleAddSubtask = () => {
    setSubtasksInput({ newState: { title: "", isCompleted: false } });
  };

  const handleRemoveSubtask = (index) => {
    setSubtasksInput({
      newState: (prev) => prev.filter((subtask, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskStatus === columnName) {
      dispatch(editTask([newTask, {boardName, columnName}]));
    } else {
      dispatch(addTask([newTask, {boardName, columnName: taskStatus}]));
      dispatch(deleteTask([newTask, {boardName, columnName}]));
    }
    setIsEditable(false);
  };

  // JSX

  return (
    <>
      <form className="edit-task" onSubmit={(e) => handleSubmit(e)}>
        <h3 className="edit-task__header">Edit Task</h3>
        <h4 className="edit-task__title">Title</h4>
        <input
          className="edit-task__title-input"
          type="text"
          value={taskTitle}
          name="taskTitle"
          onChange={(e) => setTaskTitle(e.target.value)}
          required
          placeholder="e.g. Take coffee break"
        />
        <h4 className="edit-task__description">Description</h4>
        <textarea
          className="edit-task__description-input"
          ref={textAreaRef}
          name="taskDescription"
          cols="30"
          rows="10"
          onChange={(e) => setTaskDescription(e.target.value)}
          value={taskDescription}
          placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little."
        ></textarea>

        <h4 className="edit-task__subtasks-title">Subtasks</h4>
        <ul className="edit-task__subtasks-list">
          {subtasksInputs?.map((subtask, index) => {
            return (
              <div className="edit-task__subtask" key={`subtask_${index}`}>
                <input
                  className="edit-task__subtask-input"
                  type="text"
                  name={`subtask_${index}`}
                  value={subtasksInputs[index].title}
                  onChange={(e) => handleSubtasksInputs(e, subtask, index)}
                  required
                  placeholder="e.g. Drink coffee & smile"
                />
                <button
                  className="edit-task__subtask-delete"
                  type="button"
                  onClick={() => handleRemoveSubtask(index)}
                >
                  <IconCross />
                </button>
              </div>
            );
          })}
        </ul>
        <input
          className="edit-task__subtasks-add"
          type="button"
          value="+ Add New Subtask"
          onClick={handleAddSubtask}
        />
        <h4 className="edit-task__status-title">Status</h4>
        <select
          className="edit-task__status-select"
          name="taskStatus"
          value={taskStatus}
          onChange={(e) => setTaskStatus(e.currentTarget.value)}
        >
          {options.map((option, index) => (
            <option className="edit-task__status-option" key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <FileUpload setTaskFiles={setTaskFiles} />
        <input
          className="edit-task__submit"
          type="submit"
          value="Save Changes"
        />
        {taskFiles.length > 0 && (
          <div className="edit-task__images">
            {taskFiles?.map((file, index) => (
              <img key={index} className="edit-task__img" src={file} />
            ))}
          </div>
        )}
      </form>
    </>
  );
};

export default EditTaskModal;
