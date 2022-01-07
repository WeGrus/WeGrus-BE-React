import * as React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import PageTitle from "../shared/PageTitle";
import SideBar from "../shared/SideBar";

const Content = styled.div`
  width: 924px;
  background-color: white;
`;

const arr = [
  { content: "내 정보", filter: "myinfo" },
  { content: "내가 쓴 게시글", filter: "myposts" },
  { content: "내가 쓴 댓글", filter: "mycomments" },
  { content: "계정 설정", filter: "accountinfo" },
];

function Profile() {
  return (
    <>
      <PageTitle title="프로필" />
      <SideBar posts={arr} />
      <Content>
        <Outlet />
      </Content>
    </>
  );
}
export default Profile;
