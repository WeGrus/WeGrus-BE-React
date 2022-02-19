import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Content } from "../shared/Content";
import PageTitle from "../shared/PageTitle";
import ScreenTitle from "../shared/ScreenTitle";
import SideBar from "../shared/SideBar";
import { useForm } from "react-hook-form";
import Pagination from "../shared/Pagination";
import PostBar from "../shared/PostBar";
import { connect } from "react-redux";
import axios from "axios";
import {
  SearchBarSection,
  SearchBarForm,
  SearchBarSelect,
  SearchBar,
  SearchBarInput,
  SearchBarSubmit,
  SearchBarFilter,
  CreateBtnLink,
  InforBar,
  InforContents,
  Number,
  Title,
  Writer,
  Date,
  Hits,
  Recommendation,
} from "./../shared/BoardElement";
import { actionCreators } from "../../store";

const boardCategory = "BOARD";



const selectDate = [
  // 게시물 나열할 때, 어떤 순으로 나열할지.
  { viewValue: "최신순", value: "LASTEST" },
  { viewValue: "추천순", value: "LIKEEST" },
  { viewValue: "댓글순", value: "REPLYEST" },
];


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

function Board(props) {
  const [target, setTarget] = React.useState(null); // subCategory중 지금 선택한 부분.
  const [subCategory, setSubCategory] = React.useState(undefined);
  const [page, setPage] = React.useState(0);
  const [selected, setSelected] = React.useState(""); // 필터값
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
          }&pageSize=19&type=${currentType}`
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
        .get(`/boards/categories`, {
          headers: { Authorization: `Bearer ${props.userReducer.token}` },
        })
        .catch(function (error) {
          console.log(error.toJSON());
        })
        .then(function (res) {
          const category = [...res.data.data.boards.filter((element) => element.boardCategoryName === boardCategory),];
          const categoryTarget = category.find((element) => element.boardId === PageReducer.boardId)
          let boardTarget;
          if (categoryTarget === undefined) {
            boardTarget = category[0].boardName
          }
          else {
            boardTarget = categoryTarget.boardName;
          }

          console.log(res);
          setTarget((current) => boardTarget);
          setPage(PageReducer.page);
          setSubCategory((previous) => category);
          console.log(PageReducer.selected);
          setSelected(PageReducer.selected);
          setLoad(true)
        });

      if (PageReducer.isSearching[0] === true) {
        handleSearchFunction(
          PageReducer.isSearching[1],
          PageReducer.isSearching[2],
          PageReducer.boardId,
          PageReducer.page,
          PageReducer.selected
        );
      }
      else {
        loadPageList(
          PageReducer.boardId,
          PageReducer.page,
          PageReducer.selected
        );
      }
    } 
    else {
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
      ).boardId; 
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

  window.onpopstate = function(event){ // 뒤로가기
    event.preventDefault();
    console.log("커뮤니티에서 뒤로가기");
    console.log(props.PageReducer);
    props.setAll(0,1,[false],"LASTEST",PageReducer.boardCategoryName);
  }

  return (
    <>
        {(load === true)?
      <>
      <PageTitle title="커뮤니티" />
      <SideBar
        posts={subCategory}
        getFilter={setTarget}
        target={target}
        item={"boardName"}
      ></SideBar>
      <Content>
        <ScreenTitle>{`커뮤니티 | ${target}`}</ScreenTitle>
        <SearchBarSection>
          <SearchBarForm onSubmit={handleSubmit(handleSearching, OnError)}>
            <SearchBarSelect {...register("option")}>
              <option>제목 + 내용</option>
              <option>제목</option>
              <option>작성자</option>
            </SearchBarSelect>
            <SearchBar>
              <SearchBarInput {...register("keyword", { required: true })} />
              <SearchBarSubmit type="submit" value="" />
            </SearchBar>
          </SearchBarForm>

          <SearchBarFilter onChange={handleSearchBarFilter} value={selected}>
            {selectDate.map((value) => (
              <option value={value.value} key={value.viewValue}>
                {value.viewValue}
              </option>
            ))}
          </SearchBarFilter>

          <CreateBtnLink
            to={`/board/write/${props.userReducer.id}`}
            state={{ category: "커뮤니티", subCategory: target }}
          >
            create
          </CreateBtnLink>
        </SearchBarSection>

        <InforBar>
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

        <Pagination
          total={totalPage}
          limit={19}
          page={page}
          setPage={setPage}
        />
        <Outlet />
      </Content>
    </>
      :
      null
    }
    </>


  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Board);
