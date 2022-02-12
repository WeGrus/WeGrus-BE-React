import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/screens/Login";
import Study from "./components/screens/Study";
import Page from "./components/screens/Page";
import About from "./components/screens/About";
import Group from "./components/screens/Group";
import CreatePage from "./components/screens/Page_Create.js";
import UpdatePage from "./components/screens/Page_Update.js";
import Announce from "./components/screens/Announce";
import Profile from "./components/screens/Profile/Profile";
import { GlobalStyles } from "./styles";
import Operator from "./components/screens/Operator";
import { isOperator } from "./variables";
import Board from "./components/screens/Board";
import Layout from "./components/Layout";
import { HelmetProvider } from "react-helmet-async";
import EmailAuth from "./components/screens/EmailAuth";
import React, { useEffect, useState } from "react";
import OAuth from "./components/auth/OAuth";
import Loading from "./components/screens/Loading";
import { connect } from "react-redux";
import axios from "axios";
import Signup from "./components/screens/Signup";
import { actionCreators } from "./store";
import jwt_decode from "jwt-decode";

axios.defaults.baseURL =
  "http://ec2-3-35-129-82.ap-northeast-2.compute.amazonaws.com:8080/";
//axios에서 baseURL을 지정해서 반복하는 코드를 없애는 것입니다. 이것때문에 기능이 안되신다면 말씀해주세요.

function mapStateToProps(state) {
  console.log(state);
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    putUserInfo: (
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
    ) =>
      dispatch(
        actionCreators.putUserInfo(
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
        )
      ),
  };
}
export const JWT_EXPIRY_TIME = 30 * 60; //만료 시간 1800초 (=30분)

function getCookie() {
  var result = null;
  var cookie = document.cookie;

  const split_token = cookie.split("=");
  result = split_token[1];
  onSilentRefresh(result);
}

export const onSilentRefresh = (refresh_token) => {
  if (refresh_token) {
    console.log(refresh_token);

    axios
      .post("/reissue", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
        // ... 로그인 실패 처리
      });
  }
};

function App(props) {
  const authenticated = props?.userReducer?.authenticated;
  const token = props?.userReducer?.token;
  const [userInfo, setUserInfo] = useState(false);
  // onSilentRefresh(refresh_token);
  let isAuthority = false
  let isJoinGroup = false
  if(props.userReducer.roles !== null){ // 권한을 부여해서 일반회원은 /operator에 접근할 수 없게 만들었습니다. 이를 이용하기 위한 값입니다.
    isAuthority =   props?.userReducer?.roles.some(i => ["ROLE_GROUP_EXECUTIVE","ROLE_GROUP_PRESIDENT","ROLE_CLUB_EXECUTIVE","ROLE_CLUB_PRESIDENT"].includes(i))
    isJoinGroup =  props?.userReducer?.roles.some(i => ["ROLE_GROUP_EXECUTIVE","ROLE_GROUP_PRESIDENT","ROLE_CLUB_EXECUTIVE","ROLE_CLUB_PRESIDENT","ROLE_MEMBER"].includes(i))
  }
  useEffect(() => {
    //getCookie(); 도메인 코드 활성화 이후 이 코드를 활성화시켜야 합니다. reissue api를 요청합니다.
    if (authenticated) {
      //store에 토큰이 있을 경우(=로그인 했을 경우)
      var decoded = jwt_decode(token);
      //토큰을 디코딩합니다
      const ID = decoded.sub; //회원번호

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${props?.userReducer?.token}`;

      axios //유저 정보를 가져옵니다.
        .get(`/members/info/${ID}`)
        .then((res) => {
          const INFO = res.data.data.info;
          const INFO_ARRAY = Object.values(INFO);

          props.putUserInfo(...INFO_ARRAY);
          setUserInfo(true);

          //앱이 랜더링 될 때마다 유저 정보를 리덕스 스토어에 저장합니다.
        })
        .catch(console.log("no user info"));
    }
  }, [authenticated, userInfo]);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<Layout />}>
            {authenticated ? (
              <>
                <Route path="/" element={<About />} />
                <Route path="/announce" element={<Announce />} />
                <Route path="/announce/:pagenum" element={<Page />} />
                <Route path="/announce/write/:userid" element={<CreatePage />} />
                <Route
                  path="/announce/update/:pagenum/:userid"
                  element={<UpdatePage />}
                />
                {(isJoinGroup === true)?
                <>
                <Route path="/group" element={<Group />} />
                <Route path="/group/:pagenum" element={<Page />} />
                <Route path="/group/write/:userid" element={<CreatePage />} />
                <Route
                  path="/group/update/:pagenum/:userid"
                  element={<UpdatePage />}
                />
                </>
                :
                null
                }

                <Route path="/study" element={<Study />} />
                <Route path="/study/:pagenum" element={<Page />} />
                <Route path="/study/write/:userid" element={<CreatePage />} />
                <Route
                  path="/study/update/:pagenum/:userid"
                  element={<UpdatePage />}
                />

                <Route path="/board" element={<Board />} />
                <Route path="/board/write/:userid" element={<CreatePage />} />
                <Route path="/board/:pagenum" element={<Page />} />
                <Route
                  path="/board/update/:pagenum/:userid"
                  element={<UpdatePage />}
                />
                <Route path="/profile" element={<Profile />} />
                {isOperator ? (
                  <>
                  {(isAuthority === true)? <Route path="/operator" element={<Operator />} /> : null}
                  </>
                ) : null}
              </>
            ) : (
              <Route path="/" element={<About />} />
            )}
          </Route>
          <Route path="/login" element={<Login />} />
          {!authenticated ? (
            <>
              <Route path="/oauth/kakao/callback" element={<OAuth />} />
              <Route path="/login/email-auth" element={<EmailAuth />} />
              <Route path="/signup" element={<Signup />} />
            </>
          ) : (
            <Route path="/" element={<About />} />
          )}

          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
