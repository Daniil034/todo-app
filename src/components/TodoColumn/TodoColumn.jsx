import React from "react";
import TodoTile from "../TodoTile/TodoTile";

const TodoColumn = ({ column, boardName }) => {
  return (
    <>
      <div>{column.name}</div>
      <ul>
        {column.tasks.map((task, index) => (
          <TodoTile key={index} task={task} boardName={boardName} columnName={column.name} />
        ))}
      </ul>
    </>
  );
};

export default TodoColumn;
