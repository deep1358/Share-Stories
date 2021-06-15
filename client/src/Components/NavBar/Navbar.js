import React, { useState } from "react";
import styled from "styled-components";
import HamBurger from "./HamBurger";
import logo from "./Share Stories Logo.png";

const Nav = styled.nav`
	width: 100%;
	height: 10vh;
	padding: 0 20px;
	display: flex;
	justify-content: space-between;
	position: fixed;
	z-index: 103;
	-webkit-box-shadow: 0px 8px 5px 0px rgba(50, 50, 50, 0.29);
	-moz-box-shadow: 0px 8px 5px 0px rgba(50, 50, 50, 0.29);
	box-shadow: 0px 2px 5px 0px rgba(50, 50, 50, 0.29);
	.logo {
		display: flex;
		align-items: center;
		font-size: 32px;
		color: black;
		font-family: "Lobster", cursive;
		z-index: 100;
	}
`;

function Navbar({ color }) {
	return (
		<Nav style={{ backgroundColor: color }}>
			<div className="logo">
				<img src={logo} alt="share-stories-logo"></img>
			</div>
			<HamBurger />
		</Nav>
	);
}

export default Navbar;
