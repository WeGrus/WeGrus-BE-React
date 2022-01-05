import * as React from "react";
import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import PageTitle from "../shared/PageTitle";
import SideBar from "../shared/SideBar";

const Content = styled.div`
  width: 924px;
  background-color: white;
`;

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
  { board_type: "자유게시판", board_title: "제목:자유게시판" },
  { board_type: "정보 공유", board_title: "제목:정보 공유" },
  { board_type: "프로젝트 모집", board_title: "제목:프로젝트 모집" },
  { board_type: "취미 톡방", board_title: "제목:취미 톡방" },
  { board_type: "건의사항", board_title: "제목:건의사항" },
  { board_type: "자유게시판", board_title: "제목:자유게시판1" },
  { board_type: "정보 공유", board_title: "제목:정보 공유1" },
  { board_type: "프로젝트 모집", board_title: "제목:프로젝트 모집1" },
  { board_type: "취미 톡방", board_title: "제목:취미 톡방1" },
  { board_type: "건의사항", board_title: "제목:건의사항1" },
];

function Board() {
  const [target, setTarget] = React.useState("자유게시판");
  const [text, setText] = React.useState();
  const getFilter = (filter) => {
    setTarget(filter);
  };

  React.useEffect(() => {
    let filterData = datas.filter((data) => data.board_type == target);
    setText(
      filterData.map((data) => <p key={data.board_title}>{data.board_title}</p>)
    );
  }, [target]);

  return (
    <>
      <PageTitle title="게시판" />
      <SideBar posts={contents} getFilter={getFilter}></SideBar>
      <Content>
        {text}
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
