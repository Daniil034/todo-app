import React, { useState } from "react";
import TodoModalContent from "../TodoModalContent/TodoModalContent";
import TodoModalEdit from "../TodoModalEdit/TodoModalEdit";
import DeleteTaskModal from "../DeleteTaskModal/DeleteTaskModal";
import "./style.css";

const TodoModalContainer = ({ task, boardName, columnName, setIsModalVisible }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="todo-modal" onClick={(e) => e.stopPropagation()}>
      {isEditable ? (
        <TodoModalEdit
          task={task}
          boardName={boardName}
          columnName={columnName}
          setIsEditable={setIsEditable}
          setIsModalVisible={setIsModalVisible}
        />
      ) : showDeleteModal ? (
        <DeleteTaskModal
          task={task}
          boardName={boardName}
          columnName={columnName}
          setShowDeleteModal={setShowDeleteModal}
          setIsModalVisible={setIsModalVisible}
        />
      ) : (
        <TodoModalContent
          task={task}
          boardName={boardName}
          columnName={columnName}
          setIsEditable={setIsEditable}
          setIsModalVisible={setIsModalVisible}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
    </div>
  );
};

export default TodoModalContainer;
