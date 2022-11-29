import React from "react";

const TodoModalContent = ({ task, setIsEditable }) => {
  const subtasks = task.subtasks;
  const completedTasks = subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;

  return (
    <>
      <div>
        <h3>{task.title}</h3>
        <input type="button" onClick={() => setIsEditable(true)} />
      </div>
      <p>{task.description}</p>
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <h4>
          Subtasks ({completedTasks} of {subtasks.length})
        </h4>
        {subtasks.map((subtask) => {
          const id = `subtask_${Math.random().toString().replace(/0\./, "")}`;
          return (
            <div key={id}>
              <input
                type="checkbox"
                name="subtaskCompletion"
                id={id}
                defaultChecked={subtask.isCompleted}
              ></input>
              <label htmlFor={id}>{subtask.title}</label>
            </div>
          );
        })}
        <h4>Current Status</h4>
        <select name="taskStatus">
          <option value="Queue">Queue</option>
          <option value="Development">Development</option>
          <option value="Done">Done</option>
        </select>
      </form>
    </>
  );
};

export default TodoModalContent;
