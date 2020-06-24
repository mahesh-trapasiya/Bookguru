import React from "react";
import Header from "./Header";

function Layout(props) {
  return (
    <>
      <Header display />
      {props.children}
    </>
  );
}
