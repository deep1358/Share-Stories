/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import Navbar from "./Components/NavBar/Navbar";
import HomePage from "./Components/Home/HomePage";
import AboutUsPage from "./Components/AboutUs/AboutUsPage";
import SigninPage from "./Components/Signin/SigninPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RegisterPage from "./Components/Signin/RegisterPage";
import StoriesPage from "./Components/Stories/StoriesPage";
import Dashboard from "./Components/CreateStory/Dashboard";
import MyStory from "./Components/MyStory/MyStory";
import "./App.css";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import { ProtectedRoute } from "./ProtectedRoute";
import Profile from "./Components/Profile/Profile";
import ExplorePage from "./Components/Explore/ExplorePage";

function App() {
	return (
		<div className="app">
			<Router>
				<Switch>
					<Route exact path="/">
						<Navbar color="transparent" />
						<HomePage />
					</Route>
					<Route exact path="/stories">
						<Navbar color="white" />
						<ExplorePage />
					</Route>
					<Route exact path="/about">
						<Navbar color="white" />
						<AboutUsPage />
					</Route>
					<ProtectedRoute
						exact
						path="/createstory"
						render={props => (
							<>
								<Navbar color="white" />
								<Dashboard />
							</>
						)}
					/>
					<ProtectedRoute
						exact
						path="/profile"
						render={props => (
							<>
								<Navbar color="white" />
								<Profile />
							</>
						)}
					/>
					<ProtectedRoute
						exact
						path="/mystories"
						render={props => (
							<>
								<Navbar color="white" />
								<StoriesPage />
							</>
						)}
					/>
					<Route
						exact
						path="/signin"
						render={props => (
							<>
								<Navbar color="transparent" />
								<SigninPage />
							</>
						)}></Route>
					<Route
						exact
						path="/register"
						render={props => (
							<>
								<Navbar color="transparent" />
								<RegisterPage />
							</>
						)}></Route>
					<Route exact path="/:id">
						<Navbar color="white" />
						<MyStory />
					</Route>

					<Route path="*" component={PageNotFound} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
