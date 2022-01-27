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
import {SearchBarSection,SearchBarForm,SearchBarSelect,SearchBar,SearchBarInput,SearchBarSubmit,SearchBarFilter,CreateBtnLink,
  InforBar,InforContents,Number,Categorization,Title,Writer,Date,Hits,Recommendation,Comment} from "./../shared/BoardElement"



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
  }, [selected]);

  React.useEffect(() => { // 서브바에서 필터가 바뀌면 값을 변환.
    let test = [...postData.filter(data=> data.categorization === target)]
    setPosts([...test])
    setPage(1)
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
