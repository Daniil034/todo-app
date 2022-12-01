import { useReducer } from "react";

export const useSubtasksInputs = ({ subtasks }) => {
  const initialState = subtasks.reduce((accumulator, subtask) => {
    return [
      ...accumulator,
      {
        title: subtask.title,
        isCompleted: subtask.isCompleted,
      },
    ];
  }, []);

  const [subtasksInputs, setSubtasksInput] = useReducer(
    (state, { newState, index }) => {
      if (typeof newState === "function") {
        return newState(state);
      }
      if (typeof index == "undefined") {
        return [...state, newState];
      }
      return [...state.slice(0, index), newState, ...state.slice(index + 1)];
    },
    initialState
  );

  return [subtasksInputs, setSubtasksInput];
};
