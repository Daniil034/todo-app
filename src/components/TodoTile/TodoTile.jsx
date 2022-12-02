import React from "react";
// import { useDispatch } from "react-redux";
// import { showEditTodoModal } from "../../features/editTodoModal/editTodoModalSlice";
import { Link } from "react-router-dom";
import TodoModalContainer from "../TodoModalContainer/TodoModalContainer";
import "./style.css";

const TodoTile = ({ task, boardName }) => {
  const { title, subtasks } = task;
  // const [isModalVisible, setIsModalVisible] = useState(false);

  const completedTasks = subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;

  return (
    <>
      <li className="todo-tile" /*onClick={() => setIsModalVisible(true)} */>
        <Link to={`${task.id}`}>
          <h3>{title}</h3>
          <p>
            {completedTasks} of {subtasks.length} subtasks
          </p>
        </Link>
      </li>

      
    </>
  );
};

export default TodoTile;
