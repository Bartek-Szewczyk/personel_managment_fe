import React from "react";
import {
  LayoutWrapper,
  TitleContainer,
  Title,
  ButtonWrapper,
  Button,
  ContentContainer,
} from "./styleLayout.js";

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
    </LayoutWrapper>
  );
}

export default Layout;
