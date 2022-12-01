import React, { useState, useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";
import {
  addTask,
  deleteTask,
  editTask,
} from "../../features/allBoards/allBoardsSlice";

const TodoModalContent = ({
  task,
  boardName,
  columnName,
  setIsEditable,
  setIsModalVisible,
  setShowDeleteModal
}) => {

  const dispatch = useDispatch();
  const [taskStatus, setTaskStatus] = useState(task.status);
  const [componentDidMount, setComponentDidMount] = useState(false);

  const completedTasks = task.subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;

  const initialState = task.subtasks.reduce((accumulator, subtask) => {
    return [
      ...accumulator,
      {
        title: subtask.title,
        isCompleted: subtask.isCompleted,
      },
    ];
  }, []);

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

  const newTask = {
    ...task,
    boardName,
    columnName,
    status: taskStatus,
    subtasks: subtasksInputs,
  };

  const handleInputsChange = (e, subtask, index) => {
    const newValue = e.target.checked;
    setSubtasksInput({
      newState: { title: subtask.title, isCompleted: newValue },
      index,
    });
  };

  const handleClickEdit = () => {
    setShowDeleteModal(true);
  }

  useEffect(() => {
    if (componentDidMount) {
      dispatch(editTask(newTask));
    }
  }, [subtasksInputs]);

  useEffect(() => {
    if (componentDidMount) {
      dispatch(deleteTask(newTask));
      dispatch(addTask(newTask));
      setIsModalVisible(false);
    }
    setComponentDidMount(true);
  }, [taskStatus]);

  const options = ["Queue", "Development", "Done"];

  return (
    <>
      <div>
        <h3>{task.title}</h3>
        <div>
          <input
            type="button"
            onClick={() => setIsEditable(true)}
            value={"edit"}
          />
          <input type="button" onClick={handleClickEdit} value='delete' />
        </div>
      </div>
      <p>{task.description}</p>
      <form>
        <h4>
          Subtasks ({completedTasks} of {subtasksInputs.length})
        </h4>
        {subtasksInputs.map((subtask, index) => {
          return (
            <div key={index}>
              <label>
                <input
                  type="checkbox"
                  name={`subtask_${index}`}
                  checked={subtasksInputs[index].isCompleted}
                  onChange={(e) => handleInputsChange(e, subtask, index)}
                ></input>
                {subtask.title}
              </label>
            </div>
          );
        })}
        <h4>Current Status</h4>
        <select
          name="taskStatus"
          onChange={(e) => setTaskStatus(e.currentTarget.value)}
        >
          {options.map((option, index) => (
            <option key={index} value={option} selected={option === taskStatus}>
              {option}
            </option>
          ))}
        </select>
        {/* {task.files.map(file => <img src={task.files}></img>)} */}
      </form>
    </>
  );
};

export default TodoModalContent;
