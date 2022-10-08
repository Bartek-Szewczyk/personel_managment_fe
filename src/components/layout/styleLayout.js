import styled from "styled-components";
import { color } from "../../theme/globalStyle";
import questionIcon from "../../assets/questionIcon.svg";

export const LayoutWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const TitleContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  padding-left: 5%;
  padding-right: 5%;
  justify-content: space-between;
`;
export const Title = styled.h1``;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Button = styled.button`
  min-width: 200px;
  padding: 10px;
  font-size: 20px;
  border: 1px solid;
  border-radius: 4px;
  height: 54px;
  background-color: ${color.primary};
  border: none;
  color: #ffffff;
  cursor: pointer;
  &:hover {
    background-color: ${color.primaryHover};
  }
`;
export const ContentContainer = styled.div`
  margin: 0 5% 100px 5%;
`;
export const QuestionImg = styled.img.attrs((attrs) => ({
  src: questionIcon,
}))`
  width: 60px;
  right: 15px;
  bottom: 15px;
  position: fixed;
`;
