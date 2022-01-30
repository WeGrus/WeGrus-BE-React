import { createStore } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import AccessTokenReducer from "./reducer/AccessTokenReducer";
import { combineReducers } from "redux";

const SET_ID = "SET_ID";
const SET_EMAIL = "SET_EMAIL";
const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const DELETE_TOKEN = "DELETE_TOKEN";
const GET_USER_INFO = "GET_USER_INFO";

const initialState = {
  authenticated: false,
  id: null,
  academicStatus: null,
  department: null,
  email: null,
  studentId: null,
  grade: null,
  name: null,
  phone: null,
  userId: null,
  token: null,
  createdDate: null,
  introduce: null,
  imageUrl:
    "https://igrus-webservice-bucket.s3.ap-northeast-2.amazonaws.com/basic.jpeg",
  roles: null,
};

const setKakaoId = (userId) => {
  return {
    type: SET_ID,
    userId,
  };
};
const setEmail = (email) => {
  return {
    type: SET_EMAIL,
    email,
  };
};
const userSignUp = (academicStatus, department, grade, name, phone) => {
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

const loginSuccess = (token) => {
  return { type: LOGIN_SUCCESS, result: true, token };
};

const getUserInfo = (
  id,
  email,
  name,
  studentId,
  department,
  grade,
  phone,
  createdDate,
  introduce,
  imageUrl,
  academicStatus,
  roles
) => {
  return {
    type: GET_USER_INFO,
    id,
    email,
    name,
    studentId,
    department,
    grade,
    phone,
    createdDate,
    introduce,
    imageUrl,
    academicStatus,
    roles,
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
        userId: action.userId,
      };
    case SET_EMAIL:
      return {
        ...state,
        authenticated: action.result,
        email: action.email,
      };
    case LOGIN:
      return {
        ...state,
        authenticated: action.result,
        academicStatus: action.academicStatus,
        department: action.department,
        grade: action.grade,
        name: action.name,
        phone: action.phone,
      };
    case LOGIN_SUCCESS:
      return { ...state, authenticated: action.result, token: action.token };
    case GET_USER_INFO:
      return {
        ...state,
        id: action.id,
        email: action.email,
        name: action.name,
        studentId: action.studentId,
        department: action.department,
        grade: action.grade,
        phone: action.phone,
        createdDate: action.createdDate,
        introduce: action.introduce,
        imageUrl: action.imageUrl,
        academicStatus: action.academicStatus,
        roles: action.roles,
      };
    case DELETE_TOKEN:
      return { ...state, token: null, authenticated: false };
    default:
      return state;
  }
};

const setToken = (token) => {
  //token값을 받기위해서 만든 액션
  return {
    type: "SET",
    token,
  };
};

const tokenReducer = (state = "", action) => {
  // 토큰값을 받기위한 리듀서.
  switch (action.type) {
    case "SET":
      return action.token;
    default:
      return state;
  }
};

const combinestore = combineReducers({
  // combineReducers로 복수의 Reducer 사용 가능.
  userReducer,
  tokenReducer,
});

const store = createStore(combinestore); // store 생성

export const actionCreators = {
  setKakaoId,
  setEmail,
  userSignUp,
  loginSuccess,
  getUserInfo,
  logOutUser,
  setToken,
};

export default store;

// export const Token = configureStore({
//   reducer: {
//     AccessToken: AccessTokenReducer,
//   },
// });
