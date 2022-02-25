import axios from "axios";
import { useLocation } from "react-router-dom";
import { actionCreators } from "../../../store";

import {
  InforBar,
  InforContents,
  Number,
  Title,
  Writer,
  Date,
  Hits,
  Recommendation,
  BoardName,
} from "./ProfilePostBarElements";
import PostBar from "../../shared/PostBar";
import Pagination from "../../shared/Pagination";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import ProfilePostBar from "./ProfilePostBar";

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    setAll: (boardId, page, isSearching, selected, boardCategoryName) =>
      dispatch(
        actionCreators.setAll(
          boardId,
          page,
          isSearching,
          selected,
          boardCategoryName
        )
      ),
    setPage: (page) => dispatch(actionCreators.setPage(page)),
  };
}

function UserPosts(props) {
  const location = useLocation();

  //const [target, setTarget] = React.useState(null); // subCategory중 지금 선택한 부분.

  //const [selected, setSelected] = React.useState(""); // 필터값
  //const [currentBoardType, setCurrentBoardType] = React.useState("") // 현재 타겟의 boardType(숫자)
  // const [currentType, setCurrentType] = React.useState("") // 현재 타겟의 selected(숫자)
  let currentBoardType = "";
  let currentType = "";
  const [load, setLoad] = useState(false); // load유무로 location의 값이 바뀐 뒤에 렌더
  const [posts, setPosts] = useState(null); // API로 받은 값
  const [totalPage, setTotalPage] = useState(0); // 총 페이지.

  const PageReducer = props.PageReducer;
  const page = PageReducer.page;

  const loadPageList = (page) => {
    axios
      .get(`/members/posts?page=${page}&size=10`)
      .then(function (res) {
        console.log(res);

        setTotalPage(res.data.data.totalPages);
        setPosts(res.data.data.content);
      })
      .catch(function (error) {
        console.log(error.toJSON());
      });
  };

  useEffect(() => {
    props.setPage(page);
    loadPageList(page);
  }, [page]);

  const OnError = (error, e) => {
    console.log(error);
    console.log("error");
  };

  return (
    <>
      <InforBar>
        {/* 프로필의 내가 쓴 게시글, 내가 쓴 댓글 부분에 사용하시면 좋을 듯 합니다.*/}
        <InforContents>
          <BoardName>게시판</BoardName>
          <Title>제목</Title>
          <Writer>작성자</Writer>
          <Date>작성일자</Date>
          <Recommendation>추천</Recommendation>
          <Hits>조회</Hits>
        </InforContents>
      </InforBar>

      {posts !== null ? (
        <>
          <ProfilePostBar
            //target={target}
            page={page}
            data={posts}
          />
          <Pagination
            total={totalPage}
            limit={10}
            page={page}
            setPage={props.setPage}
          />
        </>
      ) : null}
      {/* PostBar는 PostBar.js에서 주석달겠습니다. target은 sidebar에서 클릭한 하위카테고리입니다. */}

      {/* total은 총 게시글의 길이. limit은 한 페이지 안의 게시글의 개수, page는 현재 페이지이고 setPage를 보내줌으로써 페이지네이션 구현했습니다.*/}
    </>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(UserPosts);
