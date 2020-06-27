import React from "react";
import { redirectTo } from "@reach/router";
import Header from "../Components/Layouts/Header";

function ValidateLogin(Child) {
  return function validateLogin(props) {
    const token = localStorage.getItem("auth");

    if (token) {
      return (
        <div>
          <Header display>
            <Child />
          </Header>
        </div>
      );
    } else {
      return redirectTo("/login");
    }
  };
}
export default ValidateLogin;
