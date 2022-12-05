import React from "react";
import { useSelector } from "react-redux";
import { useLoaderData, Outlet } from "react-router-dom";
import Column from "../../components/Column/Column";
import CurrentBoardHeader from "../../components/CurrentBoardHeader/CurrentBoardHeader";
import './CurrentBoard.scss';

export const loader = ({ params }) => {
  return params.boardName;
};
const CurrentBoard = () => {
  const currentBoardName = useLoaderData();

  const currentBoard = useSelector((state) =>
    state.allBoards.find((board) => board.name === currentBoardName)
  );

  return (
    <div className="current-board">
      <CurrentBoardHeader boardName={currentBoard.name} />
      <div className="current-board__columns">
        {currentBoard.columns.map((column, index) => (
          <Column
            key={index}
            column={column}
            boardName={currentBoard.name}
          />
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default CurrentBoard;
