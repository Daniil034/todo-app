import React, { useState, useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";
import { useSubtasksInputs } from "../../customHooks/useSubtasksInputs/useSubtasksInputs";
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
  setShowDeleteModal
}) => {
  const {status, files, subtasks} = task;
  const dispatch = useDispatch();
  const [taskStatus, setTaskStatus] = useState(status);
  const [componentDidMount, setComponentDidMount] = useState(false);

  const completedTasks = subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;

  console.log(`${task.title}`)

  const [subtasksInputs, setSubtasksInput] = useSubtasksInputs({subtasks});

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
      // setIsModalVisible(false);
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
        {files.map(file => <img width='150px' src={file} />)}
      </form>
    </>
  );
};

export default TodoModalContent;
