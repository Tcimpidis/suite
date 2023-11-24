import { Outlet, RouteObject } from "react-router-dom";
import { microfrontends } from "./microfrontend";
import { MicrofrontendWrapper } from "@suite/react-microfrontend/";

const microfrontendRoutes = microfrontends.map(
	(microfrontend) => {
		let children: RouteObject[] | undefined = undefined;
		if(microfrontend.children) {
			children = microfrontend.children[0].children;
		}

		return{
			element: <Outlet />,
			children: [
				{
					path: microfrontend.path,
					element: <MicrofrontendWrapper microfrontend={microfrontend} />,
					children
				}
			]
		}
	}
)

export const routes = [
	{
		element: <Outlet />,
		children: [
			{
				index: true,
				element: <span>Host app</span>,
			}
		]
	},
	...microfrontendRoutes,
];