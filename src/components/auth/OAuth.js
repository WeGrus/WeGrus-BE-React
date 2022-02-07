import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Cookies from "universal-cookie/es6";
import { JWT_EXPIRY_TIME, onSilentRefresh } from "../../App";
import { actionCreators } from "../../store";

const Redirecting = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

const cookies = new Cookies();

const setRefreshTokenToCookie = (refresh_token) => {
  cookies.set("refresh_token", refresh_token, { sameSite: "strict" });
};

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

    axios
      .post(`/signin?authorizationCode=${code}`, {
        headers: {
          "Access-Control-Allow-Origin":
            "http://ec2-3-35-129-82.ap-northeast-2.compute.amazonaws.com:8080/", // 서버 domain
        },
        withCredentials: true,
      })
      .then((res) => {
        const KAKAO_ID = res.data.data.userId;
        const RESULT = res.data.data.status;

        console.log(KAKAO_ID);
        props.setKakaoId(KAKAO_ID);

        //console.log(KAKAO_ID, RESULT);
        if (RESULT === "fail") {
          navigate("/login/email-auth");
        } else if ("success") {
          const ACCESS_TOKEN = res.data.data.accessToken;
          props.loginSuccess(ACCESS_TOKEN);

          props.setToken(res.data.data.accessToken);

          var result = null;
          var cookie = document.cookie;
          const split_token = cookie.split("=");
          result = split_token[1]; //서버에서 쿠키로 전송한 refresh_token을 확인하는 코드입니다
          //sameSite - lax의 경우 다른 도메인간 쿠키 전송이 불가능 하기 때문에 sameSite none으로 설정하고 https를 통해 secure 설정을 하여 전송하거나 도메인을 통합해야 합니다.

          //setRefreshTokenToCookie(result);
          //console.log(res.data.data.accessToken);
          /*axios
            .get("/members/refreshToken", {
              headers: {
                "Access-Control-Allow-Origin":
                  "http://ec2-3-35-129-82.ap-northeast-2.compute.amazonaws.com:8080/", // 서버 domain
              },
              withCredentials: true,
            })
            .then((res) => {
              console.log(res);
            });*/
          //get요청으로 sameSite lax를 회피하려 하였으나 통하지 않았습니다. 죽은 자의 온기만 남아 있는 코드입니다.
          navigate("/");
        } else {
          window.alert("로그인 실패하였습니다. 다시 시도해주세요.");
          navigate("/");
          console.log("what the fuck are you doin'");
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("Not Found");
        window.alert("페이지를 찾을 수 없습니다.");
        navigate("/");
      });
  }, []);

  return (
    <Redirecting>
      <FontAwesomeIcon icon={faSpinner} pulse />
      &nbsp;
    </Redirecting>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(OAuth);
