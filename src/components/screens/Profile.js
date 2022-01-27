import * as React from "react";
import { useForm } from "react-hook-form";
import { Link, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import PageTitle from "../shared/PageTitle";
import Pagination from "../shared/Pagination";
import PostBar from "../shared/PostBar";
import ScreenTitle from "../shared/ScreenTitle";
import SideBar from "../shared/SideBar";
import img from "./../../images/Polygon.jpg";

const Content = styled.div`
  width: 924px;
  background-color: white;
`;

const InfoBox = styled.div`
  width: 100%;
  height: 360px;
  display: flex;
`;

const SDetailBox = styled.div`
  width: 50%;
  height: 100%;

  padding: 24px;
  justify-content: center;
  align-items: center;
  span {
    font-weight: 600;
    font-size: 14px;
  }
`;

const ProfileContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 24px;
`;

const ProfilePhoto = styled.div`
  height: 134px;
  width: 134px;
  background-color: #f4f4f4;
  border-radius: 50%;
`;

const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-weight: 400;
    margin-bottom: 16px;
  }
`;

function DetailBox({ title, children }) {
  return (
    <SDetailBox>
      <span>{title}</span>
      <ProfileContent>{children}</ProfileContent>
    </SDetailBox>
  );
}

const subCategory = [
  { content: "내 정보", filter: "내 정보" },
  { content: "내가 쓴 게시글", filter: "내가 쓴 게시글" },
  { content: "내가 쓴 댓글", filter: "내가 쓴 댓글" },
  { content: "계정 설정", filter: "계정 설정" },
];

const postData = [
  {
    number: 1,
    categorization: "내 정보",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53,
  },
];

function Profile() {
  const input = useLocation();

  let subBarTarget; // 페이지에서 뒤로가기를 누르거나 목록을 누를 시 즉 subCategory

  if (input.state != null) {
    subBarTarget = input.state.category;
  } else {
    subBarTarget = "내 정보";
  }

  const [target, setTarget] = React.useState(subBarTarget); // 게시판중 사이드바와 분류를 나눔. 즉 subCategory
  const [posts, setPosts] = React.useState(
    postData.filter((data) => data.categorization === target)
  );

  const [page, setPage] = React.useState(1);
  const [selected, setSelected] = React.useState("");

  React.useEffect(() => {
    // 서브바에서 필터가 바뀌면 값을 변환.
    console.log(selected);
  }, [selected]);

  React.useEffect(() => {
    // 서브바에서 필터가 바뀌면 값을 변환.
    let test = [...postData.filter((data) => data.categorization === target)];
    setPosts([...test]);
    setPage(1);
  }, [target]);

  return (
    <>
      <PageTitle title="프로필" />
      <SideBar posts={subCategory} getFilter={setTarget}></SideBar>
      <Content>
        <ScreenTitle>{`프로필 | ${target}`}</ScreenTitle>

        <InfoBox>
          <DetailBox title="프로필 사진 편집">
            <ProfilePhoto />
          </DetailBox>
          <DetailBox title="회원 정보">
            <InfoText>
              <span>이름 | 최희건</span>
              <span>학번 | 12173944</span>
              <span>학과 | 의류디자인학과</span>
              <span>소속 | Webgrus</span>
              <span>구분 | 일반 회원</span>
              <span>소개 | 반갑습니다.</span>
            </InfoText>
          </DetailBox>
        </InfoBox>

        <Outlet />
      </Content>
    </>
  );
}
export default Profile;
