import styled from "styled-components";

export const StoryDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	min-height: 10rem;
	margin-bottom: 1.5rem;
	width: 100%;
	text-align: center;
	border: 5px solid;
	padding: 1.5rem 1rem 1rem 1rem;
	border-width: 4px;
	border-image-slice: 1;
	border-image-source: linear-gradient(to right, yellow, orange);
	* {
		color: white;
	}
`;

export const StoryHeader = styled.div`
	display: flex;
	flex-direction: column;
`;

export const StorySubHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 1rem;
`;

export const StoryFooter = styled.div`
	display: flex;
	justify-content: space-evenly;
	button {
		margin: 1.5rem 0 0 0;
		padding: 0.6rem;
		border: 1px solid #a5d8f3;
		border-radius: 30px;
		width: 10rem;
		text-align: center;
		background-color: #a5d8f3;
		color: #560a86;
		&:focus {
			outline: none;
			border-color: #a5d8f3;
			border: 2px solid #a5d8f3;
			color: black;
			-webkit-box-shadow: none;
			box-shadow: none;
			background-color: #a5d8f3f2;
		}
		&:hover {
			transition: 0.7s;
			color: #a5d8f3;
			background-color: transparent;
		}
	}
`;

export const StoryTitle = styled.h3``;

export const StoryDate = styled.h6``;

export const StoryCategory = styled.h6``;

export const StoryClaps = styled.div`
	display: flex;
	justify-content: center;
`;
