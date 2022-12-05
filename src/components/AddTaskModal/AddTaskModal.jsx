import React, { useState, useEffect, useRef } from "react";
import { useSubtasksInputs } from "../../customHooks/useSubtasksInputs/useSubtasksInputs";
import { useDispatch } from "react-redux";
import moment from 'moment';
import FileUpload from "../FileUpload/FileUpload";
import { addTask } from "../../features/allBoards/allBoardsSlice";
import IconCross from "../icons/IconCross";
import "./AddTaskModal.scss";

const AddTaskModal = ({ boardName, setShowAddTaskModal }) => {
  const dispatch = useDispatch();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskStatus, setTaskStatus] = useState("Queue");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskFiles, setTaskFiles] = useState([]);
  const [subtasksInputs, setSubtasksInput] = useSubtasksInputs({
    subtasks: [],
  });
  const textAreaRef = useRef(null);

  const newTask = {
    id: `T-${Date.now()}`,
    createdAt: moment(),
    title: taskTitle.trim(),
    description: taskDescription.trim(),
    status: taskStatus,
    subtasks: subtasksInputs
      .map((subtask) => ({ ...subtask, title: subtask.title.trim() }))
      .filter((subtask) => subtask.title.length !== 0),
    files: taskFiles,
    comments: [],
  };

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
    dispatch(addTask([newTask, { boardName, columnName: taskStatus }]));
    setShowAddTaskModal(false);
  };

  return (
    <div className="overlay" onClick={() => setShowAddTaskModal(false)}>
      <form
        method="post"
        onSubmit={(e) => handleSubmit(e)}
        className="add-task__modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="add-task__header">Add New Task</h3>
        <h4 className="add-task__title">Title</h4>
        <input
          className="add-task__title-input"
          type="text"
          name="taskTitle"
          onChange={(e) => setTaskTitle(e.target.value)}
          required
        />
        <h4 className="add-task__description">Description</h4>
        <textarea
          className="add-task__description-input"
          ref={textAreaRef}
          value={taskDescription}
          name="taskDescription"
          cols="30"
          rows="10"
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little."
        ></textarea>

        <h4 className="add-task__subtasks-title">Subtasks</h4>
        <ul className="add-task__subtasks-list">
          {subtasksInputs.map((subtask, index) => {
            return (
              <div className="add-task__subtask" key={`subtask_${index}`}>
                <input
                className="add-task__subtask-input"
                  type="text"
                  name={`subtask_${index}`}
                  value={subtasksInputs[index].title}
                  required
                  onChange={(e) => handleSubtasksInputs(e, subtask, index)}
                />
                <button
                className="add-task__subtask-delete"
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
        className="add-task__subtasks-add"
          type="button"
          value="+ Add New Subtask"
          onClick={handleAddSubtask}
        />
        <h4 className="add-task__status-title">Status</h4>
        <select
        className="add-task__status-select"
          name="taskStatus"
          value={taskStatus}
          onChange={(e) => setTaskStatus(e.currentTarget.value)}
        >
          <option className="add-task__status-option" value="Queue">Queue</option>
          <option className="add-task__status-option" value="Development">Development</option>
          <option className="add-task__status-option" value="Done">Done</option>
        </select>
        <FileUpload setTaskFiles={setTaskFiles} />
        <input className="add-task__submit" type="submit" value="Create task" />
        {taskFiles.length > 0 && (
          <div className="add-task__images">
            {taskFiles?.map((file,index) => (
              <img key={index} className="add-task__img" src={file} />
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddTaskModal;
