import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/screens/Login";
import Study from "./components/screens/Study";
import Page from "./components/screens/Page";

import Group from "./components/screens/Group";
import CreatePage from "./components/screens/Page_Create.js";
import UpdatePage from "./components/screens/Page_Update.js";
import Announce from "./components/screens/Announce";
import Profile from "./components/screens/Profile/Profile";
import { GlobalStyles } from "./styles";
import Operator from "./components/screens/Operator";
import Board from "./components/screens/Board";
import Layout from "./components/Layout";
import { Helmet, HelmetProvider } from "react-helmet-async";
import EmailAuth from "./components/screens/EmailAuth";
import React, { useEffect, useState } from "react";
import OAuth from "./components/auth/OAuth";
import Loading from "./components/screens/Loading";
import { connect } from "react-redux";
import axios from "axios";
import Signup from "./components/screens/Signup";
import { actionCreators } from "./store";
import jwt_decode from "jwt-decode";
import About from "./components/screens/About/About";
import { Cookies, useCookies } from "react-cookie";

axios.defaults.baseURL = "http://api.igrus.net:8080/";
//"http://ec2-3-35-129-82.ap-northeast-2.compute.amazonaws.com:8080/";

//axios에서 baseURL을 지정해서 반복하는 코드를 없애는 것입니다. 이것때문에 기능이 안되신다면 말씀해주세요.

function mapStateToProps(state) {
  console.log(state);
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    loginSuccess: (token) => dispatch(actionCreators.loginSuccess(token)),
    logUserOut: () => dispatch(actionCreators.logUserOut()),
    putUserInfo: (
      id,
      email,
      name,
      studentId,
      department,
      grade,
      gender,
      phone,
      createdDate,
      introduce,
      imageUrl,
      academicStatus,
      roles,
      group
    ) =>
      dispatch(
        actionCreators.putUserInfo(
          id,
          email,
          name,
          studentId,
          department,
          grade,
          gender,
          phone,
          createdDate,
          introduce,
          imageUrl,
          academicStatus,
          roles,
          group
        )
      ),
  };
}

//const JWT_EXPIRY_TIME = 30 * 60; //만료 시간 1800초 (=30분)

export const jsonType = { "content-type": "application/json" };

export const cookies = new Cookies();

function App(props) {
  // const [setCookie, removeCookie] = useCookies(["refreshToken"]);

  const getReissue = () => {
    axios
      .post("/reissue", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      })
      .then((res) => {
        const accessToken = res?.data?.data?.accessToken;
        console.log(accessToken);
        props.loginSuccess(accessToken);
        //reissue 성공
      })
      .catch((err) => {
        console.log(err);
        cookies.remove("refreshToken", []);
        props.logUserOut();
        // ... 로그인 실패 처리
      });
  };

  const authenticated = props?.userReducer?.authenticated;
  console.log(authenticated);
  const role = props?.userReducer?.roles;
  const token = props?.userReducer?.token;
  const [userInfo, setUserInfo] = useState(false);

  let isAuthority = false;
  let isJoinGroup = false;
  const joinPermission = props?.userReducer?.group; //

  if (props?.userReducer?.roles !== null) {
    // 권한을 부여해서 일반회원은 /operator에 접근할 수 없게 만들었습니다. 이를 이용하기 위한 값입니다.
    isAuthority = props?.userReducer?.roles?.some((i) =>
      [
        "ROLE_GROUP_EXECUTIVE",
        "ROLE_GROUP_PRESIDENT",
        "ROLE_CLUB_EXECUTIVE",
        "ROLE_CLUB_PRESIDENT",
      ].includes(i)
    );
    isJoinGroup = props?.userReducer?.roles?.some((i) =>
      [
        "ROLE_GROUP_EXECUTIVE",
        "ROLE_GROUP_PRESIDENT",
        "ROLE_CLUB_PRESIDENT",
      ].includes(i)
    );
  }

  useEffect(() => {
    console.log(props);
    const refreshToken = cookies.get("refreshToken");
    console.log(refreshToken);
    if (props) {
      getReissue();
      //렌더링시 자동으로 리이슈 api 요청
      //reissue api를 요청합니다.
      if (refreshToken !== undefined) {
        //store에 토큰이 있을 경우(=로그인 했을 경우)
        var decoded = jwt_decode(token);
        console.log(props);
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
            //setUserInfo(true);

            //앱이 랜더링 될 때마다 유저 정보를 리덕스 스토어에 저장합니다.
          })
          .catch((err) => {
            const ERR = err.response.data.status;
            console.log(ERR);
            if (ERR === 403) {
              window.alert(
                "GUEST 권한입니다. 동아리 가입 신청 후 MEMBER 권한을 획득하면 이용 가능합니다."
              );
            }
          });
      }
    } else {
      console.log(props);
      props.logUserOut();
      //removeCookie("refreshToken");
    }
  }, [token]);

  useEffect(() => {
    console.log("lsHf vjwefv");
  }, []);

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
                <Route
                  path="/announce/write/:userid"
                  element={<CreatePage />}
                />
                <Route
                  path="/announce/update/:pagenum/:userid"
                  element={<UpdatePage />}
                />
                {(joinPermission !== null && joinPermission?.length !== 0) ||
                isJoinGroup ? (
                  <>
                    <Route path="/group" element={<Group />} />
                    <Route path="/group/:pagenum" element={<Page />} />
                    <Route
                      path="/group/write/:userid"
                      element={<CreatePage />}
                    />
                    <Route
                      path="/group/update/:pagenum/:userid"
                      element={<UpdatePage />}
                    />
                  </>
                ) : null}

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

                <>
                  {isAuthority === true ? (
                    <Route path="/operator" element={<Operator />} />
                  ) : null}
                </>
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
