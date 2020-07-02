import React from "react";
import { redirectTo } from "@reach/router";
import Header from "../Components/Layouts/Header";
import { isLoggedin } from "../Services/auth";

function ValidateLogin(Child) {
  return function validateLogin(props) {

    if (isLoggedin() && isLoggedin().token) {
      return (
        <div>
          <Header display>
            <Child {...props} />
          </Header>
        </div>
      );
    } else {
      return redirectTo("/login");
    }
  };
}
export default ValidateLogin;
