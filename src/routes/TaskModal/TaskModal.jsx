import React, { useState } from "react";
import { useLoaderData, useNavigate, redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import EditTaskModal from "../../components/EditTaskModal/EditTaskModal";
import TaskModalContent from "../../components/TaskModalContent/TaskModalContent";
import DeleteTaskModal from "../../components/DeleteTaskModal/DeleteTaskModal";
import "./TaskModal.scss";

export const loader = ({ params }) => {
  return { boardName: params.boardName, taskId: params.taskId };
};
const TaskModal = () => {
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
      <div className="task-modal" onClick={(e) => e.stopPropagation()}>
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
          <TaskModalContent
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

export default TaskModal;
