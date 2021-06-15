import styled from "styled-components";

export const CreateStoryDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	min-height: 10rem;
	width: 100%;
	text-align: center;
	border: 5px solid;
	padding: 1.5rem 1rem 1rem 1rem;
	border-width: 4px;
	border-image-slice: 1;
	border-image-source: linear-gradient(to right, yellow, orange);
	button {
		margin: 1.5rem 0 0 0;
		padding: 0.6rem;
		border: 1px solid #a5d8f3;
		border-radius: 30px;
		width: 10rem;
		text-align: center;
		background-color: transparent;
		color: #a5d8f3;
		transition: all 0.5s ease-out;
		-moz-transition: all 0.5s ease-out;
		-webkit-transition: all 0.5s ease-out;
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
			color: purple;
			background-color: #a5d8f3;
		}
	}
`;

export const CreateStoryContainer = styled.div`
	min-height: 90vh;
	background-image: linear-gradient(to right, #560a86, #7122fa);
	padding-bottom: 4rem;
`;

export const CreateStoryTitle = styled.h3`
	// padding: 0.5rem;
	padding: 0.5rem 0 0.5rem 0;
	margin-bottom: 1.5rem;
	color: #f5f5f5;
	border-bottom: 5px solid;
	border-image-slice: 1;
	border-width: 4px;
	border-image-source: linear-gradient(to right, yellow, orange);
	width: fit-content;
`;

export const CreateStoryTitleLabel = styled.label`
	color: white;
	font-size: 20px;
	padding: 0px 1rem 0.6rem 1rem;
`;

export const CreateStoryTitleInput = styled.input`
	background-color: transparent;
	color: white;
	border: 1px solid white;
	border-radius: 10px;
	padding: 0.3rem;
	width: 20%;
	transition: width 0.35s ease-in-out;
	&:focus {
		outline: none;
		width: 30%;
	}
`;

export const CreateStoryCategorySelect = styled.select`
	margin-top: 1rem;
`;
