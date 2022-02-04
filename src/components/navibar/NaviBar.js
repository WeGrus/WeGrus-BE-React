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

function mapStateToProps(state) {
  return state;
}

const NaviBar = (props) => {
  const authenticated = props.userReducer.authenticated;
  const DATA = props.userReducer;
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

export default connect(mapStateToProps)(NaviBar);
