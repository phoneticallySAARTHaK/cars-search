import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { Component as Root } from "./pages/Root";
import { resultAction, resultLoader, rootLoader } from "./pages/loaders";
import { ErrorBoundary } from "./pages/Error";

const resultsRoute = {
  index: true,
  lazy() {
    return import("./pages/Result");
  },
  loader: resultLoader,
  action: resultAction,
} as const;

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    loader: rootLoader,
    children: [
      {
        ErrorBoundary: ErrorBoundary,
        children: [
          resultsRoute,
          {
            ...resultsRoute,
            index: false,
            path: "/favorites",
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
