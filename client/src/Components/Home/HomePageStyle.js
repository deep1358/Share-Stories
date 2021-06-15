import styled from "styled-components";

export const HomePageDiv = styled.div`
	width: 100%;
	height: 90vh;
	background-image: linear-gradient(to right, #560a86, #7122fa);
	display: flex;
	justify-content: center;
	flex-direction: column;
`;

export const HomePageContainer = styled.div`
	display: flex;
	align-item: center;
	justify-content: center;
	width: 100%;
	height: 75vh;
	display: flex;
	flex-direction: space-between;
	color: white;
	background-color: rgba(21, 0, 156, 0.1);

	border-radius: 20px;
`;

export const HomePageDescription = styled.div`
	display: flex;
	flex: 0.5;
	flex-direction: column;
	justify-content: center;
`;

export const HomePageImages = styled.div`
	display: flex;
	flex: 0.5;
	flex-direction: column;
	justify-content: center;
`;
