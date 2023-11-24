import React from "react";
import ReactDOM from "react-dom/client";
import { v4 as uuidv4 } from 'uuid';
import { MicrofrontendHostPathUpdateEvent, MicrofrontendRemote } from "@suite/react-microfrontend/";

import { App} from "./app";
import { HOST_APP_ROUTE_PATH_CHANGE_EVENT } from "./constants";

let root: ReactDOM.Root;

export const renderRemote = (
  {containerId, onNavigate, path}: MicrofrontendRemote
) => {
  root = ReactDOM.createRoot(
    document.getElementById(containerId as string) as HTMLElement
  );

  root.render((
    <React.StrictMode>
      <App 
        appPath={path}
        onNavigate={onNavigate}
      />
    </React.StrictMode>
  ));

  return {
    onParentNavigate(pathname: string) {
      const hostRoutePathChangeEvent = new CustomEvent<MicrofrontendHostPathUpdateEvent>(
        HOST_APP_ROUTE_PATH_CHANGE_EVENT,
        {
          detail: {
            event_id: `${containerId}_${uuidv4()}}`,
            path: pathname,
          }
        }
      );
      window.dispatchEvent(hostRoutePathChangeEvent);
    }
  }
};

export const dismountRemote = () => root.unmount();