import axios from "axios";
import React, { createContext, useEffect, useReducer } from "react";
import { initialState } from "../../variables";

export function reducer(state, action) {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
        authenticated: action.result,
      };
    case "DELETE_TOKEN":
      return { ...state, token: null, authenticated: false };
    default:
      return state;
  }
}
function OAuth() {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state.authenticated);

  useEffect(() => {
    let params = new URL(document.location.toString()).searchParams;
    let code = params.get("code"); // 인가코드 받는 부분
    let grant_type = "authorization_code";
    let client_id = "65cd2fc55aec40658e2efbc951d47164";

    axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=http://localhost:3000/oauth/kakao/callback&code=${code}`,
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((res) => {
        let ACCESS_TOKEN = res.data.access_token;
        let REFRESH_TOKEN = res.data.refresh_token;

        if (ACCESS_TOKEN) {
          console.log("로그인 성공!");
          dispatch({
            type: "SET_TOKEN",
            token: ACCESS_TOKEN,
            result: true,
          });
        } else {
          console.log("로그인 실패");
          dispatch({
            type: "SET_TOKEN",
            token: null,
            result: false,
          });
        }
      });
  }, []);

  return <div>redirecting...</div>;
}

export const UserContext = createContext(null);

export default OAuth;
