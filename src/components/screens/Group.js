import * as React from "react";
import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import PageTitle from "../shared/PageTitle";
import SideBar from "../shared/SideBar";

const Content = styled.div`
  width: 924px;
  background-color: white;
`;

const arr = [
  { content: "Ixploit", filter: "free-board" },
  { content: "IGDC", filter: "infor" },
  { content: "Algrous", filter: "projects" },
  { content: "Webgrous", filter: "hobby" },
];

function Group() {
  return (
    <>
      <PageTitle title="소모임" />
      <SideBar posts={arr} />
      <Content>
        <h1>Group</h1>
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
export default Group;
