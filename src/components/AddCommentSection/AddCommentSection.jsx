import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../features/allBoards/allBoardsSlice";
import "./AddCommentSection.scss";

const AddCommentSection = ({task, columnName, boardName}) => {
  const dispatch = useDispatch();
  const [textArea, setTextArea] = useState('');
  const textAreaRef = useRef(null);


  useEffect(() => {
    textAreaRef.current.style.height = "96px";
    const ScrollHeight = textAreaRef.current.scrollHeight;
    textAreaRef.current.style.height = ScrollHeight + "px";
  }, [textArea]);

  const handleClick = () => {
    dispatch(addComment([{id: Date.now(), content: textArea, comments: []}, task.status, task.id, boardName, columnName]));
    setTextArea('')
  }


  return (
    <div className="add-comment">
      <textarea
        ref={textAreaRef}
        className="add-comment__text-area"
        name="add-comment-text-area"
        onChange={(e) => setTextArea(e.target.value)}
        placeholder="Add a comment…"
        value={textArea}
      ></textarea>
        <button className="add-comment__button" type="button" onClick={handleClick}>Send</button>
    </div>
  );
};

export default AddCommentSection;
