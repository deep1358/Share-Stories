import React, { createContext, useState, useEffect } from "react";
import Loader from "../Components/Loader/Loader";
import AuthService from "../Services/AuthService";

export const AuthContext = createContext();

export default function ({ children }) {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);

	const [done, setDone] = useState(false);

	useEffect(() => {
		AuthService.isAuthenticated().then(data => {
			setUser(data.user);
			setIsAuthenticated(data.isAuthenticated);
			setIsLoaded(true);
		});
	}, []);

	return (
		<div>
			{!isLoaded ? (
				<Loader />
			) : (
				<AuthContext.Provider
					value={{
						user,
						setUser,
						isAuthenticated,
						setIsAuthenticated,
						done,
						setDone,
					}}>
					{children}
				</AuthContext.Provider>
			)}
		</div>
	);
}
