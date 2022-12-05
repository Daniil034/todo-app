import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./app/App";
import CurrentBoard, {
  loader as currentBoardLoader,
} from "./routes/currentBoard/CurrentBoard";
import TaskModal, {
  loader as taskLoader,
} from "./routes/TaskModal/TaskModal";
import { store } from "./app/store";
import './UI/variables.scss';
import './UI/reset.scss';
import './UI/globalStyles.scss';

const router = createBrowserRouter([
  {
    path: "/todo-app",
    element: <App />,
  },
  {
    path: "/todo-app/:boardName",
    element: <CurrentBoard />,
    loader: currentBoardLoader,
    children: [
      {
        path: "/todo-app/:boardName/:taskId",
        element: <TaskModal />,
        loader: taskLoader,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>

);
