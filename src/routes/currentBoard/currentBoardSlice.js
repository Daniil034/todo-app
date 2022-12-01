import data from "../../data.json";

const initialState =
  data.boards.length > 0 ? data.boards[0] : "Select your board";

export const currentBoardReducer = (currentBoard = initialState, action) => {
  switch (action.type) {
    case "currentBoard/pick":
      return action.payload;
    default:
      return currentBoard;
  }
};

// action creators

export const pickCurrentBoard = (board) => {
  return {
    type: "currentBoard/pick",
    payload: board,
  };
};

export const selectCurrentBoard = (state) => state.currentBoard;
