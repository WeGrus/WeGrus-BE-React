import axios from "axios";
import React from "react";
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
  };
}

const NaviBar = (props) => {
  const authenticated = props.userReducer.authenticated;
  const DATA = props.userReducer;
  const Navigate = useNavigate();

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
    }

    else if(boardCategoryName === "ADMIN"){
      props.setAll("",1,[false],"ID", true)
      props.setViewCategoryName(null)
      Navigate(`/operator`)
    }

  }



  return (
    <>
      <Nav>
        <NavContents>
          <NavMenu>
            <LogoLink to="/operator" onClick={(e) => {handleLink(e,"ADMIN")}}>
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
          </NavMenu>
          <NavBtn>
            {authenticated ? (
              <>
                <ProfileLink to="/profile">
                  <img src={`${DATA.imageUrl}`} alt="profile" />
                </ProfileLink>
                <NavBtnLink to="/login">log out</NavBtnLink>
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
