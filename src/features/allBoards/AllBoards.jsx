import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllBoards } from "./allBoardsSlice";
import AddBoardModal from "../../components/AddBoardModal/AddBoardModal";
import AllBoardsHeader from "../../components/AllBoardsHeader/AllBoardsHeader";
import IconBoard from "../../components/icons/IconBoard";
import "./AllBoards.scss";

const AllBoards = () => {
  const allBoards = useSelector(selectAllBoards);
  const [showAddBoardModal, setShowAddBoardModal] = useState(false);

  return (
    <div className="all-boards">
      <AllBoardsHeader setShowAddBoardModal={setShowAddBoardModal} />
      <div className="all-boards__container">
        <h2 className="all-boards__title">All boards ({allBoards.length})</h2>
        <nav className="all-boards__navbar">
          <ul>
            {allBoards.map((board, index) => (
              <li className="all-boards__navbar-item" key={index}>
                <Link className="all-boards__navbar-link" to={`/${board.name}`}>
                  <IconBoard />
                  {board.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {showAddBoardModal && (
        <AddBoardModal setShowAddBoardModal={setShowAddBoardModal} />
      )}
    </div>
  );
};

export default AllBoards;
