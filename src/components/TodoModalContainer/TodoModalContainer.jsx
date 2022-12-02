import React, { useState } from "react";
import { useLoaderData, useNavigate, redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import EditTaskModal from "../EditTaskModal/EditTaskModal";
import TodoModalContent from "../TodoModalContent/TodoModalContent";
import DeleteTaskModal from "../DeleteTaskModal/DeleteTaskModal";
import "./style.css";

export const loader = ({ params }) => {
  return { boardName: params.boardName, taskId: params.taskId };
};

// export const action = ({ request, params }) => {
//   return redirect(`/${params.boardName}/${params.taskId}`);
// };

const TodoModalContainer = () => {
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { boardName, taskId } = useLoaderData();

  const task = useSelector((state) =>
    state.allBoards
      .find((board) => board.name === boardName)
      .columns.find((column) => column.tasks.find((task) => task.id === taskId))
      .tasks.find((task) => task.id === taskId)
  );

  const columnName = task.status;

  return (
    <div className="overlay" onClick={() => navigate(`/${boardName}`)}>
      <div className="todo-modal" onClick={(e) => e.stopPropagation()}>
        {isEditable ? (
          <EditTaskModal
            task={task}
            boardName={boardName}
            columnName={columnName}
            setIsEditable={setIsEditable}
          />
        ) : showDeleteModal ? (
          <DeleteTaskModal
            task={task}
            boardName={boardName}
            columnName={columnName}
            setShowDeleteModal={setShowDeleteModal}
          />
        ) : (
          <TodoModalContent
            task={task}
            boardName={boardName}
            columnName={columnName}
            setIsEditable={setIsEditable}
            setShowDeleteModal={setShowDeleteModal}
          />
        )}
      </div>
    </div>
  );
};

export default TodoModalContainer;
