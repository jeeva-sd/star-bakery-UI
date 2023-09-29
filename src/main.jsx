import * as ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

import store from "./store";
import Layout from "./components/container/Layout";
import PageNotFound from './components/boundaries/PageNotFound';
import Login from './components/container/Login';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/dashboard/Dashboard';
import ProtectedRoute from './extensions/ProtectedRoute';
import LeaderBoard from './components/leaderboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <ProtectedRoute Component={Layout} />,
    children: [
      {
        path: "dashboard",
        element: <ProtectedRoute Component={Dashboard} />,
      },
      {
        path: "leader-board",
        element: <ProtectedRoute Component={LeaderBoard} />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer />
  </Provider>
);