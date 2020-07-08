import React from "react";
import { Router } from "@reach/router";
import NotFound from "./Pages/404";
import WriterHome from "./Pages/WriterHome";
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import SuccessPage from "./Components/SuccessfullPage";
import AddBook from "./Pages/AddBook";
import UpdateBook from "./Pages/UpdateBook";
import Dashboard from "./Pages/Dashboard";
import UserProfile from "./Pages/Profile";
import BookDetails from "./Pages/BookDetails";
import Library from "./Pages/Library";
import ManageBooks from "./Pages/Managebooks";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import Plans from "./Pages/Plans";

import { isLoggedin } from "./Services/auth";
import UpdateProfile from "./Pages/UpdateProfile";

function App() {
  return (
    <Router>
      <Login exact path="/login" />
      <Signup exact path="/signup" />
      <SuccessPage exact path="/success" />
      <UserProfile exact path="/user/profile/:userId" />
      <ForgotPassword exact path="/forgotpassword" />
      <ResetPassword exact path="/resetpassword/:token" />
      <UpdateProfile exact path="/profile/update/:userId" />

      <BookDetails exact path="/book/:bookId" />
      <Library exact path="/library" />
      <Dashboard exact path="/" />
      <WriterHome exact path="/writer" />

      <ManageBooks exact path="/books/:userId" />
      <AddBook exact path="/book/add" />
      <UpdateBook exact path="/book/update/:bookId" />
      <Plans exact path="/plans" />

      <NotFound default />
    </Router>
  );
}

export default App;
