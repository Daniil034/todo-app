import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectAllBoards,
} from "../../features/allBoards/allBoardsSlice";
import { searchTask } from "../../helperFunc";
import { Link } from "react-router-dom";

const SearchForm = ({ boardName }) => {
  const [searchForm, setSearchForm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //   const allBoards = useSelector(selectAllBoardsNames);
  const allBoards = useSelector(selectAllBoards);

  console.log(searchForm.length);

  useEffect(() => {
    // const timer = setTimeout(() => {
    if (searchForm.length > 5) {
      setSearchResults(searchTask(searchForm, allBoards, boardName));
    } else {
      setSearchResults([]);
    }

    // }, 500);

    // return () => clearTimeout(timer);
  }, [searchForm]);

  return (
    <>
      <form id="search-form" role="search">
        <input
          aria-label="Search task"
          placeholder="Search for task"
          type="search"
          name="q"
          value={searchForm}
          onChange={(e) => setSearchForm(e.target.value)}
        />
        {searchResults.length > 0 ? (
          searchResults.map((task, index) => (
            <Link to={`${task.id}`} key={index}>
              <div>{task.id}</div>
              <div>{task.title}</div>
            </Link>
          ))
        ) : 5 < searchForm.length ? (
          <p>No match found on current board</p>
        ) : searchForm.length <= 5 ? (
          <p>Input task name or id</p>
        ) : null}
      </form>
    </>
  );
};

export default SearchForm;
