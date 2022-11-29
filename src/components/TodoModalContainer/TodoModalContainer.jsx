import React, { useState } from "react";
import TodoModalContent from "../TodoModalContent/TodoModalContent";
import TodoModalEdit from "../TodoModalEdit/TodoModalEdit";
import "./style.css";

const TodoModalContainer = ({ task }) => {
    const [isEditable, setIsEditable] = useState(false);

  return (
    <div className="todo-modal" onClick={(e) => e.stopPropagation()}>
      {isEditable ? <TodoModalEdit task={task} /> : <TodoModalContent task={task} setIsEditable={setIsEditable} />}
    </div>
  );
};

export default TodoModalContainer;
