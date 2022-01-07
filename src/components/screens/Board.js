import * as React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Content } from "../shared/Content";
import PageTitle from "../shared/PageTitle";
import ScreenTitle from "../shared/ScreenTitle";
import SideBar from "../shared/SideBar";

const CreateBtnLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0B665C;
  width: 110px;
  height: 33px;
  border-radius: 16.5px;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-left: 24px;
`;

const contents = [
  { content: "자유게시판", filter: "자유게시판" },
  { content: "정보 공유", filter: "정보 공유" },
  { content: "프로젝트 모집", filter: "프로젝트 모집" },
  { content: "취미 톡방", filter: "취미 톡방" },
  { content: "건의사항", filter: "건의사항" },
];

const datas = [
  { board_type: "free-board", board_title: "게시판 | 자유게시판" },
  { board_type: "infor", board_title: "게시판 | 정보 공유" },
  { board_type: "projects", board_title: "게시판 | 프로젝트 모집" },
  { board_type: "hobby", board_title: "게시판 | 취미 톡방" },
  { board_type: "suggestions", board_title: "게시판 | 건의사항" },
];

function Board() {
  const input = useLocation();
  let subBarTarget;
  if(input.state != null){
    subBarTarget = input.state.category;
  }
  else{
    subBarTarget = "자유게시판";
  }
  const [target, setTarget] = React.useState(subBarTarget);
  const [text, setText] = React.useState();
  const getFilter = (filter) => {
    setTarget(filter);
  };

  React.useEffect(() => {
    let filterData = datas.filter((data) => data.board_type === target);
    setText(
      filterData.map((data) => <p key={data.board_title}>{data.board_title}</p>)
    );
  }, [target]);

  return (
    <>
      <PageTitle title="게시판" />
      <SideBar posts={contents} getFilter={getFilter}></SideBar>
      <Content>
        <ScreenTitle>{text}</ScreenTitle>
        {/* <h1>Board</h1>
        <h2>list</h2>
        <nav style={{ borderBottom: "solid 1px", paddingBottom: "1rem" }}>
          <Link to="1">page1</Link> | <Link to="2">page2</Link> |{" "}
          <Link to="3">page3</Link> |{" "}
        </nav>
        {/* <Link to="write/1234">create</Link> */}
        <CreateBtnLink to="/board/write/1234" 
            state={{category:"게시판",
                   subCategory:{target}}}>
          create</CreateBtnLink>
        <Outlet />
      </Content>
    </>
  );
}
export default Board;
