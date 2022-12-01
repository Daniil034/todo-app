export const actionEnums = {
  add: "ADD",
  delete: "DELETE",
  edit: "EDIT",
};

export const getIndexes = (state, payload, action) => {
  const { status, boardName, id, columnName } = payload;
  const boardIndex = state.findIndex((board) => board.name === boardName);
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
  // if (action === actionEnums.add) {
  //   columnIndex = 0;
  //   taskIndex = state[boardIndex].columns[columnIndex].length - 1;
  // }
  return { boardIndex, columnIndex, taskIndex };
};
