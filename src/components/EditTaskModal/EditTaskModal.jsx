import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form } from "react-router-dom";
import { useSubtasksInputs } from "../../customHooks/useSubtasksInputs/useSubtasksInputs";
import {
  editTask,
  deleteTask,
  addTask,
} from "../../features/allBoards/allBoardsSlice";
import FileUpload from "../FileUpload/FileUpload";

const EditTaskModal = ({
  task,
  boardName,
  columnName,
  setIsEditable,
}) => {
  const { title, description, status, subtasks, files } = task;
  const dispatch = useDispatch();
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description);
  const [taskStatus, setTaskStatus] = useState(status);
  const [taskFiles, setTaskFiles] = useState(files);
  const [subtasksInputs, setSubtasksInput] = useSubtasksInputs({ subtasks });

  // handlers

  const newTask = {
    ...task,
    boardName,
    columnName,
    title: taskTitle,
    description: taskDescription,
    status: taskStatus,
    subtasks: subtasksInputs,
    files: taskFiles,
  };

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
      dispatch(editTask(newTask));
    } else {
      dispatch(addTask(newTask));
      dispatch(deleteTask(newTask));
    }
    setIsEditable(false);
  };

  // JSX

  return (
    <>
      <form method="post" onSubmit={(e) => handleSubmit(e)}>
        <h3>Edit Task</h3>
        <h4>Title</h4>
        <input
          type="text"
          value={taskTitle}
          name="taskTitle"
          onChange={(e) => setTaskTitle(e.target.value)}
          required
        />
        <h4>Description</h4>
        <textarea
          name="taskDescription"
          cols="30"
          rows="10"
          onChange={(e) => setTaskDescription(e.target.value)}
          value={taskDescription}
        ></textarea>

        <h4>Subtasks</h4>
        {subtasksInputs.map((subtask, index) => {
          return (
            <div key={`subtask_${index}`}>
              <input
                type="text"
                name={`subtask_${index}`}
                value={subtasksInputs[index].title}
                onChange={(e) => handleSubtasksInputs(e, subtask, index)}
              />
              <input type="button" onClick={() => handleRemoveSubtask(index)} />
            </div>
          );
        })}
        <input
          type="button"
          value="+ Add New Subtask"
          onClick={handleAddSubtask}
        />
        <h4>Status</h4>
        <select
          name="taskStatus"
          value={taskStatus}
          onChange={(e) => setTaskStatus(e.currentTarget.value)}
        >
          <option value="Queue">Queue</option>
          <option value="Development">Development</option>
          <option value="Done">Done</option>
        </select>
        <input type="submit" value="Save Changes" />
        <FileUpload setTaskFiles={setTaskFiles} />
        {taskFiles.map((file) => (
          <img src={file} />
        ))}
      </form>
    </>
  );
};

export default EditTaskModal;
