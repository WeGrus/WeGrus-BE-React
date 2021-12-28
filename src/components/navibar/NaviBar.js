import React from "react";
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

const NaviBar = () => {
  return (
    <>
      <Nav>
        <NavContents>
          <NavMenu>
            <LogoLink to="/operator">
              <img src={require("../../images/logo.png")} alt="logo" />
            </LogoLink>
            <NavLink to="/" activeStyle>
              About
            </NavLink>
            <NavLink to="/announce">공지사항</NavLink>
            <NavLink to="/group" activeStyle>
              소모임
            </NavLink>
            <NavLink to="/study" activeStyle>
              스터디
            </NavLink>
            <NavLink to="/board" activeStyle>
              게시판
            </NavLink>
          </NavMenu>
          <NavBtn>
            <ProfileLink to="/profile">
              <img src={"../../images/logo.png"} />
            </ProfileLink>
            <NavBtnLink to="/login">log out</NavBtnLink>
          </NavBtn>
        </NavContents>
      </Nav>
    </>
  );
};

export default NaviBar;
