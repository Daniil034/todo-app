import React, { useState } from "react";
import { useSubtasksInputs } from "../../customHooks/useSubtasksInputs/useSubtasksInputs";
import { useDispatch } from "react-redux";
import FileUpload from "../FileUpload/FileUpload";
import { addTask } from "../../features/allBoards/allBoardsSlice";
import "./style.css";

const AddTaskModal = ({ boardName, setShowAddTaskModal }) => {
  const dispatch = useDispatch();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskStatus, setTaskStatus] = useState("Queue");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskFiles, setTaskFiles] = useState([]);
  const [subtasksInputs, setSubtasksInput] = useSubtasksInputs({
    subtasks: [],
  });

  const newTask = {
    boardName,
    id: `T-${Date.now()}`,
    columnName: taskStatus,
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
    dispatch(addTask(newTask));
    setShowAddTaskModal(false);
  };

  return (
    <div className="overlay" onClick={() => setShowAddTaskModal(false)}>
      <form method="post" onSubmit={(e) => handleSubmit(e)} className='add-task-modal' onClick={(e) => e.stopPropagation()}>
        <h3>Add New Task</h3>
        <h4>Title</h4>
        <input
          type="text"
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
    </div>
  );
};

export default AddTaskModal;
