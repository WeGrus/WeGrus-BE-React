import { createStore } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import AccessTokenReducer from "./reducer/AccessTokenReducer";
import { combineReducers } from "redux";

const SET_ID = "SET_ID";
const SET_EMAIL = "SET_EMAIL";
const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const DELETE_TOKEN = "DELETE_TOKEN";
const PUT_USER_INFO = "PUT_USER_INFO";

const initialState = {
  //userReducer의 기본값입니다.
  id: null,
  email: null,
  name: null,
  studentId: null,
  department: null,
  grade: null,
  phone: null,
  createdDate: null,
  introduce: null,
  imageUrl:
    "https://igrus-webservice-bucket.s3.ap-northeast-2.amazonaws.com/basic.jpeg",
  academicStatus: null,
  roles: null,
  authenticated: false,
  token: null,
  userId: null,
  gender: null,
};

const setKakaoId = (userId) => {
  //카카오 로그인 후 kakao_id를 다음 컴포넌트에 넘겨주는 액션 생성함수입니다.
  return {
    type: SET_ID,
    userId,
  };
};
const setEmail = (email) => {
  //이메일 인증 후 회원가입 시 이메일 정보를 signup 컴포넌트에 넘겨주기 위함
  return {
    type: SET_EMAIL,
    email,
  };
};
const userSignUp = (academicStatus, department, gender, grade, name, phone) => {
  //정보 입력 후 회원가입
  return {
    type: LOGIN,
    result: true,
    academicStatus,
    department,
    gender,
    grade,
    name,
    phone,
  };
};

const loginSuccess = (token) => {
  return { type: LOGIN_SUCCESS, result: true, token };
};

const putUserInfo = (
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
    type: PUT_USER_INFO,
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
        gender: action.gender,
        grade: action.grade,
        name: action.name,
        phone: action.phone,
      };
    case LOGIN_SUCCESS:
      return { ...state, authenticated: action.result, token: action.token };
    case PUT_USER_INFO:
      return {
        ...state,
        id: action.id,
        email: action.email,
        name: action.name,
        studentId: action.studentId,
        department: action.department,
        gender: action.gender,
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
  putUserInfo,
  logOutUser,
  setToken,
};

export default store;

// export const Token = configureStore({
//   reducer: {
//     AccessToken: AccessTokenReducer,
//   },
// });
