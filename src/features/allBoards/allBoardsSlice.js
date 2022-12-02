import data from "../../data.json";
import { actionEnums, getTaskIndexes, getBoardIndex } from "../../helperFunc";
// const initialState = {
//   boards: {},
//   columns: {},
//   tasks: {}
// }

// data.forEach(d => {
//   const board = {...d};
//   initialState.boards[board.name] = board;

//   d.columns.forEach(c => {
//     const column = {...c, boardName: board.name};

//   })
// })

// reducer

const initialState = data.boards;
export const allBoardsReducer = (allBoards = initialState, action) => {
  switch (action.type) {
    //
    case "allBoards/addTask": {
      const { title, description, status, subtasks, id, files } =
        action.payload;
      const { boardIndex, columnIndex } = getTaskIndexes(
        allBoards,
        action.payload
      );
      return [
        ...allBoards.slice(0, boardIndex),
        {
          ...allBoards[boardIndex],
          columns: [
            ...allBoards[boardIndex].columns.slice(0, columnIndex),
            {
              ...allBoards[boardIndex].columns[columnIndex],
              tasks: [
                ...allBoards[boardIndex].columns[columnIndex].tasks,
                {
                  title,
                  description,
                  status,
                  subtasks,
                  id,
                  files,
                },
              ],
            },
            ...allBoards[boardIndex].columns.slice(columnIndex + 1),
          ],
        },
        ...allBoards.slice(boardIndex + 1),
      ];
    }

    //
    case "allBoards/deleteTask": {
      const { boardIndex, columnIndex, taskIndex } = getTaskIndexes(
        allBoards,
        action.payload,
        actionEnums.delete
      );
      return [
        ...allBoards.slice(0, boardIndex),
        {
          ...allBoards[boardIndex],
          columns: [
            ...allBoards[boardIndex].columns.slice(0, columnIndex),
            {
              ...allBoards[boardIndex].columns[columnIndex],
              tasks: [
                ...allBoards[boardIndex].columns[columnIndex].tasks.slice(
                  0,
                  taskIndex
                ),
                ...allBoards[boardIndex].columns[columnIndex].tasks.slice(
                  taskIndex + 1
                ),
              ],
            },
            ...allBoards[boardIndex].columns.slice(columnIndex + 1),
          ],
        },
        ...allBoards.slice(boardIndex + 1),
      ];
    }

    //
    case "allBoards/editTask": {
      const { boardIndex, columnIndex, taskIndex } = getTaskIndexes(
        allBoards,
        action.payload,
        actionEnums.edit
      );
      return [
        ...allBoards.slice(0, boardIndex),
        {
          ...allBoards[boardIndex],
          columns: [
            ...allBoards[boardIndex].columns.slice(0, columnIndex),
            {
              ...allBoards[boardIndex].columns[columnIndex],
              tasks: [
                ...allBoards[boardIndex].columns[columnIndex].tasks.slice(
                  0,
                  taskIndex
                ),
                {
                  ...allBoards[boardIndex].columns[columnIndex].tasks[
                    taskIndex
                  ],
                  title: action.payload.title,
                  description: action.payload.description,
                  status: action.payload.status,
                  subtasks: action.payload.subtasks,
                  files: action.payload.files,
                },
                ...allBoards[boardIndex].columns[columnIndex].tasks.slice(
                  taskIndex + 1
                ),
              ],
            },
            ...allBoards[boardIndex].columns.slice(columnIndex + 1),
          ],
        },
        ...allBoards.slice(boardIndex + 1),
      ];
    }

    //

    case "allBoards/addBoard": {
      return [...allBoards, action.payload];
    }

    //

    case "allBoards/editBoard": {
      const { boardName, oldBoardName } = action.payload;
      const boardIndex = getBoardIndex(allBoards, oldBoardName);
      return [
        ...allBoards.slice(0, boardIndex),
        {
          ...allBoards[boardIndex],
          name: boardName,
        },
        ...allBoards.slice(boardIndex + 1),
      ];
    }

    //

    case "allBoards/deleteBoard": {
      const { boardName } = action.payload;
      console.log(boardName);
      return allBoards.filter((board) => board.name !== boardName);
    }

    default:
      return allBoards;
  }
};

// action creators

export const editTask = (payload) => {
  return {
    type: "allBoards/editTask",
    payload: payload,
  };
};

export const deleteTask = (payload) => {
  return {
    type: "allBoards/deleteTask",
    payload: payload,
  };
};

export const addTask = (payload) => {
  return {
    type: "allBoards/addTask",
    payload: payload,
  };
};

export const addBoard = (payload) => {
  return {
    type: "allBoards/addBoard",
    payload: payload,
  };
};

export const editBoard = (payload) => {
  return {
    type: "allBoards/editBoard",
    payload: payload,
  };
};

export const deleteBoard = (payload) => {
  return {
    type: "allBoards/deleteBoard",
    payload: payload,
  };
};

// selectors

export const selectAllBoards = (state) => state.allBoards;

// export const selectAllBoardsNames = (state) => state.allBoards.map(board=> board.name);

export const selectAllTasks = (state) =>
  state.allBoards.reduce((boardsAccum, currentBoard) => {
    return boardsAccum.concat(
      currentBoard.columns.reduce((columnsAccum, currentColumn) => {
        return Array.from(columnsAccum).concat(
          currentColumn.tasks.reduce((tasksAccum, currentTask) => {
            return Array.from(tasksAccum).concat(currentTask);
          }, [])
        );
      }, [])
    );
  }, []);
