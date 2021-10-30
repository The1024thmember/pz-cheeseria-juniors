import styled from 'styled-components';

export const Wrapper = styled.aside`
  font-family: Arial, Helvetica, sans-serif;
  min-width: 400px;
  width: 35vw;
  padding: 20px;

  .checkOut {
    margin-top: 1rem;
    display: flex;
    flex-direction:row;
    justify-content:space-between;
    Button {
      background-color: black;
      color: white;
      font-weight: bold;
      height: 3rem;
      margin-top: 0.5rem;
    }
  }
`;
