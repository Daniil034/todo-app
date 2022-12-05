import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAllBoards } from "../../features/allBoards/allBoardsSlice";
import { Link } from "react-router-dom";
import { searchTask } from "../../helperFunc";
import IconCross from "../icons/IconCross";
import "./SearchForm.scss";

const SearchForm = ({ boardName, setShowSearchForm }) => {
  const [searchForm, setSearchForm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const allBoards = useSelector(selectAllBoards);

  useEffect(() => {
    if (searchForm.length > 5) {
      setSearchResults(searchTask(searchForm, allBoards, boardName));
    } else {
      setSearchResults([]);
    }
  }, [searchForm]);

  return (
    <div className="search-form">
      <form role="search">
        <input
        className="search-form__input"
          aria-label="Search task"
          placeholder="T-000010"
          type="search"
          name="q"
          value={searchForm}
          onChange={(e) => setSearchForm(e.target.value)}
        />
        {searchResults.length > 0 ? (
          <ul className="search-form__dropdown">
            {searchResults.map((task, index) => (
              <li className="search-form__dropdown-item" key={index}>
                <Link to={`${task.id}`}>
                  <p>{task.id}</p>
                  <p>{task.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : 5 < searchForm.length ? (
          <p>No match found on current board</p>
        ) :  null}
      </form>
      <button type="button" onClick={() => setShowSearchForm(false)}>
        <IconCross />
      </button>
    </div>
  );
};

export default SearchForm;
