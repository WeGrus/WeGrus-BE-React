import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  background-color: white;
  margin-top: 24px;
  height: 60px;
  width: 100%;
  justify-content: center;
  border-bottom: 1px solid #bebebe;
  z-index: 10;
  display: flex;
  * {
    font-size: 14px;
    font-weight: bold;
  }
`;
export const NavContents = styled.div`
  width: 1240px;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

export const NavLink = styled(Link)`
  width: 110px;
  height: 100%;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  &.active {
    background-color: #f5f5f5;
  }
`;

export const NavMenu = styled.div`
  display: flex;
`;

export const LogoLink = styled(Link)`
  cursor: pointer;
  margin-right: 24px;
  img {
    width: 59px;
    height: 59px;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
`;

export const NavBtnLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6cd2d7;
  width: 110px;
  height: 33px;
  border-radius: 16.5px;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #6cd2d7;
  }
`;

export const ProfileLink = styled(Link)`
  height: 33px;
  width: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #f5f5f5;
  overflow: hidden;
  img {
    height: 33px;
    width: 33px;
    object-fit: cover;
  }
`;
