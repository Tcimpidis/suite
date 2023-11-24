import { renderRemote, dismountRemote } from 'microfrontend-remote/microfrontend';
import { routes } from 'microfrontend-remote/routes';
import { Microfrontend } from '@suite/react-microfrontend/';

export const microfrontends: Microfrontend[] = [
  {
    componentId:"remote-microfrontend",
    path:'/remote',
    children: routes,
    mountCallback: renderRemote,
    unmountCallback: dismountRemote,
  }
]