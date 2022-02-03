import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/screens/Login";
import Study from "./components/screens/Study";
import Page from "./components/screens/Page";
import About from "./components/screens/About";
import Group from "./components/screens/Group";
import CreatePage from "./components/screens/Page_Create.js";
import UpdatePage from "./components/screens/Page_Update.js";
import Announce from "./components/screens/Announce";
import Profile from "./components/screens/Profile";
import { GlobalStyles } from "./styles";
import Operator from "./components/screens/Operator";
import { isOperator } from "./variables";
import Board from "./components/screens/Board";
import Layout from "./components/Layout";
import { HelmetProvider } from "react-helmet-async";
import EmailAuth from "./components/screens/EmailAuth";
import React, { useEffect } from "react";
import OAuth from "./components/auth/OAuth";
import Loading from "./components/screens/Loading";
import { connect } from "react-redux";
import axios from "axios";
import Signup from "./components/screens/Signup";
import { actionCreators } from "./store";

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

function App(props) {
  const authenticated = props.userReducer.authenticated;

  useEffect(() => {
    if (authenticated) {
      axios
        .get(`/members/info/${props?.userReducer?.id}`, {
          headers: { Authorization: `Bearer ${props?.userReducer?.token}` },
        })
        .then((res) => {
          const INFO = res.data.data.info;
          const INFO_ARRAY = Object.values(INFO);

          props.putUserInfo(...INFO_ARRAY);
        })
        .catch(console.log("no user info"));
    }
  }, [authenticated]);
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
                <Route path="/group" element={<Group />} />
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
                    <Route path="/operator" element={<Operator />} />
                  </>
                ) : null}
              </>
            ) : (
              <Route path="/" element={<About />} />
            )}
          </Route>
          <Route path="/login" element={<Login />} />
          {!props?.userReducer?.authenticated ? (
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
