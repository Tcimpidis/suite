import { FC } from "react";
import { Outlet, RouterProvider, createHashRouter } from "react-router-dom";
import { routes } from "./routes";

const createRouter = () => {
  return createHashRouter ([
    {
      path:'/', 
      element: <Outlet />,
      children: routes
    }
  ])
}

export const App: FC = () => {
  const router = createRouter();

  return <RouterProvider router={router} />
}