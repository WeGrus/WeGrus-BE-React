import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";
//import styled from "styled-components";
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
  InforBar,InforContents,Number,Title,Writer,Date,Hits,Recommendation} from "./../shared/BoardElement"
  import { actionCreators } from "../../store";

// const PostInforBar = styled.div`
//   width: 909.07px;
//   height: 31px;
//   margin: 0 auto;
//   font-size: 14px;
//   line-height: 16.41px;
//   border-bottom: 1px solid black;
// `;
// const PostCotent = styled.div`
// padding-top: 8px;
// display: flex;
// flex-direction: row;
// `
const boardCategory = "NOTICE";


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

function mapDispatchToProps(dispatch){
  return{
    setAll: (boardId,page,isSearching,selected,boardCategoryName) => dispatch(actionCreators.setAll(boardId,page,isSearching,selected,boardCategoryName)),
  }
}

function Board(props) {
  const location = useLocation();

  const [target, setTarget] = React.useState(null); // subCategory중 지금 선택한 부분.
  const [subCategory,setSubCategory] =React.useState(undefined);
  const [page, setPage] = React.useState(0);
  const [selected, setSelected] = React.useState("") // 필터값
  const [load, setLoad] = React.useState(false) // load유무로 location의 값이 바뀐 뒤에 렌더
  const [posts, setPosts] = React.useState(null); // API로 받은 값
  const [totalPage, settotalPage] = React.useState(0); // 총 페이지.
  const isAuthority = props.userReducer.roles.some(i => ["ROLE_GROUP_EXECUTIVE","ROLE_GROUP_PRESIDENT","ROLE_CLUB_EXECUTIVE","ROLE_CLUB_PRESIDENT"].includes(i))


  const { register, handleSubmit} = useForm();

  const handleSearchFunction = (option,keyword, currentBoardType, page, currentType) => { // 검색일 경우 실행
    if(option === "제목 + 내용"){
      axios.get(`/search/all/${currentBoardType}?keyword=${keyword}&page=${page-1}&pageSize=19&type=${currentType}`,{
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
    else if(option === "제목"){
      axios.get(`/search/title/${currentBoardType}?keyword=${keyword}&page=${page -1}&pageSize=19&type=${currentType}`,{
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
      axios.get(`/search/writer/${currentBoardType}?keyword=${keyword}&page=${page-1}&pageSize=19&type=${currentType}`,{
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



  const loadPageList = (boardId,page,type) => {
    axios.get(`/boards/${boardId}?page=${page - 1}&pageSize=19&type=${type}`, {
      headers: { 'Authorization': `Bearer ${props.userReducer.token}` }
    })
      .catch(function (error) {
        console.log(error.toJSON());
      })
      .then(function (res) {
        settotalPage(res.data.data.posts.totalPages)
        setPosts(res.data.data.posts.content)
      });
  }


  React.useEffect(()=>{
    const PageReducer = props.PageReducer
    console.log("props호출!");
    if(subCategory === undefined){
      axios.get(`boards/categories`,{
        headers: {'Authorization': `Bearer ${props.userReducer.token}`}
      })
      .catch(function (error) {
        console.log(error.toJSON());
      })
      .then(function(res){
        const category = [...res.data.data.boards.filter(element => element.boardCategoryName === boardCategory)] // 사이드바에 넣을 콘텐츠의 종류
        const boardTarget = category.find(element => element.boardId === PageReducer.boardId).boardName // 그 중에서 현재 타겟의 board이름
        console.log(res);
        setTarget((current) => boardTarget)
        setPage(PageReducer.page)
        setSubCategory((previous) => (category))
        console.log(PageReducer.selected);
        setSelected(PageReducer.selected)
        
      });

      if(PageReducer.isSearching[0] === true){
        handleSearchFunction(PageReducer.isSearching[1],PageReducer.isSearching[2],PageReducer.boardId,PageReducer.page,PageReducer.selected)
      }
      else{
        loadPageList(PageReducer.boardId,PageReducer.page,PageReducer.selected)
      }
    }
    else{
      if(PageReducer.isSearching[0] === true){
        handleSearchFunction(PageReducer.isSearching[1],PageReducer.isSearching[2],PageReducer.boardId,PageReducer.page,PageReducer.selected)
      }
      else{
        loadPageList(PageReducer.boardId,PageReducer.page,PageReducer.selected)
      }
    }
  },[props])

  React.useEffect(()=>{
    if(subCategory !== undefined){
      const PageReducer = props.PageReducer
      console.log(subCategory);
      const boardId = subCategory.find(element => element.boardName === target).boardId // 그 중에서 현재 타겟의 board이름
      console.log(boardId);
      setSelected("LASTEST")
      props.setAll(boardId,1,[false],"LASTEST",PageReducer.boardCategoryName)
    }
  },[target])

  const handleSearching = (data,e) => { // 사용자가 검색을 했을때
    console.log(data);
    const PageReducer = props.PageReducer
    props.setAll(PageReducer.boardId,1,[true,data.option,data.keyword],'LASTEST',PageReducer.boardCategoryName)
    setSelected("최신순")
  }

  const OnError = (error,e) => {
    console.log(error);
    console.log("error");
  }

  const handleSearchBarFilter = (e) => { //사용자가 검색바 필터를 바꾸었을 때.
    console.log(e.target.value);
    const type = e.target.value;
    const PageReducer = props.PageReducer
    setSelected(e.target.value)
    props.setAll(PageReducer.boardId,1,PageReducer.isSearching,type,PageReducer.boardCategoryName)
  };

  React.useEffect(()=>{
    if(subCategory !== undefined){
      const PageReducer = props.PageReducer
      props.setAll(PageReducer.boardId,page,PageReducer.isSearching,PageReducer.selected,PageReducer.boardCategoryName)
    }
  },[page])



  return (
    <>
      <PageTitle title="공지사항" />
      <SideBar posts={subCategory} getFilter={setTarget} target={target} item={"boardName"}></SideBar>
      {/* posts는 하위카테고리의 수를 나타내는 것입니다.[ex) 자유게시판, 비밀게시판 등등] target과 setTaget을 보냄으로써 bold및 target이 바뀌게 구현했습니다. */}
      <Content>
        <ScreenTitle>{`공지사항 | ${target}`}</ScreenTitle>
        <SearchBarSection>
          <SearchBarForm onSubmit={handleSubmit(handleSearching, OnError)}>
            <SearchBarSelect {...register("option")}>
              <option>제목 + 내용</option>
              <option>제목</option>
              <option>작성자</option>
            </SearchBarSelect>
            <SearchBar>
              <SearchBarInput
                {...register("keyword", { required: true })}
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
          {(isAuthority === true)?
   <CreateBtnLink
   to={`/announce/write/${props.userReducer.id}`} state={{ category: "공지사항", subCategory:  target}}
 >
   create
 </CreateBtnLink>
          :
          null
          }
       
            </SearchBarSection> 

          <InforBar> {/* 프로필의 내가 쓴 게시글, 내가 쓴 댓글 부분에 사용하시면 좋을 듯 합니다.*/}
            <InforContents>
              <Number >번호</Number>
              <Title>제목</Title>
              <Writer>작성자</Writer>
              <Date>작성일자</Date>
              <Recommendation>추천</Recommendation>
              <Hits>조회</Hits>
            </InforContents>
          </InforBar>

          {
            (posts !== null) ?
            <PostBar target={target} page={page} data={posts} userReducer={props.userReducer}/>
              :
              null
          }
          {/* PostBar는 PostBar.js에서 주석달겠습니다. target은 sidebar에서 클릭한 하위카테고리입니다. */}

          <Pagination
            total={totalPage}
            limit={19}
            page={page}
            setPage={setPage}
          />
          {/* total은 총 게시글의 길이. limit은 한 페이지 안의 게시글의 개수, page는 현재 페이지이고 setPage를 보내줌으로써 페이지네이션 구현했습니다.*/}
          <Outlet />
      </Content>
    </>
  );
}
export default connect(mapStateToProps,mapDispatchToProps)(Board);
