import { createStore } from "@reduxjs/toolkit";
import { initialState } from "./variables";
import { configureStore } from '@reduxjs/toolkit';
import AccessTokenReducer from './reducer/AccessTokenReducer'
import { combineReducers } from 'redux'

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

export const setToken = (token) => {
  return {
    type: "SET",
    token
  }
}

const tokenReducer = (state = "", action) => {
  switch(action.type){
    case "SET":
      return action.token;
    default:
      return state
  }
}

//const store = createStore(userReducer);

const combinestore = combineReducers({
  userReducer,
  tokenReducer,
})

const store = createStore(combinestore)

export const actionCreators = {
  logInUser,
  logOutUser,
  setToken
};



export default store;

// export const Token = configureStore({
//   reducer: {
//     AccessToken: AccessTokenReducer,
//   },
// });