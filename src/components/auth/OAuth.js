import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  actionCreators,
  loginSeccess,
  loginSuccess,
  logUserIn,
} from "../../store";
import { isEmailAuth } from "../../variables";
import { useSelector,useDispatch } from 'react-redux';
import {getter, selectAccessToken} from './../../reducer/AccessTokenReducer'


function mapStateToProps(state) {
  return state;
}
function mapDispatchToProps(dispatch) {
  return {

    setKakaoId: (kakaoId) => dispatch(actionCreators.setKakaoId(kakaoId)),

    loginSuccess: () => dispatch(actionCreators.loginSuccess()),

  };
}

function OAuth({ setKakaoId }) {
  let navigate = useNavigate();

  useEffect(() => {
    let params = new URL(document.location.toString()).searchParams;
    let code = params.get("code"); // 인가코드 받는 부분
    let grant_type = "authorization_code";
    let client_id = "65cd2fc55aec40658e2efbc951d47164";
    
    axios
      .post(
        /*
        `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=http://localhost:3000/oauth/kakao/callback&code=${code}`,
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      */
        `http://ec2-3-35-129-82.ap-northeast-2.compute.amazonaws.com:8080/signin?authorizationCode=${code}`
      )
      .then((res) => {
        /*
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
      */
        const USER_ID = res.data.data.userId;
        const RESULT = res.data.data.status;

        setKakaoId(USER_ID);
        console.log(USER_ID, RESULT);
        if (RESULT === "fail") {

          navigate("/login/email-auth");
        } else {
          console.log(res.data.data);

          props.setToken(res.data.data.accessToken)
          //console.log(res.data.data.accessToken);

          navigate("/");
          console.log("hi");
          loginSuccess();
        }
      });
  }, []);

  return <div>redirecting...</div>;
}

export default connect(mapStateToProps, mapDispatchToProps)(OAuth);
