import React, { useState, useReducer } from "react";

const TodoModalEdit = ({ task }) => {
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [subtasks, setSubtasks] = useState(task.subtasks);

  let id = 0;
  const getId = () => {
    return id++;
  };

  const initialState = subtasks.reduce(
    (accumulator, subtask) => ({
      ...accumulator,
      [`subtask_${getId()}`]: subtask.title,
    }),
    {}
  );

  const [subtasksInputs, setSubtasksInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialState
  );

  const handleSubtasksInputs = (e) => {
    const name = e.target.name;
    const newValue = e.target.value;
    setSubtasksInput({ [name]: newValue });
  };

  const handleAddSubtask = () => {
    setSubtasks(prev => [...prev, {title: '', isCompleted: false}]);
    setSubtasksInput({[`subtask_${getId()}`]: ''})
  }

  const handleSubmit = () => {
    
  }

  return (
    <>
      <h3>Edit Task</h3>
      <h4>Title</h4>
      <input
        type="text"
        value={taskTitle}
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
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <h4>Subtasks</h4>
        {subtasks.map((subtask, index) => {
          return (
            <div key={`subtask_${index}`}>
              <input
                type="text"
                name={`subtask_${index}`}
                value={subtasksInputs[`subtask_${index}`]}
                onChange={handleSubtasksInputs}
              ></input>
            </div>
          );
        })}
        <input type="button" value='+ Add New Subtask' onClick={handleAddSubtask}/>
        <h4>Status</h4>
        <select name="taskStatus">
          <option value="Queue">Queue</option>
          <option value="Development">Development</option>
          <option value="Done">Done</option>
        </select>
        <input type="submit" value='Save Changes' />
      </form>
    </>
  );
};

export default TodoModalEdit;
