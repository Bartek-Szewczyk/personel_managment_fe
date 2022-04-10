import styled from "styled-components";
import { color } from "../../theme/globalStyle";

export const ConfirmWrapper = styled.div`
  margin: 30px;
  margin-top: 50px;
`;
export const ConfirmTitle = styled.h3``;
export const ConfirmButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 20px auto 10px;
  button {
    width: 100px;
    height: 44px;
    background-color: ${color.primary};
    border: none;
    border-radius: 3px;
    color: #ffffff;
    cursor: pointer;
    margin: 0 auto;
    margin-top: 30px;
    font-size: 18px;

    &:hover {
      background-color: ${color.primaryHover};
    }
  }
`;
