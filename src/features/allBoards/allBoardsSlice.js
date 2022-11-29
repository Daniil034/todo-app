import data from "../../data.json";

const initialState = data;
export const allBoardsReducer = (allDocuments = initialState, action) => {
  switch (action.type) {
    case "allDocuments/addDocument":
      return [...allDocuments, action.payload];
    default:
      return allDocuments;
  }
};

export const selectAllBoards = (state) => state.allBoards.boards;