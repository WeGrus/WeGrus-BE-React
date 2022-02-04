import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Cookies from "universal-cookie";
import { actionCreators } from "../../store";

const Redirecting = styled.div`
  width: 100vh;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const cookies = new Cookies();

function setRefreshTokenToCookie(refresh_token) {
  cookies.set("refresh_token", refresh_token, { sameSite: "strict" });
}

function mapStateToProps(state) {
  return state;
}
function mapDispatchToProps(dispatch) {
  return {
    setKakaoId: (kakaoId, id) =>
      dispatch(actionCreators.setKakaoId(kakaoId, id)),
    setToken: (token) => dispatch(actionCreators.setToken(token)),
    loginSuccess: (token) => dispatch(actionCreators.loginSuccess(token)),
  };
}

function OAuth(props) {
  let navigate = useNavigate();

  useEffect(() => {
    let params = new URL(document.location.toString()).searchParams;
    let code = params.get("code"); // 인가코드 받는 부분
    //let grant_type = "authorization_code";
    //let client_id = "65cd2fc55aec40658e2efbc951d47164";

    axios.post(`/signin?authorizationCode=${code}`).then((res) => {
      const KAKAO_ID = res.data.data.userId;
      const RESULT = res.data.data.status;
      const USER_ID = res.data.data.member.id;
      console.log(res);
      props.setKakaoId(KAKAO_ID, USER_ID);

      console.log(KAKAO_ID, RESULT);
      if (RESULT === "fail") {
        navigate("/login/email-auth");
      } else if ("success") {
        const ACCESS_TOKEN = res.data.data.accessToken;
        props.loginSuccess(ACCESS_TOKEN);
        /*axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${ACCESS_TOKEN}`;*/

        //setRefreshTokenToCookie(ACCESS_TOKEN);

        navigate("/");
      } else {
        console.log("what the fuck are you doin'");
      }
    });
  }, []);

  return <Redirecting>redirecting...</Redirecting>;
}

export default connect(mapStateToProps, mapDispatchToProps)(OAuth);
