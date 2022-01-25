import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionCreators } from "../../store";
import { isEmailAuth } from "../../variables";

function mapStateToProps(state) {
  return state;
}
function mapDispatchToProps(dispatch) {
  return {
    logInUser: (token) => dispatch(actionCreators.logInUser(token)),
  };
}

function OAuth(props) {
  let navigate = useNavigate();
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
          props.logInUser(ACCESS_TOKEN);
          if (!isEmailAuth) {
            navigate("/login/email-auth");
          } else {
            navigate("/");
          }
        } else {
          props.logOutUser(ACCESS_TOKEN);
        }
      });
  }, []);

  return <div>redirecting...</div>;
}

export default connect(mapStateToProps, mapDispatchToProps)(OAuth);
