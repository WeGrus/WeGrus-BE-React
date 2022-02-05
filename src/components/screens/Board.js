import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Content } from "../shared/Content";
import PageTitle from "../shared/PageTitle";
import ScreenTitle from "../shared/ScreenTitle";
import SideBar from "../shared/SideBar";
import { useForm } from "react-hook-form";
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
  "최신순",
  "추천순",
  "댓글순",
  "조회순"
]


function mapStateToProps(state) {
  return state;
}



function Board(props) {
  const input = useLocation();
  //console.log("보드JS의 페이지값:"+input.state.page);
  let subBarTarget; // 페이지에서 뒤로가기를 누르거나 목록을 누를 시 즉 subCategory
  if (input.state != null) {
    subBarTarget = input.state.category; 
  } else {
    subBarTarget = "INFO";
  }

  const [target, setTarget] = React.useState(""); // 게시판중 사이드바와 분류를 나눔. 즉 subCategory
  const [posts, setPosts] = React.useState(null);
  const [totalPage, settotalPage] = React.useState(1);
  const [page, setPage] = React.useState(1);
  const [selected, setSelected] = React.useState("")
  const [subCategory,setSubCategory] =React.useState(undefined);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  if(target === ""){
    setTarget(subBarTarget)
  }

  const handleSearchBarFilter = (e) => {
    setSelected(e.target.value);
  };


  React.useEffect(() =>{ // sidebar에 필요한 목록 불러오기.
    axios.get(`/club/executives/boards`,{
      headers: {'Authorization': `Bearer ${props.userReducer.token}`}
    })
    .catch(function (error) {
      console.log(error.toJSON());
    })
    .then(function(res){
      let category = [...res.data.data.boards.filter(element => element.boardCategoryName === boardCategory)]
      setSubCategory((previous) => (category));
    });
  },[])

  React.useEffect(()=>{ // 최초 실행
    if(subCategory !== undefined){

      const boardType = subCategory.find(element => element.boardName == target).boardId
     // console.log(subCategory);
      //console.log(boardType);
     // console.log(props.userReducer.token);
      axios.get(`/boards/${boardType}?page=${page-1}&pageSize=${19}&type=${"LASTEST"}`,{
        headers: {'Authorization': `Bearer ${props.userReducer.token}`}
      })
      .catch(function (error) {
        console.log(error.toJSON());
      })
      .then(function(res){
        //console.log(res);
        //console.log(res.data.data.posts.content);
        settotalPage(res.data.data.posts.totalPages)
        setPosts(res.data.data.posts.content)
      });
    }
  },[subCategory])


  React.useEffect(() => { // 검색 바에서 순서가 바뀌면 값을 변환.
    console.log("셀렉트");

  }, [selected]);

  React.useEffect(() => { // 서브바에서 필터가 바뀌면 값을 변환.
    if(subCategory !== undefined){
      if(input.state != null&&input.state.page != undefined){
        setPage(input.state.page)
      }
      else{
        setPage(1)
      }
      //console.log("target!");
      //console.log(subCategory);

       const boardType = subCategory.find(element => element.boardName == target).boardId

      axios.get(`/boards/${boardType}?page=${0}&pageSize=20&type=${'LASTEST'}`,{
        headers: {'Authorization': `Bearer ${props.userReducer.token}`}
      })
      .catch(function (error) {
        console.log(error.toJSON());
      })
      .then(function(res){
        //console.log(res);
        settotalPage(res.data.data.posts.totalPages)
        setPosts(res.data.data.posts.content)
      });
    }
   
  }, [target]);

  return (
    <>
      <PageTitle title="커뮤니티" />
      <SideBar posts={subCategory} getFilter={setTarget} target={target} item={"boardName"}></SideBar>
      {/* posts는 하위카테고리의 수를 나타내는 것입니다.[ex) 자유게시판, 비밀게시판 등등] target과 setTaget을 보냄으로써 bold및 target이 바뀌게 구현했습니다. */}
      <Content>
        <ScreenTitle>{`커뮤니티 | ${target}`}</ScreenTitle>
        <SearchBarSection>
          <SearchBarForm onSubmit={handleSubmit(onSubmit)}>
            <SearchBarSelect {...register("option")}>
              <option>제목 + 내용</option>
              <option>제목</option>
              <option>작성자</option>
            </SearchBarSelect>
            <SearchBar>
              <SearchBarInput
                {...register("exampleRequired", { required: true })}
              />
              <SearchBarSubmit type="submit" value="" />
            </SearchBar>
          </SearchBarForm>

          <SearchBarFilter onChange={handleSearchBarFilter} value={selected}>
            {selectDate.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </SearchBarFilter>

          <CreateBtnLink
            to="/board/write/1234"
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
