import { createStore } from "@reduxjs/toolkit";
import { initialState } from "./variables";

const SET_ID = "SET_ID";
const SET_EMAIL = "SET_EMAIL";
const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const DELETE_TOKEN = "DELETE_TOKEN";

export const setKakaoId = (
  //academicStatus,
  //department,
  //email,
  //grade,
  //name,
  //phone,
  userId
  //token
) => {
  return {
    type: SET_ID,
    userId,
  };
};
export const setEmail = (email) => {
  return {
    type: SET_EMAIL,
    email,
  };
};
export const logUserIn = (
  academicStatus,
  department,
  //email,
  grade,
  name,
  phone
  //userId
) => {
  return {
    type: LOGIN,
    result: true,
    academicStatus,
    department,
    grade,
    name,
    phone,
  };
};

export const loginSuccess = () => {
  return { type: LOGIN_SUCCESS, result: true };
};

export const logOutUser = () => {
  return {
    type: DELETE_TOKEN,
    token: null,
    result: false,
  };
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ID:
      return {
        ...state,
        authenticated: action.result,
        //academicStatus: action.academicStatus,
        //department: action.department,
        //email: action.email,
        //grade: action.grade,
        //name: action.name,
        //phone: action.phone,
        userId: action.userId,
        //token: action.token,
      };
    case SET_EMAIL:
      return {
        ...state,
        authenticated: action.result,
        //academicStatus: action.academicStatus,
        //department: action.department,
        email: action.email,
        //grade: action.grade,
        //name: action.name,
        //phone: action.phone,
        //userId: action.userId,
        //token: action.token,
      };
    case LOGIN:
      return {
        ...state,
        authenticated: action.result,
        academicStatus: action.academicStatus,
        department: action.department,
        //email: action.email,
        grade: action.grade,
        name: action.name,
        phone: action.phone,
        //userId: action.userId,
        //token: action.token,
      };
    case LOGIN_SUCCESS:
      return { ...state, authenticated: action.result };
    case DELETE_TOKEN:
      return { ...state, token: null, authenticated: false };
    default:
      return state;
  }
};

const store = createStore(userReducer);

export const actionCreators = {
  setKakaoId,
  setEmail,
  logUserIn,
  loginSuccess,
  logOutUser,
};

export default store;
