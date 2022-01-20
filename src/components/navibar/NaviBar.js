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
import { initialState } from "../../variables";

const NaviBar = () => {
  return (
    <>
      <Nav>
        <NavContents>
          <NavMenu>
            <LogoLink to="/operator">
              <img src={require("../../images/logo2.png")} alt="logo" />
            </LogoLink>
            <NavLink to="/" style={({ isActive }) => ({})}>
              About
            </NavLink>
            <NavLink to="/announce">공지사항</NavLink>
            <NavLink to="/group" style={({ isActive }) => ({})}>
              소모임
            </NavLink>
            <NavLink to="/study" style={({ isActive }) => ({})}>
              스터디
            </NavLink>
            <NavLink to="/board" style={({ isActive }) => ({})}>
              게시판
            </NavLink>
          </NavMenu>
          <NavBtn>
            {initialState.authenticated ? (
              <>
                <ProfileLink to="/profile">
                  <img src={""} alt="profile" />
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

export default NaviBar;
