import * as React from "react";
import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import SideBar from "../shared/SideBar";

const Content = styled.div`
  width: 924px;
  background-color: white;
`;

function Board() {
  const arr = [
    "자유게시판",
    "정보 공유",
    "프로젝트 모집",
    "취미 톡방",
    "질문/답변",
    "건의사항",
  ];
  return (
    <>
      <SideBar arr={arr} />
      <Content>
        <h1>Board</h1>
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
export default Board;
