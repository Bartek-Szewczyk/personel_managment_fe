import React from "react";
import {
  ConfirmWrapper,
  ConfirmTitle,
  ConfirmButtonWrapper,
} from "./styleConfirm";

const Confirm = ({ title, yesButtonHandler, noButtonHandler }) => {
  return (
    <ConfirmWrapper>
      <ConfirmTitle>{title}</ConfirmTitle>
      <ConfirmButtonWrapper>
        <button onClick={() => yesButtonHandler()}>Tak</button>
        <button onClick={() => noButtonHandler()}>Nie</button>
      </ConfirmButtonWrapper>
    </ConfirmWrapper>
  );
};
export default Confirm;
