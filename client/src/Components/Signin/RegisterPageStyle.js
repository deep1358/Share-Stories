import styled from "styled-components";

export const SignInContainer = styled.div`
  height: 100vh;
  width: 100%;
  background-image: linear-gradient(to right, #560a86, #7122fa);
  position: absolute;
  top: 0;
  z-index: -10;
`;

export const SignInFormDiv = styled.div`
  margin: 0 auto;
  max-width: 500px;
  height: 90vh;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const SignInFormTitle = styled.h3`
  text-align: center;
  padding: 0.4rem;
  margin-bottom: 0.5rem;
  color: #a5d8f3;
`;

export const SignInFormLabel = styled.div`
  font-size: 24px;
  padding: 0.1rem 0;
  color: #a5d8f3;
`;

export const SignInFormInputFeild = styled.input`
  border: 1px solid #a5d8f3;
  border-radius: 10px;
  background-color: transparent;
  color: #a5d8f3;

  &:focus {
    outline: none;
    border-color: #a5d8f3;
    border: 2px solid #a5d8f3;
    color: black;
    -webkit-box-shadow: none;
    box-shadow: none;
    background-color: #a5d8f3f2;
  }

  &::placeholder {
    color: #a5d8f3;
  }
`;

export const SignInFormButton = styled.button`
  margin: 1rem auto 0rem auto;
  min-width: 12rem;
  border: 1px solid #a5d8f3;
  border-radius: 20px;
  display: flex;
  justify-content: space-evenly;
  padding: 0.4rem 1rem;
  background-color: transparent;
  color: #a5d8f3;

  &:hover {
    transition: 0.7s;
    color: black;
    background-color: #a5d8f3;
  }

  &:focus {
    outline: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
`;

export const SignInFormBottomNavigator = styled.div`
  display: flex;
  justify-content: space-evenly;
  p {
    margin: 1rem 0rem;
    font-size: 20px;
    color: #a5d8f3;
  }
  button {
    min-width: 8rem;
    border: 1px solid #a5d8f3;
    border-radius: 20px;
    display: flex;
    margin: 10px 0;
    justify-content: center;
    align-items: center;
    background-color: #a5d8f3;
    color: black;
    &:hover {
      transition: 0.7s;
      color: #a5d8f3;
      background-color: transparent;
    }
    &:focus {
      outline: none;
      -webkit-box-shadow: none;
      box-shadow: none;
    }
  }
`;
