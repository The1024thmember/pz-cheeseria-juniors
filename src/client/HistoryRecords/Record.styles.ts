import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  font-family: Arial, Helvetica, sans-serif;
  border-left: 2px solid black;
  box-shadow: 0px 5px;
  border-radius: 20px;
  width: 90%;
  padding: 20px;
  margin-top: 60px;

  .thumbnail {
    object-fit: cover;
    border-radius: 5px;
    width: 80%;
    height: 100%;
  };

  .Amount {
    border-left: 1px solid lightgray;
    text-align: center;
  };

  .Summary {
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
    border-top: 1px solid black;
    h5 {
        line-height: 5px;
    }
    Button {
        background-color: black;
        color: white;
        font-weight: bold;
        height:80%;
        margin-top: 1rem;
      }
  };

  .Detail {
        margin-top: 10px;
        display:flex;
        flex-direction: row;
        div {
            flex: 1;
        }
  }
  
`;
