import axios from "axios";
import React, { useEffect } from "react";

const OAuth = () => {
  let code1 = new URL(window.location.href).searchParams.get("code");
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
        console.log(res.data["access_token"]);
      });
  }, []);

  return <div>redirect...</div>;
};

export default OAuth;
