import { createBrowserRouter, RouterProvider } from "react-router-dom";
import * as Root from "./routes/root";
import * as User from "./routes/user";
import * as ComponentRoot from "../component-based/components/root.tsx";
import * as ComponentUser from "../component-based/components/user.tsx";

export function DataApiApp() {
  const router = createBrowserRouter([
    {
      path: "/data-api",
      Component: Root.Component,
      loader: Root.loader,
      children: [
        {
          path: "users/:userId",
          Component: User.Component,
          loader: User.loader,
          action: User.action,
        },
      ],
    },
    {
      path: "/component-based",
      Component: ComponentRoot.Component,
      children: [
        {
          path: "users/:userId",
          Component: ComponentUser.Component,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}