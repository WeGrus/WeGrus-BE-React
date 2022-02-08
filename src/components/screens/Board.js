import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Content } from "../shared/Content";
import PageTitle from "../shared/PageTitle";
import ScreenTitle from "../shared/ScreenTitle";
import SideBar from "../shared/SideBar";
import { set, useForm } from "react-hook-form";
import Pagination from "../shared/Pagination";
import PostBar from "../shared/PostBar";
import { connect } from "react-redux";
import axios from "axios";
import {SearchBarSection,SearchBarForm,SearchBarSelect,SearchBar,SearchBarInput,SearchBarSubmit,SearchBarFilter,CreateBtnLink,
  InforBar,InforContents,Number,Categorization,Title,Writer,Date,Hits,Recommendation,Comment} from "./../shared/BoardElement"


const PostInforBar = styled.div`
  width: 909.07px;
  height: 31px;
  margin: 0 auto;
  font-size: 14px;
  line-height: 16.41px;
  border-bottom: 1px solid black;
`;
const PostCotent = styled.div`
padding-top: 8px;
display: flex;
flex-direction: row;
`
const boardCategory = "BOARD";


// const subCategory = [ //서브 카테고리는 게시판 조회로 지정할 예정.
//   { filter: "자유게시판", boardType: "FREE"},
//   { filter: "익명게시판", boardType: "PERSONAL"},
//   { filter: "정보 공유", boardType: "INFO"},
//   { filter: "프로젝트 모집", boardType: "PROJECT"},
//   { filter: "취미 톡방",boardType: "HOBBY"},
//   { filter: "건의사항",boardType: "SUGGEST "},
//   { filter: "질문/답변",boardType: "black"},
// ];


const selectDate = [ // 게시물 나열할 때, 어떤 순으로 나열할지.
  {viewValue: "최신순", value: "LASTEST"},
  {viewValue: "추천순", value: "LIKEEST"},
  {viewValue: "댓글순", value: "REPLYEST"},
  {viewValue: "조회순", value: "none"},
]
//LASTEST, LIKEEST, REPLYEST

function mapStateToProps(state) {
  return state;
}

let isSearch = false;
let option = {}

function Board(props) {
  const location = useLocation();
  //console.log("보드JS의 페이지값:"+input.state.page);
  let subBarTarget; // 페이지에서 뒤로가기를 누르거나 목록을 누를 시 즉 subCategory
  if (location.state != null) {
    subBarTarget = location.state.category; 
  } else {
    subBarTarget = "INFO";
  }
  console.log(location);
  const [target, setTarget] = React.useState((location.state)?location.state.category:"INFO"); // 게시판중 사이드바와 분류를 나눔. 즉 subCategory
  const [posts, setPosts] = React.useState(null);
  const [totalPage, settotalPage] = React.useState(1);
  const [page, setPage] = React.useState(0);
  const [selected, setSelected] = React.useState("") // 필터값
  const [subCategory,setSubCategory] =React.useState(undefined);
  const [currentBoardType, setCurrentBoardType] = React.useState("")
  const [currentType, setCurrentType] = React.useState("")
  const inputEl = React.useRef(null)
  const { register, handleSubmit, watch, formState: { errors } } = useForm();


  const handleSearchFunction = (data, currentBoardType, currentType, page) => {
    if(data.option === "제목 + 내용"){
      axios.get(`/search/all/${currentBoardType}?keyword=${data.keyword}&page=${page-1}&pageSize=19&type=${currentType}`,{
        headers: {'Authorization': `Bearer ${props.userReducer.token}`}
      })
      .catch(function (error) {
        console.log(error.toJSON());
      })
      .then(function(res){
        //console.log(res);
        settotalPage(res.data.data.posts.totalPages)
        setPosts(res.data.data.posts.content)
        console.log("제목+내용검색");
      });
    }
    else if(data.option === "제목"){
      axios.get(`/search/title/${currentBoardType}?keyword=${data.keyword}&page=${page -1}&pageSize=19&type=${'LASTEST'}`,{
        headers: {'Authorization': `Bearer ${props.userReducer.token}`}
      })
      .catch(function (error) {
        console.log(error.toJSON());
      })
      .then(function(res){
        //console.log(res);
        settotalPage(res.data.data.posts.totalPages)
        setPosts(res.data.data.posts.content)
        console.log("제목검색");
      });
    }
    else{
      axios.get(`/search/writer/${currentBoardType}?keyword=${data.keyword}&page=${page-1}&pageSize=19&type=${'LASTEST'}`,{
        headers: {'Authorization': `Bearer ${props.userReducer.token}`}
      })
      .catch(function (error) {
        console.log(error.toJSON());
      })
      .then(function(res){
        console.log(res);
        settotalPage(res.data.data.posts.totalPages)
        setPosts(res.data.data.posts.content)
        console.log("글쓴이검색");
      });
    }
  }

  React.useEffect(() =>{ // sidebar에 필요한 목록 불러오기.
    axios.get(`/club/executives/boards`,{
      headers: {'Authorization': `Bearer ${props.userReducer.token}`}
    })
    .catch(function (error) {
      console.log(error.toJSON());
    })
    .then(function(res){

      let category = [...res.data.data.boards.filter(element => element.boardCategoryName === boardCategory)]
      setCurrentType("LASTEST")
      setSubCategory((previous) => (category));
    });
    
  },[])

  React.useEffect(()=>{ // 최초 실행
    if(subCategory !== undefined){
      const boardType = subCategory.find(element => element.boardName == target).boardId
      setCurrentBoardType(boardType)
      let page = (location.state)?location.state.page:1;
      setPage(page)
      // let t = (location.state)?location.state.category:"INFO"
      
      //console.log(page);
      
     // console.log(subCategory);
      //console.log(boardType);
     // console.log(props.userReducer.token);
      // axios.get(`/boards/${boardType}?page=${page-1}&pageSize=${19}&type=${"LASTEST"}`,{
      //   headers: {'Authorization': `Bearer ${props.userReducer.token}`}
      // })
      // .catch(function (error) {
      //   console.log(error.toJSON());
      // })
      // .then(function(res){
      //   console.log("서브 카테고리가 바뀐 뒤에");
      //   console.log(res.data.data.posts.content);
      //   settotalPage(res.data.data.posts.totalPages)
      //   setPosts(res.data.data.posts.content)
      // });
    }
    
  },[subCategory])

  React.useEffect(() => { // 서브바에서 타겟이 바뀌면 값을 변환.
    if(subCategory !== undefined){
      const boardType = subCategory.find(element => element.boardName == target).boardId
      setCurrentBoardType(boardType)
      setCurrentType('LASTEST')
      isSearch = false
      inputEl.current.value=""
      if(page === 1){
        axios.get(`/boards/${boardType}?page=${0}&pageSize=20&type=${'LASTEST'}`,{
          headers: {'Authorization': `Bearer ${props.userReducer.token}`}
        })
        .catch(function (error) {
          console.log(error.toJSON());
        })
        .then(function(res){
          console.log("타겟이 바뀐뒤에 호출");
          settotalPage(res.data.data.posts.totalPages)
          setPosts(res.data.data.posts.content)
        });
      }
      else{
          setPage(1)
      }
    }
   
  }, [target]);

  React.useEffect(() => { // 검색 바에서 순서가 바뀌면 값을 변환.
    if(subCategory !== undefined){
      if(page === 1){
        if(isSearch === false){
          console.log("셀렉트에서 값"+ selected);
          axios.get(`/boards/${currentBoardType}?page=${0}&pageSize=19&type=${selected}`,{
            headers: {'Authorization': `Bearer ${props.userReducer.token}`}
          })
          .catch(function (error) {
            console.log(error.toJSON());
          })
          .then(function(res){
            console.log("셀렉트 값이 바뀐뒤에 호출");
            settotalPage(res.data.data.posts.totalPages)
            setPosts(res.data.data.posts.content)
          });
        }
        else{
          handleSearchFunction(option, currentBoardType, selected, 1)
        }
      }
      setCurrentType(selected)
      setPage(1)
    }

  }, [selected]);

  const handleSearchBarFilter = (e) => { //사용자가 검색바 필터를 바꾸었을 때.
    setSelected((current) => e.target.value);
  };

  React.useEffect(()=>{
    if(subCategory !== undefined){
      if(isSearch === false){
        axios.get(`/boards/${currentBoardType}?page=${page-1}&pageSize=20&type=${currentType}`,{
          headers: {'Authorization': `Bearer ${props.userReducer.token}`}
        })
        .catch(function (error) {
          console.log(error.toJSON());
        })
        .then(function(res){
          console.log("페이지에서 호출");
          settotalPage(res.data.data.posts.totalPages)
          setPosts(res.data.data.posts.content)
        });
      }
      else{
        handleSearchFunction(option, currentBoardType, currentType, page)
      }
  }
  },[page])



  const handleSearching = (data) => { // 사용자가 검색을 했을때
    option = {option: data.option, keyword: data.keyword};
    isSearch = true
    if(page === 1){
      handleSearchFunction(option, currentBoardType, currentType, 1)
    }
    else{
      setPage(1)
    }
    
    console.log(data.option);
    console.log(data.keyword);

  }

  return (
    <>
      <PageTitle title="커뮤니티" />
      <SideBar posts={subCategory} getFilter={setTarget} target={target} item={"boardName"}></SideBar>
      {/* posts는 하위카테고리의 수를 나타내는 것입니다.[ex) 자유게시판, 비밀게시판 등등] target과 setTaget을 보냄으로써 bold및 target이 바뀌게 구현했습니다. */}
      <Content>
        <ScreenTitle>{`커뮤니티 | ${target}`}</ScreenTitle>
        <SearchBarSection>
          <SearchBarForm onSubmit={handleSubmit(handleSearching)}>
            <SearchBarSelect {...register("option")}>
              <option>제목 + 내용</option>
              <option>제목</option>
              <option>작성자</option>
            </SearchBarSelect>
            <SearchBar>
              <SearchBarInput
                {...register("keyword", { required: true })}  ref={inputEl}
              />
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
            to={`/board/write/${1}`}
            state={{ category: "커뮤니티", subCategory: target }}
          >
            create
          </CreateBtnLink>
        </SearchBarSection>

        <InforBar> {/* 프로필의 내가 쓴 게시글, 내가 쓴 댓글 부분에 사용하시면 좋을 듯 합니다.*/}
          <InforContents>
            <Number>번호</Number>
            <Title>제목</Title>
            <Writer>작성자</Writer>
            <Date>작성일자</Date>
            <Recommendation>추천</Recommendation>
            <Hits>조회</Hits>
            <Comment>댓글</Comment>
          </InforContents>
        </InforBar>

        {
          (posts !== null)?
          <PostBar target={target} page={page} data={posts} />
          :
          null
        }
         {/* PostBar는 PostBar.js에서 주석달겠습니다. target은 sidebar에서 클릭한 하위카테고리입니다. */}       

        <Pagination
          total = {totalPage}
          limit = {19}
          page={page}
          setPage={setPage}
        />
        {/* total은 총 게시글의 길이. limit은 한 페이지 안의 게시글의 개수, page는 현재 페이지이고 setPage를 보내줌으로써 페이지네이션 구현했습니다.*/}
        <Outlet />
      </Content>
    </>
  );
}
export default connect(mapStateToProps)(Board);
