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

export const searchTask = (input, allBoards, boardName) => {
  const reg = new RegExp(input, "gi");
  console.log(reg);
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
  console.log(result);
  return result;
};
