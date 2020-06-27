import React from "react";
import { Router } from "@reach/router";
import NotFound from "./Pages/404";
import WriterHome from "./Pages/WriterHome";
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import SuccessPage from "./Components/SuccessfullPage";
import AddBook from "./Pages/AddBook";
import Dashboard from "./Pages/Dashboard";
import UserProfile from "./Pages/Profile";
import BookDetails from "./Pages/BookDetails";
import Library from "./Pages/Library";
import ManageBooks from "./Pages/Managebooks";

function App() {
  const auth = JSON.parse(localStorage.getItem("auth"));

  return (
    <Router>
      <Login exact path="/login" />
      <Signup exact path="/signup" />
      <SuccessPage exact path="/success" />
      {/* Readers Routes */}
      {/* {auth.role === "Reader" ? ( */}
      <>
        <AddBook exact path="/addbook" />
        <UserProfile exact path="/user/profile" />
        <BookDetails exact path="/book/id" />
        <Library exact path="/library" />
        <WriterHome exact path="/" />
        <ManageBooks exact path="/books/id" />
      </>
      {/* ) : null} */}

      {/* {auth.role == "Writer" ? <WriterHome exact path="/" /> : null} */}
      <NotFound default />
    </Router>
  );
}

export default App;
