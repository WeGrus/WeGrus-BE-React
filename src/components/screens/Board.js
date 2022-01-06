import * as React from "react";
import { Outlet, Link } from "react-router-dom";
import { Content } from "../shared/Content";
import PageTitle from "../shared/PageTitle";
import ScreenTitle from "../shared/ScreenTitle";
import SideBar from "../shared/SideBar";

const contents = [
  { content: "자유게시판", filter: "free-board" },
  { content: "정보 공유", filter: "infor" },
  { content: "프로젝트 모집", filter: "projects" },
  { content: "취미 톡방", filter: "hobby" },
  { content: "건의사항", filter: "suggestions" },
];

const datas = [
  { board_type: "free-board", board_title: "게시판 | 자유게시판" },
  { board_type: "infor", board_title: "게시판 | 정보 공유" },
  { board_type: "projects", board_title: "게시판 | 프로젝트 모집" },
  { board_type: "hobby", board_title: "게시판 | 취미 톡방" },
  { board_type: "suggestions", board_title: "게시판 | 건의사항" },
];

function Board() {
  const [target, setTarget] = React.useState("free-board");
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
        <Link to="write/1234">create</Link> */}
        <Outlet />
      </Content>
    </>
  );
}
export default Board;
