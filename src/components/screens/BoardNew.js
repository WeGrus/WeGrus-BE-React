import * as React from "react";
import { Outlet, useLocation, useParams,useSearchParams,Link } from "react-router-dom";
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

    const { pathname } = useLocation();
    const param = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const [target, setTarget] = React.useState(null); // subCategory중 지금 선택한 부분.
    const [subCategory, setSubCategory] = React.useState(undefined);
    const [page, setPage] = React.useState(0);
    const [selected, setSelected] = React.useState(""); // 필터값
    const [load, setLoad] = React.useState(false); // load유무로 location의 값이 바뀐 뒤에 렌더
    const [posts, setPosts] = React.useState(null); // API로 받은 값
    const [totalPage, settotalPage] = React.useState(0); // 총 페이지.



    // console.log(pathname);
    // console.log("파람값");
    // console.log(param);
    // console.log(param.boardId);
    // console.log(param.isSearch);
    // console.log(param.page);
    // console.log(param.sorted);
    //console.log(location);
    //console.log(location.search);
    if(searchParams.get("isSearch") !== null){
        console.log(searchParams.get("isSearch"));
        console.log(searchParams.get("option"));
        console.log(searchParams.get("keyword"));
    }

    const handleSearchFunction = (option,keyword,currentBoardType,page,currentType) => {
        // 검색일 경우 실행
        if (option === "제목 + 내용") {
          axios.get(`/search/all/${currentBoardType}?keyword=${keyword}&page=${page - 1}&pageSize=19&type=${currentType}`)
            .catch(function (error) {
              console.log(error.toJSON());
            })
            .then(function (res) {
              //console.log(res);
              settotalPage(res.data.data.posts.totalPages);
              setPosts(res.data.data.posts.content);
              console.log("제목+내용검색");
            });
        } 
        else if (option === "제목") {
            axios.get(`/search/title/${currentBoardType}?keyword=${keyword}&page=${page - 1}&pageSize=19&type=${currentType}`,
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
        } 
        else {
          axios.get(`/search/writer/${currentBoardType}?keyword=${keyword}&page=${page - 1}&pageSize=19&type=${currentType}`,
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
        axios.get(`/boards/${boardId}?page=${page - 1}&pageSize=19&type=${type}`, {
            headers: { Authorization: `Bearer ${props.userReducer.token}` },
          })
          .catch(function (error) {
            console.log(error.toJSON());
          })
          .then(function (res) {
            console.log("loadPageList 동작!");
            settotalPage(res.data.data.posts.totalPages);
            setPosts(res.data.data.posts.content);
          });
      };

    React.useEffect(()=>{
        console.log("useEffect호출!");
        if(subCategory === undefined){
            axios.get(`/boards/categories`, {
              headers: { Authorization: `Bearer ${props.userReducer.token}` },
            })
            .catch(function (error) {
              console.log(error.toJSON());
            })
            .then(function (res) {
                console.log(res);
              const category = [...res.data.data.boards.filter((element) => element.boardCategoryName === boardCategory)];
              const categoryTarget = category.find((item)=>item.boardId === parseInt(param.boardId)).boardName 
              console.log(category);
              setSubCategory((previous) => category);
              console.log(categoryTarget);
              setTarget((current) => categoryTarget);
              console.log("param.page "+parseInt(param.page));
              setPage(parseInt(param.page))
              console.log("param.sorted "+param.sorted);
              setSelected(param.sorted)
              setLoad(true)
            });

            if(param.isSearch === "false"){
                console.log("param.isSearch가 false");
                loadPageList(param.boardId,parseInt(param.page),param.sorted); // boardId,page,selected

            }
            else if(param.isSearch === "true"){
                console.log("param.isSearch가 true");
                const option = searchParams.get("option")
                const keyword = searchParams.get("keyword")
                handleSearchFunction(option,keyword,param.boardId,parseInt(param.page),param.sorted);
                // option, keyword, boardId, page, seleted
            }
        }
        else{
            console.log("subCategory가 undifined가 아님!!!");
        }
    },[pathname])

    //setSearchParams({isSearch:false,option:"제목"})
    return (
        <>
            {(load) ?
                <>
                    <PageTitle title="커뮤니티" />
                    <Content>
                        <ScreenTitle>{`커뮤니티 | ${target}`}</ScreenTitle>
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
                            <PostBar target={target} page={page} data={posts} userReducer={props.userReducer} />
                        )
                            :
                            null
                        }

                        <CreateBtnLink
                            to={`"/board/8/1/LASTEST/false"`}>
                            예시링크
                        </CreateBtnLink>  
                    </Content>
                </>
                :
                null
            }

        </>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(Board);