import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { actionCreators } from "../../store";
import {
  Nav,
  NavLink,
  NavMenu,
  NavBtn,
  NavBtnLink,
  ProfileLink,
  LogoLink,
  NavContents,
} from "./NavBarElements";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { cookies } from "../../App";
import { useCookies } from "react-cookie";

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    setAll: (boardId, page, isSearching, selected, boardCategoryName) =>
      dispatch(
        actionCreators.setAll(
          boardId,
          page,
          isSearching,
          selected,
          boardCategoryName
        )
      ),
    setViewCategoryName: (viewCategoryName) =>
      dispatch(actionCreators.setViewCategoryName(viewCategoryName)),
    logUserOut: () => dispatch(actionCreators.logUserOut()),
  };
}

const NaviBar = (props) => {
  const [logOut, setLogOut] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies(["refreshToken"]);

  const authenticated = props.userReducer.authenticated;
  const DATA = props.userReducer;
  const Navigate = useNavigate();

  //useEffect(() => {}, [logOut]);
  const handleLogOut = () => {
    console.log("log out!");
  };

  const handleLink = (e, boardCategoryName) => {
    e.preventDefault(); //뒤로가기 시 활용. 첫 페이지 지정.
    if (boardCategoryName === "BOARD") {
      console.log("네비 확인!");
      props.setAll(7, 1, [false], "LASTEST", "/board");
      props.setViewCategoryName("커뮤니티");
      Navigate(`/board`);
    } else if (boardCategoryName === "STUDY") {
      props.setAll(6, 1, [false], "LASTEST", "/study");
      props.setViewCategoryName("스터디");
      Navigate(`/study`);
    } else if (boardCategoryName === "GROUP") {
      props.setAll(2, 1, [false], "LASTEST", "/group");
      props.setViewCategoryName("소모임");
      Navigate(`/group`);
    } else if (boardCategoryName === "NOTICE") {
      props.setAll(1, 1, [false], "LASTEST", "/announce");
      props.setViewCategoryName("공지사항");
      Navigate(`/announce`);
    } else if (boardCategoryName === "ADMIN") {
      props.setAll("", 1, [false], "ID", true);
      props.setViewCategoryName(null);
      Navigate(`/operator`);
    }
  };
  let isAuthority = false;
  let isJoinGroup = false;

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
  }
  return (
    <>
      <Nav>
        <NavContents>
          <NavMenu>
            <LogoLink to="/">
              <img src={require("../../images/logo2.png")} alt="logo" />
            </LogoLink>
            <NavLink to="/" style={({ isActive }) => ({})}>
              About
            </NavLink>
            <NavLink
              to="/announce"
              onClick={(e) => {
                handleLink(e, "NOTICE");
              }}
            >
              공지사항
            </NavLink>
            <NavLink
              to="/group"
              onClick={(e) => {
                handleLink(e, "GROUP");
              }}
              style={({ isActive }) => ({})}
            >
              소모임
            </NavLink>
            <NavLink
              to="/study"
              onClick={(e) => {
                handleLink(e, "STUDY");
              }}
              style={({ isActive }) => ({})}
            >
              스터디
            </NavLink>
            <NavLink
              to="/board"
              onClick={(e) => {
                handleLink(e, "BOARD");
              }}
              style={({ isActive }) => ({})}
            >
              커뮤니티
            </NavLink>
            {isAuthority ? (
              <NavLink
                to="/operator"
                onClick={(e) => {
                  handleLink(e, "ADMIN");
                }}
                style={({ isActive }) => ({})}
              >
                ADMIN
              </NavLink>
            ) : null}
          </NavMenu>
          <NavBtn>
            {authenticated ? (
              <>
                <ProfileLink to="/profile">
                  <img src={`${DATA.imageUrl}`} alt="profile" />
                </ProfileLink>
                <NavBtnLink onClick={() => handleLogOut()} to="/login">
                  log out
                </NavBtnLink>
              </>
            ) : (
              <NavBtnLink to="/login">log in</NavBtnLink>
            )}
          </NavBtn>
        </NavContents>
      </Nav>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NaviBar);
