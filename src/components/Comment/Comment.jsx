import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AddCommentSection from "../AddCommentSection/AddCommentSection";
import { addComment } from "../../features/allBoards/allBoardsSlice";

const Comment = ({ comment, parent, task, boardName, columnName }) => {
  const dispatch = useDispatch();
  const [showReply, setShowReply] = useState(false);
  const { status, id: taskId } = task;
  const parentSum = [...parent, comment.id];

  const handleReply = (content) => {
    dispatch(
      addComment([
        parentSum.slice(1),
        { newCommentContent: {content, id: Date.now().toString(), comments: []}, status, id: taskId, boardName, columnName },
      ])
    );
  };

  return (
    <>
      <div>
        <button type="button" onClick={() => setShowReply(true)}>
          reply
        </button>
        {comment.content}
      </div>
      <div className="comment">
        {showReply && <AddCommentSection parent={comment} handleReply={handleReply} />}
        {/* {comment.comments.map((reply, index) => (
          <Comment
            key={index}
            comment={reply}
            parent={parentSum}
            task={task}
            boardName={boardName}
            columnName={columnName}
          />
        ))} */}
      </div>
    </>
  );
};

export default Comment;
