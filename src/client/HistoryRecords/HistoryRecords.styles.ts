import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Arial, Helvetica, sans-serif;
  min-width: 400px;
  width: 35vw;
  height: 100%;
  padding: 20px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0.3rem;
  }
  ::-webkit-scrollbar-track {
    background: lightgray; 
  }
  ::-webkit-scrollbar-thumb {
    background: darkgray; 
  }
  .container {
    margin-top: -30px;
  }
`;
