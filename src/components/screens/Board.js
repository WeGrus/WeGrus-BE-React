import * as React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import { Content } from "../shared/Content";
import PageTitle from "../shared/PageTitle";
import ScreenTitle from "../shared/ScreenTitle";
import SideBar from "../shared/SideBar";
import { useForm } from "react-hook-form";
import img from './../../images/Polygon.jpg'




const SearchBarSection = styled.div`
  width: 910.07px;
  margin: 0 auto;
  height: 64px;

  border-bottom: 2px solid #0B665C;
  font-size: 14px;
  display: flex;
  flex-direction: row;
 
`
const SearchBarForm = styled.form`
display: flex;
flex-direction: row;
margin-left: 20px;
margin-top: 16px;
`

const SearchBarSelect = styled.select`
width: 117px;
height: 32px;
padding-left: 8px;
border-radius: 50px;
line-height: 16.41px;
color: #C4C4C4;
border: 1px solid #C4C4C4;


-moz-appearance: none;
-webkit-appearance: none;
appearance: none;
background:url(${img});
background-repeat: no-repeat;
background-size: 17px 17px;
background-position: bottom 8px right 11px;
`

const SearchBar = styled.div`
margin-left: 9px;
position: relative;
`

const SearchBarInput = styled.input`
min-width: 331.48px;
height: 31.59px;
border: 1px solid #C4C4C4;
border-radius: 50px;
padding-left: 19.87px;
`
const SearchBarSubmit = styled.input`
position: absolute;
right: 3.71px;
top: 4.25px;
width: 28.9px;
height: 25.27px;
border:none;
border-radius: 50px;
border-color: #C4C4C4; 
background-color:#C4C4C4; 
`

const SearchBarFilter = styled.select`
width: 60.52px;
height: 16.59px;
line-height: 16.41px;
margin-top: 24px;
margin-left: 100.52px;
border: none;

-moz-appearance: none;
-webkit-appearance: none;
appearance: none;

background:url(${img});
background-repeat: no-repeat;
background-size: 12.35px 10.43px;
background-position: right 2px bottom 2px;

`

const CreateBtnLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0b665c;
  width: 110px;
  height: 33px;
  border-radius: 16.5px;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-left: 100.32px;
  margin-top: 15.85px;

`

const InforBar = styled.div`
font-size: 14px;
font-weight: 700;
line-height: 16.41px;
width: 909.07px;
margin: 0 auto;
height: 34px;
border-bottom: 2px solid #0B665C; 
`

const InforContents = styled.div`
padding-top: 10px;
display: flex;
flex-direction: row;
text-align: center;
`

const Number = styled.div`
min-width: 65px;
text-align: center;
margin-left: 23px;
`

const Categorization = styled.div`
width: 90px;
text-align: center;
margin-left: 4px;
`

const Title = styled.div`
width: 373px;
margin-left: 31px;
`

const Writer = styled.div`
width: 77px;
text-align: center;
`

const Date = styled.div`
width: 63px;
text-align: center;
margin-left: 16px;
`

const Hits = styled.div`
width: 40px;
text-align: center;
margin-left: 11px;
`

const Recommendation = styled.div`
width: 40px;
text-align: center;
margin-left: 9px;
`
const Comment = styled.div`
width: 40px;
text-align: center;
margin-left: 7px;
`
const PostInforBar = styled.div`
width: 909.07px;
height: 31px;
margin: 0 auto;
font-size: 14px;
line-height: 16.41px;
border-bottom: 1px solid black;
`
const PostCotent = styled.div`
padding-top: 8px;
display: flex;
flex-direction: row;
`

const Pagination = styled.nav`
width:max-content;
margin: auto;
margin-top: 34px;
`
const Pagebtn = styled.button`
width: 20px;
border: none;
background-color: white;

&:hover{
  font-weight: 700;
  cursor: pointer;
  transform: translateY(-2px);
}
`



const contents = [
  { content: "자유게시판", filter: "자유게시판" },
  { content: "정보 공유", filter: "정보 공유" },
  { content: "프로젝트 모집", filter: "프로젝트 모집" },
  { content: "취미 톡방", filter: "취미 톡방" },
  { content: "건의사항", filter: "건의사항" },
];

const datas = [
  { board_type: "자유게시판", board_title: "게시판 | 자유게시판" },
  { board_type: "정보 공유", board_title: "게시판 | 정보 공유" },
  { board_type: "프로젝트 모집", board_title: "게시판 | 프로젝트 모집" },
  { board_type: "취미 톡방", board_title: "게시판 | 취미 톡방" },
  { board_type: "건의사항", board_title: "게시판 | 건의사항" },
];

function Board() {
  const input = useLocation();
  
  let subBarTarget;
  if (input.state != null) {
    subBarTarget = input.state.category;
  } else {
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

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  const { control } = useForm({
    defaultValues: {
      firstName: '',
      select: {}
    }
  });
  return (
    <>
      
      <PageTitle title="게시판" />
      <SideBar posts={contents} getFilter={getFilter}></SideBar>
      <Content>
        <ScreenTitle>{text}</ScreenTitle>
        <SearchBarSection>

        <SearchBarForm onSubmit={handleSubmit(onSubmit)}>
          <SearchBarSelect {...register("option")} >
              <option >제목 + 내용</option>
              <option >제목</option>
              <option >작성자</option>
          </SearchBarSelect>
          <SearchBar>
            <SearchBarInput {...register("exampleRequired", { required: true })} />
            <SearchBarSubmit type="submit" value="" />
          </SearchBar>
        </SearchBarForm>

        <SearchBarFilter>
            <option value="">추천순</option>
            <option value="">조회순</option>
            <option value="">댓글순</option>
        </SearchBarFilter>

        <CreateBtnLink
          to="/board/write/1234"
          state={{ category: "게시판", subCategory:  target  }}
        >
          create
        </CreateBtnLink>
        </SearchBarSection>
        <InforBar>
          <InforContents>
            <Number>번호</Number>
            <Categorization>분류</Categorization>
            <Title>제목</Title>
            <Writer>작성자</Writer>
            <Date>작성일자</Date>
            <Hits>조회</Hits>
            <Recommendation>추천</Recommendation>
            <Comment>댓글</Comment>
          </InforContents>
        </InforBar>

        <Link to="1" state={{ category: "게시판", subCategory:  target  }}  >
        <PostInforBar>
          <PostCotent>
            <Number>1254</Number>
            <Categorization>프로젝트 모집</Categorization>
            <Title>정말 필요합니다.</Title>
            <Writer>17 남궁성권</Writer>
            <Date>2022/01/19</Date>
            <Hits>958</Hits>
            <Recommendation>521</Recommendation>
            <Comment>65</Comment>
          </PostCotent>
        </PostInforBar>
        </Link>

        <PostInforBar>
          <PostCotent>
            <Number>1254</Number>
            <Categorization>프로젝트 모집</Categorization>
            <Title>정말 필요합니다.!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</Title>
            <Writer>17 김승태</Writer>
            <Date>2022/01/19</Date>
            <Hits>958</Hits>
            <Recommendation>521</Recommendation>
            <Comment>65</Comment>
          </PostCotent>
        </PostInforBar>

        <Pagination>
          <Pagebtn> {"<"} </Pagebtn>
          <Pagebtn>1</Pagebtn>
          <Pagebtn>2</Pagebtn>
          <Pagebtn>3</Pagebtn>
          <Pagebtn>4</Pagebtn>
          <Pagebtn>5</Pagebtn>
          <Pagebtn>{">"}</Pagebtn>
        </Pagination>
        <Outlet />
      </Content>
    </>
  );
}
export default Board;
