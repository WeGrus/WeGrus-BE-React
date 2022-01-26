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
import React from "react";
import OAuth from "./components/auth/OAuth";
import Loading from "./components/screens/Loading";
import { connect } from "react-redux";
import axios from "axios";
import Signup from "./components/screens/Signup";

export const API_HOST =
  "http://ec2-3-35-129-82.ap-northeast-2.compute.amazonaws.com:8080/";

function mapStateToProps(state) {
  return state;
}

function App(props) {
  const authenticated = props.userReducer.authenticated;
  console.log(authenticated); 

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
          <Route path="/signup" element={<Signup />} />
          <Route path="/oauth/kakao/callback" element={<OAuth />} />
          <Route path="/login/email-auth" element={<EmailAuth />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default connect(mapStateToProps)(App);
