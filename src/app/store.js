import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { allBoardsReducer } from "../features/allBoards/allBoardsSlice";
import { currentBoardReducer } from "../routes/currentBoard/currentBoardSlice";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  combineReducers({
    allBoards: allBoardsReducer,
    // currentBoard: currentBoardReducer,
    // editTodoModal: editTodoModalReducer,
  }),
  composeEnhancers(applyMiddleware())
);
