import React from "react";
import { redirectTo } from "@reach/router";
import Header from "../Components/Layouts/Header";

function ValidateLogin(Child) {
  return function validateLogin(props) {
    const auth = JSON.parse(localStorage.getItem("auth"));

    if (auth.token) {
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
