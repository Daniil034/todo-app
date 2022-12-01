import React from "react";
import { useSelector } from "react-redux";
import { useLoaderData, redirect } from "react-router-dom";
import TodoColumn from "../../components/TodoColumn/TodoColumn";
import Header from "../../components/Header/Header";

export const loader = ({ params }) => {
  return params.boardName;
};

const CurrentBoard = () => {
  const currentBoardName = useLoaderData();

  const currentBoard = useSelector((state) =>
    state.allBoards.find((board) => board.name === currentBoardName)
  );

  return (
    <>
      <Header boardName={currentBoard.name} />
      {currentBoard.columns.map((column, index) => (
        <TodoColumn key={index} column={column} boardName={currentBoard.name} />
      ))}
    </>
  );
};

export default CurrentBoard;
