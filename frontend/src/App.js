import React from "react";
import { Router } from "@reach/router";
import NotFound from "./Pages/404";
import Home from "./Pages/Home";
import WriterHome from "./Pages/WriterHome";
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import SuccessPage from "./Components/SuccessfullPage";
import AddBook from "./Pages/AddBook";

function App() {
  return (
    <Router>
      <Home exact path="/" />
      <Login exact path="/login" />
      <Signup exact path="/signup" />
      <SuccessPage exact path="/success" />
      <AddBook exact path="/addbook" />
      <WriterHome exact path="/writer" />
      <NotFound default />
    </Router>
  );
}

export default App;
