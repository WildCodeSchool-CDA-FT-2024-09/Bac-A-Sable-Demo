import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import Detail from "./pages/Detail.tsx";

import connexion from "./services/connexion.ts";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/detail/:id",
    element: <Detail />,
    loader: async ({ params }) => {
      const repos = await connexion.get(`/api/repos/${params.id}`);
      console.log("Loader", repos);
      return repos.data;
    },
  },
  {
    path: "/administrateur/detail/:id",
    element: <Detail />,
    loader: async ({ params }) => {
      const repos = await connexion.get(`/api/repos/${params.id}`);
      console.log("Loader", repos);
      return repos.data;
    },
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
