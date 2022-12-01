import React, { useState, useReducer } from "react";
import { useDispatch } from "react-redux";
import {
  editTask,
  deleteTask,
  addTask,
} from "../../features/allBoards/allBoardsSlice";
import FileUpload from "../FileUpload/FileUpload";

const TodoModalEdit = ({
  task,
  boardName,
  columnName,
  setIsEditable,
  setIsModalVisible,
}) => {
  const { title, description, status, subtasks } = task;
  const dispatch = useDispatch();
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description);
  const [taskStatus, setTaskStatus] = useState(status);

  const dataChangerThumbnail = (value) => {
    setFormData({ ...formData, thumbImage: value });
  };

  const formInitial = {
    thumbImage: "",
  };
  const [formData, setFormData] = useState(formInitial);

  // const [subtasks, setSubtasks] = useState(task.subtasks);

  // controllable inputs

  const initialState = subtasks.reduce((accumulator, subtask) => {
    return [
      ...accumulator,
      {
        title: subtask.title,
        isCompleted: subtask.isCompleted,
      },
    ];
  }, []);

  // const reducer = (state, action) => {
  //   switch (action.type) {
  //     case 'add': {
  //       return {...state, ...action.payload}
  //     };
  //     case 'remove': {
  //       return {state.filter(el => Object.keys(el)[0] !== )}
  //     }
  //   }
  // }

  const [subtasksInputs, setSubtasksInput] = useReducer(
    (state, { newState, index }) => {
      if (typeof newState === "function") {
        return newState(state);
      }
      if (typeof index == "undefined") {
        return [...state, newState];
      }
      return [...state.slice(0, index), newState, ...state.slice(index + 1)];
    },
    initialState
  );

  // handlers

  const newTask = {
    ...task,
    boardName,
    columnName,
    title: taskTitle,
    description: taskDescription,
    status: taskStatus,
    subtasks: subtasksInputs,
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
      setIsModalVisible(false);
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
        <FileUpload
          name="thumbImage"
          button_title="Thumbnail Image Upload"
          max_file_size_in_kb="5000"
          dataChanger={(value) => dataChangerThumbnail(value)}
          type="image"
          prev_src={"localhost:8001/" + formData?.thumbImage}
          allowed_extensions={["jpg", "jpeg", "png", "gif"]}
        />
      </form>
    </>
  );
};

export default TodoModalEdit;
