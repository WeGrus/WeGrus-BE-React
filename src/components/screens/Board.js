import * as React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import { Content } from "../shared/Content";
import PageTitle from "../shared/PageTitle";
import ScreenTitle from "../shared/ScreenTitle";
import SideBar from "../shared/SideBar";
import { useForm } from "react-hook-form";
import img from './../../images/Polygon.jpg'
import Pagination from "../shared/Pagination";
import PostBar from "../shared/PostBar";
import { connect } from "react-redux";

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




const subCategory = [
  { filter: "자유게시판" },
  { filter: "익명게시판" },
  { filter: "정보 공유" },
  { filter: "프로젝트 모집" },
  { filter: "취미 톡방" },
  { filter: "건의사항" },
  { filter: "질문/답변" },
];

const postData = [
  {
    number: 1,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 2,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 3,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 4,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },  {
    number: 5,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },  {
    number: 6,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 7,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 8,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 9,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },  
  {
    number: 10,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 11,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 12,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 13,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 14,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 15,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 16,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 17,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 18,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 19,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 20,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 21,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 22,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 23,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 1,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 2,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 3,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 4,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },  {
    number: 5,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },  {
    number: 6,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 7,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 8,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 9,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },  
  {
    number: 10,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 11,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 12,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 13,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 14,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 15,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 16,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 17,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 18,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 19,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 20,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 21,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 22,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 23,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 1,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 2,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 3,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 4,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },  {
    number: 5,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },  {
    number: 6,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 7,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 8,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 9,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },  
  {
    number: 10,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 11,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 12,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 13,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 14,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 15,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 16,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 17,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 18,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 19,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 20,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 21,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 22,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 23,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 1,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 2,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 3,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 4,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },  {
    number: 5,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },  {
    number: 6,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 7,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 8,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 9,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },  
  {
    number: 10,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 11,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 12,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 13,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 14,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 15,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 16,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 17,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 18,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 19,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 20,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 21,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 22,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 23,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 1,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 2,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 3,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 4,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },  {
    number: 5,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },  {
    number: 6,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 7,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 8,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 9,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },  
  {
    number: 10,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 11,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 12,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 13,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 14,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 15,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 16,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 17,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 18,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 19,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 20,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 21,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 22,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
  {
    number: 23,
    categorization: "프로젝트 모집",
    title: "test",
    writer: "17 김승태",
    date: "2022/01/19",
    hits: 156,
    recommend: 51,
    comment: 53
  },
]

const selectDate = [
  "추천순",
  "댓글순",
  "조회순"
]

function mapStateToProps(state) {
  return state;
}

function Board(props) {
  const input = useLocation();
  let subBarTarget; // 페이지에서 뒤로가기를 누르거나 목록을 누를 시 즉 subCategory

  if (input.state != null) {
    subBarTarget = input.state.category;
  } else {
    subBarTarget = "자유게시판";
  }

  const [target, setTarget] = React.useState(subBarTarget); // 게시판중 사이드바와 분류를 나눔. 즉 subCategory
  const [posts, setPosts] = React.useState(postData.filter(data=> data.categorization === target));
  const [text, setText] = React.useState();
  const [limit, setLimit] = React.useState(19);
  const [page, setPage] = React.useState(1);
  const [selected, setSelected] = React.useState("")
  const offset = (page-1)*limit;
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = data => console.log(data);

  const handleSearchBarFilter = (e) => {
    setSelected(e.target.value)
  }

  React.useEffect(() => { // 서브바에서 필터가 바뀌면 값을 변환.
  console.log(selected);
  }, [selected]);

  React.useEffect(() => { // 서브바에서 필터가 바뀌면 값을 변환.
    let test = [...postData.filter(data=> data.categorization === target)]
    setPosts([...test])
    setPage(1)
    console.log(props.tokenReducer);
  }, [target]);

  return (
    <>
      <PageTitle title="게시판" />
      <SideBar posts={subCategory} getFilter={setTarget}></SideBar>
      <Content>

        <ScreenTitle>{`게시판 | ${target}`}</ScreenTitle>
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

        <SearchBarFilter onChange={handleSearchBarFilter} value={selected}>
        {selectDate.map((value)=>
          <option value={value} key={value}>{value}</option>
        )}
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

        <PostBar target={target} page={page} data={posts}/>

        <Pagination
          total = {posts.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
        <Outlet />
      </Content>
    </>
  );
}
export default connect(mapStateToProps)(Board);
