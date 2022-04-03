import { combineReducers, createStore } from "redux";
import { LoginReducer } from "./FBLogin/FBLogin.reducer";

const redux = require("redux");
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk").default;

export const store = createStore(
  combineReducers({
    LoginReducer,
  }),
  applyMiddleware(thunkMiddleware)
);
