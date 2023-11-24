import { MicrofrontendHostPathUpdateEvent } from "@suite/react-microfrontend/";
import {HOST_APP_ROUTE_PATH_CHANGE_EVENT} from "./constants";

declare global {
  interface WindowEventMap {
    [HOST_APP_ROUTE_PATH_CHANGE_EVENT]: CustomEvent<MicrofrontendHostPathUpdateEvent>;
  }
}
