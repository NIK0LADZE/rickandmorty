import { combineReducers, createStore } from "redux";
import { LoginReducer } from "./FBLogin/FBLogin.reducer";
import { LikedCharactersReducer } from "./LikedCharacters/LikedCharacters.reducer";

const redux = require("redux");
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk").default;

export const store = createStore(
  combineReducers({
    LoginReducer,
    LikedCharactersReducer,
  }),
  applyMiddleware(thunkMiddleware)
);
