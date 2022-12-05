import React from "react";
import { Link } from "react-router-dom";
import "./TaskTile.scss";

const TaskTile = ({ task, boardName }) => {
  const { title, subtasks } = task;

  const completedTasks = subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;

  return (
    <Link to={`${task.id}`}>
      <li className="task-tile">
        <h3 className="task-tile__title">{title}</h3>
        <p className="task-tile__subtasks">
          {completedTasks} of {subtasks.length} subtasks
        </p>
      </li>
    </Link>
  );
};

export default TaskTile;
