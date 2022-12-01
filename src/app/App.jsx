// import { useSelector } from "react-redux";
// import { selectShowEditTodoModal } from "../features/editTodoModal/editTodoModalSlice";
import { Outlet } from "react-router-dom";
import AllBoards from "../features/allBoards/AllBoards";
// import CurrentBoard from "../routes/currentBoard/CurrentBoard";
// import EditTodoModal from "../features/editTodoModal/EditTodoModal";
import "../index.css";

function App() {
  // const editTodoIsVisible = useSelector(selectShowEditTodoModal);

  return (
    <div className="App">
      <AllBoards />
      <Outlet />
    
      {/* <CurrentBoard /> */}
      {/* {editTodoIsVisible && <EditTodoModal />} */}
    </div>
  );
}

export default App;