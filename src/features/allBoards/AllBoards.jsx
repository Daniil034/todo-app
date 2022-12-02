import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllBoards } from "./allBoardsSlice";
import AddBoardModal from "../../components/AddBoardModal/AddBoardModal";

const AllBoards = () => {
  const allBoards = useSelector(selectAllBoards);
  const [showAddBoardModal, setShowAddBoardModal] = useState(false);

  return (
    <>
      <nav>
        <ul>
          {allBoards.map((board, index) => (
            <li key={index}>
              <Link to={`/${board.name}`}>{board.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <input type="button" onClick={() => setShowAddBoardModal(true)}  value='add board' />
      {showAddBoardModal && <AddBoardModal setShowAddBoardModal={setShowAddBoardModal} />}
    </>
  );
};

export default AllBoards;
