import { combineReducers } from "redux";

import AuthReducer from "./Auth";
import CountryReducer from "./Country";
import BookReducer from "./Book";

export default combineReducers({
  auth: AuthReducer,
  country: CountryReducer,
  book: BookReducer,
});
