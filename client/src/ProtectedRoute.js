import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";

export const ProtectedRoute = ({ render: Render, ...rest }) => {
	const authContext = useContext(AuthContext);
	return (
		<Route
			{...rest}
			render={props => {
				if (authContext.isAuthenticated) {
					return <Render {...props} />;
				} else {
					return (
						<Redirect
							to={{
								pathname: "/signin",
								state: {
									from: props.location,
								},
							}}
						/>
					);
				}
			}}
		/>
	);
};

// if (
//   props.location.pathname === "/signin" ||
//   props.location.pathname === "/register"
// ) {
//   console.log("Hello World");
//   return (
//     <Redirect
//       to={{
//         pathname: "/",
//         state: {
//           from: props.location,
//         },
//       }}
//     />
//   );
//}
