import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { allBoardsReducer } from "../features/allBoards/allBoardsSlice";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  combineReducers({
    allBoards: allBoardsReducer,
  }),
  composeEnhancers(applyMiddleware())
);

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});
