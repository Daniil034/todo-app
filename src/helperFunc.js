export const actionEnums = {
  add: "ADD",
  delete: "DELETE",
  edit: "EDIT",
};

export const columnsEnums = {
  1: "Queue",
  2: "Development",
  3: "Done",
};

export const getTaskIndexes = (state, payload, action) => {
  const { status, boardName, id, columnName } = payload;
  const boardIndex = getBoardIndex(state, boardName);
  let columnIndex;
  let taskIndex;
  if (action === actionEnums.delete || action === actionEnums.edit) {
    columnIndex = state[boardIndex].columns.findIndex((column) => {
      if (action === actionEnums.edit) {
        return column.name === status;
      }
      if (action === actionEnums.delete) {
        return column.name === columnName;
      }
    });
    taskIndex = state[boardIndex].columns[columnIndex].tasks.findIndex(
      (task) => task.id === id
    );
  } else {
    columnIndex =
      state[boardIndex].columns.findIndex((column) => column.name === status) ||
      0;
  }
  return { boardIndex, columnIndex, taskIndex };
};

export const getBoardIndex = (state, boardName) => {
  const boardIndex = state.findIndex((board) => board.name === boardName);
  return boardIndex;
};

// search task from user's input

export const searchTask = (input, allBoards, boardName) => {
  const reg = new RegExp(input, "gi");
  const boardIndex = getBoardIndex(allBoards, boardName);
  const result = allBoards[boardIndex].columns.reduce(
    (columnAccum, currentColumn) => {
      return Array.from(columnAccum).concat(
        currentColumn.tasks.filter(
          (task) => task.id.match(reg) || task.title.match(reg)
        )
      );
    },
    []
  );
  return result;
};


// export const getCommentsRecursion = (state, commentsId, newCommentContent) => {
//   let commentId = state.findIndex(comment => commentsId.includes(comment.id));

//   for (let i = 0; i < commentsId.length; i++) {
    
//   }


//   for (let i = 0; i < state.length; i++) {
//     if (state[i].id === commentId) {
//       return state[i].comments.concat([newCommentContent])
//     } else {
//       return [...getCommentsRecursion(state[i].comments, commentId, newCommentContent)]
//     }
//   }
// }

// export const getCommentsRecursion = (state, commentsId, newCommentContent) => {
//   if (state.some(comment => commentsId.includes(comment.id))) {
//     let commentId = state.findIndex(comment => comment.id === comme)
//     if (state.id === commentsId[commentsId.length -1 ]) {
//       return state.concat([newCommentContent]);
//     } else {
//       getCommentsRecursion(state.comments, commentsId, newCommentContent)
//     }
//   } else {
//     return state;
//   }
// }

// export function getCommentsRecursion(state, commentId, newCommentContent) {
//   for (let index = 0; index < state.length; index++) {
//     const element = state[index];
//     if (element.id === commentId) {
//       return element;
//     } else {
//       if (element.comments) {
//         const found = getCommentsRecursion(element.comments, commentId, newCommentContent);

//         if (found) {
//           return [found];
//         }
//       }
//     }
//   }
// }