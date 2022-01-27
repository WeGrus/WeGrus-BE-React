import { createStore } from "@reduxjs/toolkit";
import { initialState } from "./variables";
import { configureStore } from '@reduxjs/toolkit';
import AccessTokenReducer from './reducer/AccessTokenReducer'
import { combineReducers } from 'redux'

const SET_ID = "SET_ID";
const SET_EMAIL = "SET_EMAIL";
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
    case DELETE_TOKEN:
      return { ...state, token: null, authenticated: false };
    default:
      return state;
  }
};

export const setToken = (token) => { //token값을 받기위해서 만든 액션
  return {
    type: "SET",
    token
  }
}

const tokenReducer = (state = "", action) => { // 토큰값을 받기위한 리듀서.
  switch(action.type){
    case "SET":
      return action.token;
    default:
      return state
  }
}

//const store = createStore(userReducer);

const combinestore = combineReducers({ // combineReducers로 복수의 Reducer 사용 가능.
  userReducer,
  tokenReducer,
})

const store = createStore(combinestore) // store 생성

export const actionCreators = {
  setKakaoId,
  setEmail,
  logOutUser,
  setToken
};



export default store;

// export const Token = configureStore({
//   reducer: {
//     AccessToken: AccessTokenReducer,
//   },
// });