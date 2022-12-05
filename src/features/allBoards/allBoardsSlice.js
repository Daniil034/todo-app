import data from "../../data.json";
import {
  actionEnums,
  getTaskIndexes,
  getBoardIndex,
  getCommentsRecursion,
} from "../../helperFunc";

const initialState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState")).allBoards
  : data.boards;

export const allBoardsReducer = (allBoards = initialState, action) => {
  switch (action.type) {
    //
    case "allBoards/addTask": {
      const [newTask, { boardName, columnName }] = action.payload;
      const { id, status } = newTask;
      const { boardIndex, columnIndex } = getTaskIndexes(allBoards, {
        id,
        status,
        boardName,
        columnName,
      });
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
                  ...newTask,
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
      const [newTask, { boardName, columnName }] = action.payload;
      const { id, status } = newTask;
      const { boardIndex, columnIndex, taskIndex } = getTaskIndexes(
        allBoards,
        {
          id,
          status,
          boardName,
          columnName,
        },
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
      const [newTask, { boardName, columnName }] = action.payload;
      const { id, status } = newTask;
      const { boardIndex, columnIndex, taskIndex } = getTaskIndexes(
        allBoards,
        {
          id,
          status,
          boardName,
          columnName,
        },
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
                  ...newTask,
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

    // case "allBoards/addComment": {
    //   const [
    //     parentsArray,
    //     { newCommentContent, status, id, boardName, columnName },
    //   ] = action.payload;
    //   const { boardIndex, columnIndex, taskIndex } = getTaskIndexes(
    //     allBoards,
    //     { status, id, boardName, columnName },
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
    //               comments:
    //                 // action.payload.reduce((commentAccum, currentComment, currentIndex) => {
    //                 //   for (let i = 0; i <= currentIndex; i++) {
    //                 //     const commentIndex = commentAccum.findIndex(comment => comment.id === currentComment);
    //                 //     return [...commentAccum[commentIndex].slice(0, )]
    //                 //   }
    //                 //   return {...allBoards[boardIndex].columns[columnIndex].tasks[taskIndex].comments[currentComment]}
    //                 // }, allBoards[boardIndex].columns[columnIndex].tasks[taskIndex].comments)
    //                 getCommentsRecursion(
    //                   allBoards[boardIndex].columns[columnIndex].tasks[
    //                     taskIndex
    //                   ].comments,
    //                   parentsArray,
    //                   newCommentContent
    //                 ),
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

    //

    case "allBoards/addComment": {
      const [newCommentContent, status, id, boardName, columnName] =
        action.payload;
      const { boardIndex, columnIndex, taskIndex } = getTaskIndexes(
        allBoards,
        { status, id, boardName, columnName },
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
                  comments: [
                    ...allBoards[boardIndex].columns[columnIndex].tasks[
                      taskIndex
                    ].comments,
                    newCommentContent
                  ]
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

export const addComment = (payload) => {
  return {
    type: "allBoards/addComment",
    payload: payload,
  };
};

// selectors

export const selectAllBoards = (state) => state.allBoards;

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
