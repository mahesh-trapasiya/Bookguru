import React from "react";
import { Router } from "@reach/router";
import NotFound from "./Pages/404";
import Home from "./Pages/Home";
import WriterHome from "./Pages/WriterHome";
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import SuccessPage from "./Components/SuccessfullPage";
import AddBook from "./Pages/AddBook";
import Dashboard from "./Pages/Dashboard";
import UserProfile from "./Pages/Profile";
import BookDetails from "./Pages/BookDetails";

function App() {
  return (
    <Router>
      <Dashboard exact path="/" />
      <Login exact path="/login" />
      <Signup exact path="/signup" />
      <SuccessPage exact path="/success" />
      <AddBook exact path="/addbook" />
      <WriterHome exact path="/writer" />
      <UserProfile exact path="/user/profile" />
      <BookDetails exact path="/book/id" />
      <NotFound default />
    </Router>
  );
}

export default App;
