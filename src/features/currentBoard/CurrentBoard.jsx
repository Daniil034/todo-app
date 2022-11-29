import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentBoard } from "./currentBoardSlice";
import TodoColumn from "../../components/TodoColumn/TodoColumn";

const CurrentBoard = () => {
  const currentBoard = useSelector(selectCurrentBoard);
  return (
    <>
      {currentBoard.columns.map((column, index) => (
        <TodoColumn key={index} column={column} />
      ))}
    </>
  );
};

export default CurrentBoard;
