import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import AuthService from "../../Services/AuthService";
import Avatar from "@material-ui/core/Avatar";

const Ul = styled.ul`
	font-family: "Lobster", cursive;
	margin: 0;
	z-index: 100;
	list-style: none;
	display: flex;
	flex-flow: row nowrap;
	a {
		text-decoration: none !important;
		border: none;
		color: black;
		margin: 0;
		display: flex;
		align-items: center;
	}
	li {
		margin: 0;
		padding: 18px 10px;
		color: black;
		&:hover {
			transition: 0.3s;
			color: #33135c;
			background-color: rgba(222, 222, 222, 1);
		}
	}
	@media (max-width: 768px) {
		padding-left: 0;
		text-align: center;
		flex-flow: column nowrap;
		background-color: #0d2538;
		position: fixed;
		transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
		top: 0;
		right: 0;
		height: 100vh;
		width: 300px;
		padding-top: 3.5rem;
		z-index: 100;
		transition: transform 0.3s ease-in-out;
		li {
			width: 100%;
			color: #ff9de6;
			&:hover {
				transition: 0.3s;
				color: #7122fa;
			}
		}
	}
`;

function HamBurgerNav({ open, setOpen }) {
	const { isAuthenticated, setIsAuthenticated, setUser } = useContext(
		AuthContext
	);

	const onClickLogoutHandler = () => {
		AuthService.logout().then(data => {
			if (data.success) {
				setOpen(!open);
				setUser(data.user);
				setIsAuthenticated(false);
			}
		});
	};

	if (!isAuthenticated)
		return (
			<Ul open={open}>
				<Link
					to="/"
					onClick={() => {
						setOpen(!open);
					}}>
					<li>Home</li>
				</Link>
				<Link
					to="/about"
					onClick={() => {
						setOpen(!open);
					}}>
					<li>About Us</li>
				</Link>
				<Link
					to="/signin"
					onClick={() => {
						setOpen(!open);
					}}>
					<li>Signin</li>
				</Link>
			</Ul>
		);
	else
		return (
			<Ul open={open}>
				<Link
					to="/"
					onClick={() => {
						setOpen(!open);
					}}>
					<li>Home</li>
				</Link>
				<Link
					to="/createstory"
					onClick={() => {
						setOpen(!open);
					}}>
					<li>WriteStory</li>
				</Link>
				<Link
					to="/about"
					onClick={() => {
						setOpen(!open);
					}}>
					<li>About Us</li>
				</Link>
				<Link
					to="/mystories"
					onClick={() => {
						setOpen(!open);
					}}>
					<li>My Stories</li>
				</Link>
				<Link to="" onClick={onClickLogoutHandler}>
					<li>Logout</li>
				</Link>
			</Ul>
		);
}

export default HamBurgerNav;
