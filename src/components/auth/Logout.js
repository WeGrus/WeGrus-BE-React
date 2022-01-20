import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { initialState } from "../../variables";

const LogOut = () => {
  useEffect(() => {
    let params = new URL(document.location.toString()).searchParams;
    let code = params.get("code"); // 인가코드 받는 부분
    let grant_type = "authorization_code";
    let client_id = "65cd2fc55aec40658e2efbc951d47164";

    axios
      .post(
        `https://kauth.kakao.com/v1/user/login?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=http://localhost:3000/oauth/kakao/callback&code=${code}`,
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((res) => {
        const loginResult = res.data;
        console.log(loginResult);
      });
  }, []);

  return <div>redirect...</div>;
};

export default LogOut;
