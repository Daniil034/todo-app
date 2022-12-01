import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { showEditTodoModal } from "../../features/editTodoModal/editTodoModalSlice";
import TodoModalContainer from "../TodoModalContainer/TodoModalContainer";
import "./style.css";

const TodoTile = ({ task, boardName, columnName }) => {
  const { title, subtasks } = task;
  //   const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const completedTasks = subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;

  return (
    <>
      <li className="todo-tile" onClick={() => setIsModalVisible(true)}>
        <h3>{title}</h3>
        <p>
          {completedTasks} of {subtasks.length} subtasks
        </p>
      </li>
      {isModalVisible && (
        <div className="overlay" onClick={() => setIsModalVisible(false)}>
          <TodoModalContainer task={task} boardName={boardName} columnName={columnName} setIsModalVisible={setIsModalVisible} />
        </div>
      )}
    </>
  );
};

export default TodoTile;
