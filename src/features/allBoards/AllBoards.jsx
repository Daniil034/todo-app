import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllBoards } from "./allBoardsSlice";
import { pickCurrentBoard } from "../../routes/currentBoard/currentBoardSlice";

const AllBoards = () => {
  const allBoards = useSelector(selectAllBoards);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(pickCurrentBoard())
  // })

  // const handleChange = (boardName) => {
  //   const board = allBoards.find((board) => board.name === boardName);
  //   dispatch(pickCurrentBoard(board));
  // };

//   return (
//     <select onChange={(e) => handleChange(e.currentTarget.value)}>
//       {allBoards.map((board, index) => (
//         <option key={index} value={board.name}>
//           {board.name}
//         </option>
//       ))}
//     </select>
//   );

  return (
    <nav>
      <ul>
        {allBoards.map((board, index) => (
          <li key={index}>
            <Link to={`/${board.name}`}>{board.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
};


export default AllBoards;
