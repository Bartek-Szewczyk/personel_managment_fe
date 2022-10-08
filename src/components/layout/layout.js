import React from "react";
import {
  LayoutWrapper,
  TitleContainer,
  Title,
  ButtonWrapper,
  Button,
  ContentContainer,
  QuestionImg,
} from "./styleLayout.js";
import { Link } from "react-router-dom";

function Layout({ title, buttonText, buttonAction, children }) {
  const buttonHandler = () => buttonAction();
  return (
    <LayoutWrapper>
      <TitleContainer>
        <Title>{title}</Title>
        {buttonText && (
          <ButtonWrapper>
            <Button onClick={buttonHandler}>{buttonText}</Button>
          </ButtonWrapper>
        )}
      </TitleContainer>
      <ContentContainer>{children}</ContentContainer>
      <Link to="/faq">
        <QuestionImg />
      </Link>
    </LayoutWrapper>
  );
}

export default Layout;
