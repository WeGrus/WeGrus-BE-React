import { createStore } from "@reduxjs/toolkit";
import { initialState } from "./variables";

const SET_TOKEN = "SET_TOKEN";
const DELETE_TOKEN = "DELETE_TOKEN";

export const logInUser = (token) => {
  return {
    type: "SET_TOKEN",
    token,
    result: true,
  };
};

export const logOutUser = () => {
  return {
    type: "SET_TOKEN",
    token: null,
    result: false,
  };
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
        authenticated: action.result,
      };
    case DELETE_TOKEN:
      return { ...state, token: null, authenticated: false };
    default:
      return state;
  }
};

const store = createStore(userReducer);

export const actionCreators = {
  logInUser,
  logOutUser,
};

export default store;
