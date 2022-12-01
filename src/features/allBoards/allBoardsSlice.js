import data from "../../data.json";
import { actionEnums, getIndexes } from "../../helperFunc";
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
      const { title, description, status, subtasks, id, files } = action.payload;
      const { boardIndex, columnIndex } = getIndexes(allBoards, action.payload);
      console.log(columnIndex);
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
                  files
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
      const { boardIndex, columnIndex, taskIndex } = getIndexes(
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
      const { boardIndex, columnIndex, taskIndex } = getIndexes(
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
                  files: action.payload.files
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
    // case "allBoards/checkSubtask": {
    //   console.log(action.payload)
    //   const { boardIndex, columnIndex, taskIndex } = getIndexes(
    //     allBoards,
    //     action.payload.task,
    //     actionEnums.edit
    //   );
    //   return [
    //     ...allBoards.slice(0, boardIndex),
    //     {
    //       ...allBoards[boardIndex],
    //       columns: [
    //         ...allBoards[boardIndex].columns.slice(0, columnIndex),
    //         {
    //           ...allBoards[boardIndex].columns[columnIndex],
    //           tasks: [
    //             ...allBoards[boardIndex].columns[columnIndex].tasks.slice(
    //               0,
    //               taskIndex
    //             ),
    //             {
    //               ...allBoards[boardIndex].columns[columnIndex].tasks[
    //                 taskIndex
    //               ],
    //               subtasks: [
    //                 ...allBoards[boardIndex].columns[columnIndex].tasks[
    //                   taskIndex
    //                 ].subtasks.slice(0, action.payload.subtaskIndex),
    //                 action.payload,
    //                 ...allBoards[boardIndex].columns[columnIndex].tasks[
    //                   taskIndex
    //                 ].subtasks.slice(action.payload.subtaskIndex + 1),
    //               ],
    //             },
    //             ...allBoards[boardIndex].columns[columnIndex].tasks.slice(
    //               taskIndex + 1
    //             ),
    //           ],
    //         },
    //         ...allBoards[boardIndex].columns.slice(columnIndex + 1),
    //       ],
    //     },
    //     ...allBoards.slice(boardIndex + 1),
    //   ];
    // }
    default:
      return allBoards;
  }
};

// action creators

export const editTask = (task) => {
  return {
    type: "allBoards/editTask",
    payload: task,
  };
};

export const deleteTask = (task) => {
  return {
    type: "allBoards/deleteTask",
    payload: task,
  };
};

export const addTask = (task) => {
  return {
    type: "allBoards/addTask",
    payload: task,
  };
};

export const checkSubtask = (subtask) => {
  return {
    type: "allBoards/checkSubtask",
    payload: subtask,
  };
};

// selectors

export const selectAllBoards = (state) => state.allBoards;
