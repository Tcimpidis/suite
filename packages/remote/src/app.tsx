import { FC, useEffect } from "react";
import { Outlet, RouterProvider, createHashRouter, useLocation, useNavigate } from "react-router-dom";
import { MicrofrontendHostPathUpdateEvent, MicrofrontendReactAppProps, MicrofrontendRemoteRootProps } from '@suite/react-microfrontend/';

import { HOST_APP_ROUTE_PATH_CHANGE_EVENT} from "./constants";
import { routes } from "./routes";

declare global {
  interface WindowEventMap {
    [HOST_APP_ROUTE_PATH_CHANGE_EVENT]: CustomEvent<MicrofrontendHostPathUpdateEvent>;
  }
}

const Root: FC<MicrofrontendRemoteRootProps> = ({
  onNavigate,
  basename
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const hostAppRouteUpdateEventListener = 
      (event: CustomEvent<MicrofrontendHostPathUpdateEvent>) => {
        const newRoute = event.detail.path.replace(basename, "");
        if(location.pathname !== newRoute) {
          if(!newRoute) {
            navigate("/")
          } else {
            navigate(newRoute);
          }
        }
      }
    
    window.addEventListener(
      HOST_APP_ROUTE_PATH_CHANGE_EVENT,
      hostAppRouteUpdateEventListener
    );
    return () => {
      window.removeEventListener(
        HOST_APP_ROUTE_PATH_CHANGE_EVENT,
        hostAppRouteUpdateEventListener
      )
    }
  },[basename, location, navigate]);

  useEffect(() => {
    if(onNavigate) {
      onNavigate(location.pathname);
    }
  },[onNavigate, location]);

  return <Outlet />
}
const createRouter = (basename: string, onNavigate?: (pathname: string) => void) => {
  return createHashRouter([
    {
      path: '/',
      element: <Root basename={basename} onNavigate={onNavigate} />,
      children: routes,
    }
  ],{basename})
}
export const App: FC<MicrofrontendReactAppProps> = ({
  appPath,
  onNavigate
}) => {
  const path = appPath ? appPath : "/";
  const router = createRouter(path, onNavigate);

  return <RouterProvider router={router} />
}