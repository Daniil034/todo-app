import React from "react";
import { useSelector } from "react-redux";
import { useLoaderData, Outlet } from "react-router-dom";
import TodoColumn from "../../components/TodoColumn/TodoColumn";
import Header from "../../components/Header/Header";
import { store } from "../../app/store";
import { editBoard } from "../../features/allBoards/allBoardsSlice";

export const loader = ({ params }) => {
  return params.boardName;
};

// export const action = async ({request, params}) => {
//   const formData = await request.formData();
//   const newBoardName = formData.get('newBoardName')
//   store.dispatch(editBoard({boardName: newBoardName, oldBoardName: `${params.boardName}`}))
//   return redirect(`/${newBoardName}`)
// }

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
      <Outlet />
    </>
  );
};

export default CurrentBoard;
