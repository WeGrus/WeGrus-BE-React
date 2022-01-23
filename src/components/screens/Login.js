import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import AuthLayout from "../auth/AuthLayout";
import BottomBox from "../auth/BottomBox";
import BottomButton from "../auth/BottomButton";
import HeaderContainer from "../auth/HeaderContainer";
import PageTitle from "../shared/PageTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

const CLIENT_ID = "65cd2fc55aec40658e2efbc951d47164";
const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

function Login() {
  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <Link to={"/"}>
        <HeaderContainer>
          <span>
            Wegrus는 인하대학교 최대 컴퓨터 동아리 Igrus의 웹사이트입니다.
          </span>
          <span>로그인하여 다양한 활동과 커뮤니티를 만나보세요.</span>
        </HeaderContainer>
      </Link>
      <BottomBox>
        <BottomButton href={KAKAO_AUTH_URL} color="#FAE100" ftcolor="black">
          <FontAwesomeIcon icon={faComment} />
          <span>카카오 계정으로 로그인</span>
        </BottomButton>
      </BottomBox>
    </AuthLayout>
  );
}
export default Login;
