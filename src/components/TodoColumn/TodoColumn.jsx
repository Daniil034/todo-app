import React from "react";
import TodoTile from "../TodoTile/TodoTile";

const TodoColumn = ({ column }) => {
  return (
    <>
      <div>{column.name}</div>
      <ul>
        {column.tasks.map((task, index) => (
          <TodoTile key={index} task={task} />
        ))}
      </ul>
    </>
  );
};

export default TodoColumn;
