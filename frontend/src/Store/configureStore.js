import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./Reducers/index";
import thunk from "redux-thunk";

function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

export default compose(applyMiddleware(thunk))(configureStore);
