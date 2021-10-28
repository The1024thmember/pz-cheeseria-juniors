import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  height: 100%;

  img {
    object-fit: cover;
    border-radius: 3px;
    width: 80%;
  }

  .title {
    display: flex;
    justify-content: center;
    min-height: 5rem;
  }

  .innerContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0.5rem 1rem 1rem 1rem;
    div {
      flex: 5;
      text-align: center;
      margin: 0.5rem;
    }
  }

  .category {
    color: rgb(110,110,110);
    font-weight: lighter;
  }

  .description {
    max-height: 12rem;
    overflow-y: hidden;
    p {
      text-align: left;
    }
    : hover {
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
    }

    color: rgb(110,110,110);
    font-weight: lighter;
    font-size:medium;
  }

  .price {
    text-align: left;
    letter-spacing: 2px;
  }

  .itemCounter {
    margin-top: -1rem;
    display: flex;
    flex-direction: row;  
  }

  .footer {
    margin: 1rem 2rem 2rem 2rem;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    border-top: 1px lightgray solid;

    button {
      margin-top: 1rem;
    }
  }

  
`;
