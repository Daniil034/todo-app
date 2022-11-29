import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllBoards } from "./allBoardsSlice";
import { pickCurrentBoard } from "../currentBoard/currentBoardSlice";

const AllBoards = () => {
  const allBoards = useSelector(selectAllBoards);
  const dispatch = useDispatch();

  const handleChange = (boardName) => {
    const board = allBoards.find((board) => board.name === boardName);
    dispatch(pickCurrentBoard(board));
  };

  return (
    <select onChange={(e) => handleChange(e.currentTarget.value)}>
      {allBoards.map((board, index) => (
        <option key={index} value={board.name}>
          {board.name}
        </option>
      ))}
    </select>
  );
};

export default AllBoards;
