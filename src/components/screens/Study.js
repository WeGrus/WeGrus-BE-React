import * as React from "react";
import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import SideBar from "../shared/SideBar";

const Content = styled.div`
  width: 924px;
  background-color: white;
`;

function Study() {
  const arr = [];
  return (
    <>
      <SideBar arr={arr} />
      <Content>
        <h1>Study</h1>
        <h2>list</h2>
        <nav style={{ borderBottom: "solid 1px", paddingBottom: "1rem" }}>
          <Link to="1">page1</Link> | <Link to="2">page2</Link> |{" "}
          <Link to="3">page3</Link> |{" "}
        </nav>
        <Link to="write/1234">create</Link>
        <Outlet />
      </Content>
    </>
  );
}
export default Study;
