import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { Component as Root } from "./pages/Root";
import { Component as Result } from "./pages/Result";
import { resultAction, resultLoader, rootLoader } from "./pages/loaders";
import { ErrorBoundary } from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    loader: rootLoader,
    children: [
      {
        ErrorBoundary: ErrorBoundary,
        children: [
          {
            index: true,
            Component: Result,
            loader: resultLoader,
            action: resultAction,
            shouldRevalidate: () => {
              return false;
            },
          },
          {
            path: "/favorites",
            Component: Result,
            loader: resultLoader,
            action: resultAction,
            shouldRevalidate: () => {
              return false;
            },
          },
          {
            path: "*",
            loader: () => redirect("/"),
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
