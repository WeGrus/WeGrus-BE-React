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
import {useNavigate} from "react-router-dom";

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch){
  return{
    setAll: (boardId,page,isSearching,seleted) => dispatch(actionCreators.setAll(boardId,page,isSearching,seleted))
  }
}

const NaviBar = (props) => {
  const authenticated = props.userReducer.authenticated;
  const DATA = props.userReducer;
  const Navigate = useNavigate();

  const handleLink = (e) => {
    e.preventDefault();
    props.setAll(7,1,[false],'LASTEST')
    Navigate(`/board`, {state:{category:"INFO", page:1, search:{isSearch:false}, selected:"LASTEST"}})
  }


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
            <NavLink to="/group"  style={({ isActive }) => ({})}>
              소모임
            </NavLink>
            <NavLink to="/study" style={({ isActive }) => ({})}>
              스터디
            </NavLink>
            <NavLink to="/board?isNavi=true" onClick={handleLink} style={({ isActive }) => ({})}>
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

export default connect(mapStateToProps,mapDispatchToProps)(NaviBar);
