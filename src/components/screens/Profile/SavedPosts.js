import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Outlet, useLocation } from "react-router-dom";
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
} from "./../../shared/BoardElement";
import PostBar from "../../shared/PostBar";
import Pagination from "../../shared/Pagination";
import { connect } from "react-redux";

const boardCategory = "PROFILE";

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
  };
}

function SavedPosts(props) {
  const location = useLocation();

  const [target, setTarget] = React.useState(null); // subCategory중 지금 선택한 부분.
  const [subCategory, setSubCategory] = React.useState(undefined);
  const [page, setPage] = React.useState(0);
  const [selected, setSelected] = React.useState(""); // 필터값
  //const [currentBoardType, setCurrentBoardType] = React.useState("") // 현재 타겟의 boardType(숫자)
  // const [currentType, setCurrentType] = React.useState("") // 현재 타겟의 selected(숫자)
  let currentBoardType = "";
  let currentType = "";
  const [load, setLoad] = React.useState(false); // load유무로 location의 값이 바뀐 뒤에 렌더
  const [posts, setPosts] = React.useState(null); // API로 받은 값
  const [totalPage, settotalPage] = React.useState(0); // 총 페이지.

  const { register, handleSubmit } = useForm();

  const handleSearchFunction = (
    option,
    keyword,
    currentBoardType,
    page,
    currentType
  ) => {
    // 검색일 경우 실행
    if (option === "제목 + 내용") {
      axios
        .get(
          `/search/all/${currentBoardType}?keyword=${keyword}&page=${
            page - 1
          }&pageSize=19&type=${currentType}`,
          {
            headers: { Authorization: `Bearer ${props.userReducer.token}` },
          }
        )
        .catch(function (error) {
          console.log(error.toJSON());
        })
        .then(function (res) {
          //console.log(res);
          settotalPage(res.data.data.posts.totalPages);
          setPosts(res.data.data.posts.content);
          console.log("제목+내용검색");
        });
    } else if (option === "제목") {
      axios
        .get(
          `/search/title/${currentBoardType}?keyword=${keyword}&page=${
            page - 1
          }&pageSize=19&type=${currentType}`,
          {
            headers: { Authorization: `Bearer ${props.userReducer.token}` },
          }
        )
        .catch(function (error) {
          console.log(error.toJSON());
        })
        .then(function (res) {
          //console.log(res);
          settotalPage(res.data.data.posts.totalPages);
          setPosts(res.data.data.posts.content);
          console.log("제목검색");
        });
    } else {
      axios
        .get(
          `/search/writer/${currentBoardType}?keyword=${keyword}&page=${
            page - 1
          }&pageSize=19&type=${currentType}`,
          {
            headers: { Authorization: `Bearer ${props.userReducer.token}` },
          }
        )
        .catch(function (error) {
          console.log(error.toJSON());
        })
        .then(function (res) {
          console.log(res);
          settotalPage(res.data.data.posts.totalPages);
          setPosts(res.data.data.posts.content);
          console.log("글쓴이검색");
        });
    }
  };

  const loadPageList = (boardId, page, type) => {
    axios
      .get(`/boards/${boardId}?page=${page - 1}&pageSize=19&type=${type}`, {
        headers: { Authorization: `Bearer ${props.userReducer.token}` },
      })
      .catch(function (error) {
        console.log(error.toJSON());
      })
      .then(function (res) {
        settotalPage(res.data.data.posts.totalPages);
        setPosts(res.data.data.posts.content);
      });
  };

  React.useEffect(() => {
    const PageReducer = props.PageReducer;
    console.log("props호출!");
    if (subCategory === undefined) {
      axios
        .get(`/club/executives/boards`, {
          headers: { Authorization: `Bearer ${props.userReducer.token}` },
        })
        .catch(function (error) {
          console.log(error.toJSON());
        })
        .then(function (res) {
          const category = [
            ...res.data.data.boards.filter(
              (element) => element.boardCategoryName === boardCategory
            ),
          ]; // 사이드바에 넣을 콘텐츠의 종류
          const boardTarget = category.find(
            (element) => element.boardId === PageReducer.boardId
          ).boardName; // 그 중에서 현재 타겟의 board이름
          console.log(res);
          setTarget((current) => boardTarget);
          setPage(PageReducer.page);
          setSubCategory((previous) => category);
          console.log(PageReducer.selected);
          setSelected(PageReducer.selected);
        });

      if (PageReducer.isSearching[0] === true) {
        handleSearchFunction(
          PageReducer.isSearching[1],
          PageReducer.isSearching[2],
          PageReducer.boardId,
          PageReducer.page,
          PageReducer.selected
        );
      } else {
        loadPageList(
          PageReducer.boardId,
          PageReducer.page,
          PageReducer.selected
        );
      }
    } else {
      if (PageReducer.isSearching[0] === true) {
        handleSearchFunction(
          PageReducer.isSearching[1],
          PageReducer.isSearching[2],
          PageReducer.boardId,
          PageReducer.page,
          PageReducer.selected
        );
      } else {
        loadPageList(
          PageReducer.boardId,
          PageReducer.page,
          PageReducer.selected
        );
      }
    }
  }, [props]);

  React.useEffect(() => {
    if (subCategory !== undefined) {
      const PageReducer = props.PageReducer;
      console.log(subCategory);
      const boardId = subCategory.find(
        (element) => element.boardName === target
      ).boardId; // 그 중에서 현재 타겟의 board이름
      console.log(boardId);
      setSelected("LASTEST");
      props.setAll(
        boardId,
        1,
        [false],
        "LASTEST",
        PageReducer.boardCategoryName
      );
    }
  }, [target]);

  const handleSearching = (data, e) => {
    // 사용자가 검색을 했을때
    console.log(data);
    const PageReducer = props.PageReducer;
    props.setAll(
      PageReducer.boardId,
      1,
      [true, data.option, data.keyword],
      "LASTEST",
      PageReducer.boardCategoryName
    );
    setSelected("최신순");
  };

  const OnError = (error, e) => {
    console.log(error);
    console.log("error");
  };

  const handleSearchBarFilter = (e) => {
    //사용자가 검색바 필터를 바꾸었을 때.
    console.log(e.target.value);
    const type = e.target.value;
    const PageReducer = props.PageReducer;
    setSelected(e.target.value);
    props.setAll(
      PageReducer.boardId,
      1,
      PageReducer.isSearching,
      type,
      PageReducer.boardCategoryName
    );
  };

  React.useEffect(() => {
    if (subCategory !== undefined) {
      const PageReducer = props.PageReducer;
      props.setAll(
        PageReducer.boardId,
        page,
        PageReducer.isSearching,
        PageReducer.selected,
        PageReducer.boardCategoryName
      );
    }
  }, [page]);

  return (
    <>
      <InforBar>
        {/* 프로필의 내가 쓴 게시글, 내가 쓴 댓글 부분에 사용하시면 좋을 듯 합니다.*/}
        <InforContents>
          <Number>번호</Number>
          <Title>제목</Title>
          <Writer>작성자</Writer>
          <Date>작성일자</Date>
          <Recommendation>추천</Recommendation>
          <Hits>조회</Hits>
        </InforContents>
      </InforBar>

      {posts !== null ? (
        <PostBar
          target={target}
          page={page}
          data={posts}
          userReducer={props.userReducer}
        />
      ) : null}
      {/* PostBar는 PostBar.js에서 주석달겠습니다. target은 sidebar에서 클릭한 하위카테고리입니다. */}

      <Pagination total={totalPage} limit={19} page={page} setPage={setPage} />
      {/* total은 총 게시글의 길이. limit은 한 페이지 안의 게시글의 개수, page는 현재 페이지이고 setPage를 보내줌으로써 페이지네이션 구현했습니다.*/}
      <Outlet />
    </>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(SavedPosts);
