import { Outlet } from "react-router-dom";

export const routes = [
	{
		element: <Outlet />,
		children: [
			{
				index: true,
				element: <span>Child app</span>,
			}
		]
	}
];