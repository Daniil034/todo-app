import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./app/App";
import CurrentBoard, {
  loader as currentBoardLoader,
  // action as editBoardAction,
} from "./routes/currentBoard/CurrentBoard";
import TaskModal, {
  loader as taskLoader,
  action as editTaskAction
} from "./routes/TaskModal/TaskModal";
import { store } from "./app/store";
import './UI/variables.scss';
import './UI/reset.scss';
import './UI/globalStyles.scss';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // children: [
    //   {
    //     path: "/:boardName",
    //     element: <CurrentBoard />,
    //     loader: currentBoardLoader,
    //   },
    // ],
  },
  {
    path: "/:boardName",
    element: <CurrentBoard />,
    loader: currentBoardLoader,
    // action: editBoardAction,
    children: [
      {
        path: "/:boardName/:taskId",
        element: <TaskModal />,
        loader: taskLoader,
        // action: editTaskAction
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <Provider store={store}>
    {/* <App /> */}
    <RouterProvider router={router} />
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
