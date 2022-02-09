import axios from "axios";
import * as React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import PageTitle from "../../shared/PageTitle";
import Pagination from "../../shared/Pagination";
import PostBar from "../../shared/PostBar";
import ScreenTitle from "../../shared/ScreenTitle";
import SideBar from "../../shared/SideBar";
import img from "./../../../images/Polygon.jpg";
import { Content } from "./ProfileElements";
import SavedPosts from "./SavedPosts";
import UserAccount from "./UserAccount";
import UserComments from "./UserComments";
import UserInfo from "./UserInfo";
import UserPosts from "./UserPosts";

const mapStateToProps = (state) => {
  return state;
};

const subCategory = [
  { content: "1", boardName: "내 정보" },
  { content: "2", boardName: "내가 쓴 게시글" },
  { content: "3", boardName: "내가 쓴 댓글" },
  { content: "4", boardName: "저장한 게시글" },
  { content: "5", boardName: "계정 설정" },
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

function Profile(props) {
  const DATA = props.userReducer;
  const input = useLocation();

  let subBarTarget; // 페이지에서 뒤로가기를 누르거나 목록을 누를 시 즉 subCategory

  if (input.state != null) {
    subBarTarget = input.state.category;
  } else {
    subBarTarget = "내 정보";
  } //subBar의 기본 선택지를 "내 정보"로 설정

  const [target, setTarget] = React.useState(subBarTarget); // 게시판중 사이드바와 분류를 나눔. 즉 subCategory

  console.log(target);
  const [posts, setPosts] = React.useState(
    postData.filter((data) => data.categorization === target)
  );

  const [page, setPage] = React.useState(1);
  const [selected, setSelected] = React.useState("");

  const handleSearchBarFilter = (e) => {
    setSelected(e.target.value);
  };
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

  let renderComponent = null;

  if (target === "내 정보") {
    renderComponent = <UserInfo data={DATA} />;
  } else if (target === "내가 쓴 게시글") {
    renderComponent = <UserPosts />;
  } else if (target === "내가 쓴 댓글") {
    renderComponent = <UserComments />;
  } else if (target === "저장한 게시글") {
    renderComponent = <SavedPosts />;
  } else if (target === "계정 설정") {
    renderComponent = <UserAccount />;
  }
  return (
    <>
      <PageTitle title="프로필" />
      <SideBar
        posts={subCategory}
        getFilter={setTarget}
        target={target}
      ></SideBar>
      <Content>
        <ScreenTitle>{`프로필 | ${target}`}</ScreenTitle>
        {renderComponent}
      </Content>
    </>
  );
}
export default connect(mapStateToProps)(Profile);
