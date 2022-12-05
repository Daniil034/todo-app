import React from "react";
import TaskTile from "../TaskTile/TaskTile";
import './Column.scss'

const Column = ({ column, boardName }) => {
  return (
    <div className="column">
      <p className="column__name"><span className={`column__${column.name.toLowerCase()}`}></span>{`${column.name} (${column.tasks.length})`}</p>
      <ul className="column__tasks">
        {column.tasks.map((task, index) => (
          <TaskTile key={index} task={task} boardName={boardName} columnName={column.name} />
        ))}
      </ul>
    </div>
  );
};

export default Column;
