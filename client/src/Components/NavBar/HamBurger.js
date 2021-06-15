import React, { useState } from "react";
import styled from "styled-components";
import HamBurgerNav from "./HamBurgerNav";

const StyleBurger = styled.div`
	width: 2rem;
	height: 2rem;
	position: fixed;
	top: 15px;
	right: 20px;
	z-index: 104;
	display: none;
	@media (max-width: 768px) {
		display: flex;
		justify-content: space-around;
		flex-flow: column nowrap;
		z-index: 104;
	}
	div {
		z-index: 104;
		width: 2rem;
		height: 0.25rem;
		background-color: ${({ open }) => (open ? "#7122fa" : "#33135c")};
		border-radius: 10px;
		transform-origin: 1px;
		transition: all 0.3s linear;

		&:nth-child(1) {
			width: ${({ open }) => (open ? "100%" : "70%")};
			transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0deg)")};
		}
		&:nth-child(2) {
			transform: ${({ open }) => (open ? "translateX(100%)" : "translateX(0)")};
			opacity: ${({ open }) => (open ? 0 : 1)};
		}
		&:nth-child(3) {
			width: ${({ open }) => (open ? "100%" : "70%")};
			transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0deg)")};
		}
	}
`;

function HamBurger() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<StyleBurger open={open} onClick={() => setOpen(!open)}>
				<div />
				<div />
				<div />
			</StyleBurger>
			<HamBurgerNav open={open} setOpen={setOpen} />
		</>
	);
}

export default HamBurger;
