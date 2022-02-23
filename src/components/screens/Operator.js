import * as React from "react";
import PageTitle from "../shared/PageTitle";
import ScreenTitle from "../shared/ScreenTitle";
import SideBar from "../shared/SideBar";
import { Content } from "../shared/Content";
import {SearchBarSection,SearchBarForm,SearchBarSelect,SearchBar,SearchBarInput,SearchBarSubmit,InforBar,InforContents,
  Grade,StudentId,Name,Role,Attendance,PostInforBar,PhoneNumber,Gender,Check,CheckBtn,PostCotent,PostRole,PostAttendance,PostGender,
  InforSelection} from "./../shared/BoardElement.js"
import { useForm } from "react-hook-form";
import Pagination from "../shared/Pagination";
import styled from "styled-components";
import img from './../../images/Polygon.jpg'
import { connect } from "react-redux";
import axios from "axios";
import PostMemberBar from './../shared/PostMemberBar'
import PostMemberPermissionBar from './../shared/PostMemberPermissionBar'
import PostMemberExpulsionBar from './../shared/PostMemberExpulsionBar'
import PostGroupPermissionBar from './../shared/PostGroupPermissionBar'
import { actionCreators } from "./../../store";
import ResetAllMember from "./../shared/ResetAllMember"
import BoardEdit from "../shared/BoardEdit";
const Number = styled.div`
width: 40px;
text-align: left;
margin-left: 44px;
position: relative;
word-spacing: -3px;
cursor: ${(props) => (props.post ? "none" : "pointer")};
`

const subCategory = [
  { boardName: "회원 목록 조회" },
  { boardName: "회원 가입 승인 및 거절" },
  { boardName: "회원 권한 부여" },
  { boardName: "운영진 권한 부여 및 회원 권한 해제"},
  { boardName: "운영진 권한 해제"},
  { boardName: "그룹 회장 권한 부여"},
  { boardName: "회원 강제 탈퇴"},
  { boardName: "회장 위임"},
  { boardName: "전체 동아리원 초기화"},
  { boardName: "게시판 추가 및 삭제"},
  { boardName: "그룹 회원 목록 조회"},
  { boardName: "그룹 가입 승인" },
  { boardName: "그룹 강제 탈퇴"},
  { boardName: "그룹 임원 권한 부여"},
  { boardName: "그룹 회장 위임 및 임원 권한 해제"},
];



const getAuthority = (AllLeader,ClubLeaderGroupExecutive,ClubLeader,ClubExecutiveGroupLeader,GroupLeader,ClubExecutiveGroupExecutive,ClubExecutive,GroupExecutive) => {
if(AllLeader){
  return subCategory
}
else if(ClubLeaderGroupExecutive){
  return subCategory.filter(item => (item.boardName !== "그룹 강제 탈퇴")&&(item.boardName !== "그룹 임원 권한 부여")&&(item.boardName !== "그룹 회장 위임 및 임원 권한 해제"))
}
else if(ClubLeader){
  return subCategory.filter(item => (item.boardName !== "그룹 가입 승인")&&(item.boardName !== "그룹 강제 탈퇴")&&(item.boardName !== "그룹 임원 권한 부여")&&(item.boardName !== "그룹 회장 위임 및 임원 권한 해제")&&(item.boardName !== "그룹 회원 목록 조회"))
}
else if(ClubExecutiveGroupLeader){
  return subCategory.filter(item => (item.boardName !== "전체 동아리원 권한 초기화")&&(item.boardName !== "회장 위임")&&(item.boardName !== "회원 권한 부여")&&(item.boardName !== "그룹 회장 위임 및 임원 권한 해제")&&(item.boardName !== "회원 강제 탈퇴")&&(item.boardName !== "운영진 권한 부여 및 회원 권한 해제"))
}
else if(GroupLeader){
  return subCategory.filter(item => (item.boardName !== "회원 목록 조회")&&(item.boardName !== "회원 가입 승인 및 거절")&&(item.boardName !== "회원 권한 부여")&&(item.boardName !== "운영진 권한 부여 및 회원 권한 해제")&&(item.boardName !== "운영진 권한 해제")&&(item.boardName !== "그룹 회장 권한 부여")&&(item.boardName !== "회원 강제 탈퇴")&&(item.boardName !== "회장 위임")&&(item.boardName !== "전체 동아리원 초기화")&&(item.boardName !== "게시판 추가 및 삭제"))
}
else if(ClubExecutiveGroupExecutive){
  return subCategory.filter(item => (item.boardName !== "회원 권한 부여")&&(item.boardName !== "운영진 권한 부여 및 회원 권한 해제")&&(item.boardName !== "회원 강제 탈퇴")&&(item.boardName !== "회장 위임")&&(item.boardName !== "전체 동아리원 초기화")&&(item.boardName !== "운영진 권한 해제")&&(item.boardName !== "그룹 회장 위임 및 임원 권한 해제")&&(item.boardName !== "그룹 임원 권한 부여")&&(item.boardName !== "그룹 강제 탈퇴"))
}
else if(ClubExecutive){
  return subCategory.filter(item => (item.boardName === "회원 목록 조회")||(item.boardName === "회원 가입 승인 및 거절")||(item.boardName === "그룹 회장 권한 부여")||(item.boardName !== "게시판 추가 및 삭제"))
}
else if(GroupExecutive){
  return subCategory.filter(item => (item.boardName === "그룹 회원 목록 조회")||(item.boardName === "그룹 가입 승인"))
}
}

const discriminationDirection = (value) => {
  if(value === true){
    return "ASC"
  }
  else{
    return "DESC"
  }
}

let direction = true;


//let searchType = "" // 검색 타입 Available values : NAME, STUDENT_ID, DEPARTMENT, PHONE

function mapDispatchToProps(dispatch){
  return{
    setAll: (boardId,page,isSearching,selected,boardCategoryName) => dispatch(actionCreators.setAll(boardId,page,isSearching,selected,boardCategoryName)),
  }
}

function mapStateToProps(state) {
  return state;
}

function Operator(props) {


  //'ROLE_GUEST', 'ROLE_CLUB_EXECUTIVE', 'ROLE_MEMBER'
  const [load, setLoad] = React.useState(true);

  const [target, setTarget] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [SubCategory,setSubCategory] =React.useState(undefined);
  
  
  const [posts, setPosts] = React.useState([]); // API로 받은 값
  const [totalPage, settotalPage] = React.useState(0); // 총 페이지.
  const [groupList, setGroupList] = React.useState(null);
  const [groupId, setGroupId] = React.useState(-1)

  const [numberDirection, setNumberDirection] = React.useState(true); // 방향지정 및 이벤트. true이면 오름차순이다. false이면 내림차순
  const [gradeDirection, setGradeDirection] = React.useState(true); 
  const [studentIdDirection, setStudentIdDirection] = React.useState(true); 
  const [phoneNumberDirection, setPhoneNumberDirection] = React.useState(true); 
  const [nameDirection, setNameDirection] = React.useState(true);
  const [roleDirection, setRoleDirection] = React.useState(true); 
  const [attendanceDirection, setAttendanceDirection] = React.useState(true); 
  const [genderDirection, setGenderDirection] = React.useState(true);

  const [subScreenTitle,setSubScrrenTitle] =React.useState(null);
  
  
// 회원 목록 조회탭에 관련된 함수들.

  const loadMemberList = (direction,page,type) => { //회원 목록 조회
    axios.get(`/club/executives/members?direction=${direction}&page=${page}&size=19&type=${type}`,{
    })
    .catch(function (error) {
      console.log(error.toJSON());
    })
    .then(function (res) {
     console.log(res);
     settotalPage(res.data.data.totalPages)
     setPosts((current) => res.data.data.content)
     setLoad(true)
    });
  }

  const loadMeberSearchList = (direction,page,searchType,sortType,word) => { //회원 검색 검색어
    axios.get(`/club/executives/members/search?direction=${direction}&page=${page}&searchType=${searchType}&size=19&sortType=${sortType}&word=${word}`,{
    })
    .catch(function (error) {
      console.log(error.toJSON());
    })
    .then(function (res) {
     console.log(res);
     settotalPage(res.data.data.totalPages)
     setPosts(res.data.data.content)
     setLoad(true)
    });
  }

  const loadMemberSearchAcademicStatusesList = (direction,academicStatus,page,sortType) => { // 회원 검색 (학적상태)
    axios.get(`/club/executives/members/academic-statuses?academicStatus=${academicStatus}&direction=${direction}&page=${page}&size=19&sortType=${sortType}`,{
    })
    .catch(function (error) {
      console.log(error.toJSON());
    })
    .then(function(res){
      console.log(res);
      settotalPage(res.data.data.totalPages)
      setPosts(res.data.data.content)
      setLoad(true)
    });
  }

  const loadMemberSearchAuthoritiesList = (direction,authority,page,sortType) => { // 회원 검색 (권한)
    axios.get(`/club/executives/members/authorities?authority=${authority}&direction=${direction}&page=${page}&size=19&sortType=${sortType}`,{
    })
    .catch(function (error) {
      console.log(error.toJSON());
    })
    .then(function(res){
      console.log(res);
      console.log("회원 검색 권한 로드 완료!!!!!!");
      settotalPage(res.data.data.totalPages)
      setPosts((current) => res.data.data.content)
      setLoad(true)
    });
  }

  const loadMemberSearchGenderList = (direction,gender,page,sortType) => { // 회원 검색 (성별)
    axios.get(`/club/executives/members/genders?direction=${direction}&gender=${gender}&page=${page}&size=19&sortType=${sortType}`,{
    })
    .catch(function (error) {
      console.log(error.toJSON());
    })
    .then(function(res){
      console.log(res);
      settotalPage(res.data.data.totalPages)
      setPosts(res.data.data.content)
    });
  }

  const loadMemberSearchGradesList = (direction,grade,page,sortType) => { // 회원 검색 (학년)
    axios.get(`/club/executives/members/grades?direction=${direction}&grade=${grade}&page=${page}&size=19&sortType=${sortType}`,{
    })
    .catch(function (error) {
      console.log(error.toJSON());
    })
    .then(function(res){
      console.log(res);
      settotalPage(res.data.data.totalPages)
      setPosts(res.data.data.content)
    });
  }

  const loadMemberSearchGruopList = (direction,groupId,page,sortType) => { // 회원 검색 (그룹)
    axios.get(`/club/executives/members/groups?direction=${direction}&groupId=${groupId}&page=${page}&size=19&sortType=${sortType}`,{
    })
    .catch(function (error) {
      console.log(error.toJSON());
    })
    .then(function(res){
      console.log(res);
      settotalPage(res.data.data.totalPages)
      setPosts(res.data.data.content)
    });
  }

  const handleSearchFunction = (option) => {
    const PageReducer = props.PageReducer
    //console.log(data.option.includes("검색어"));
    if(option.includes("검색어") === true){ // 검색어 요청
      if(option === "검색어 (이름)"){
        //loadMeberSearchList = (direction,page,searchType,sortType,word)
        console.log("검색어 (이름)");
        console.log(discriminationDirection(direction));
        console.log(PageReducer.page);
        console.log(PageReducer.selected);
        console.log(PageReducer.isSearching[2]);
        loadMeberSearchList(discriminationDirection(direction),PageReducer.page,'NAME',PageReducer.selected,PageReducer.isSearching[2])
      }
      else if(option === "검색어 (학번)"){
        loadMeberSearchList(discriminationDirection(direction),PageReducer.page,'STUDENT_ID',PageReducer.selected,PageReducer.isSearching[2])
      }
      else if(option === "검색어 (번호)"){
        loadMeberSearchList(discriminationDirection(direction),PageReducer.page,'PHONE',PageReducer.selected,PageReducer.isSearching[2])
      }
      else if(option === "검색어 (학과)"){
        loadMeberSearchList(discriminationDirection(direction),PageReducer.page,'DEPARTMENT',PageReducer.selected,PageReducer.isSearching[2])
      }
    }
    else if(option === "그룹"){
      // const loadMemberSearchGruopList = (direction,groupId,page,sortType) 
      // groupId는 호출에 따라서 수행.
      console.log(groupList);
      console.log(PageReducer);
      const keyword = PageReducer.isSearching[2]
      const gruopId = (groupList.find(item => item.name === keyword))? groupList.find(item => item.name === keyword).id : null
      if(gruopId){
        loadMemberSearchGruopList(discriminationDirection(direction),gruopId,PageReducer.page,PageReducer.selected)
      }
      else{
        alert("잘못된 동아리를 입력하셨습니다. 다시 입력해주세요")
      }
    }
    else if(option === "권한"){
      console.log(PageReducer.isSearching[2]);
      const keyword = PageReducer.isSearching[2]
      console.log(keyword);
      if(keyword === "전체" || keyword === "회원" || keyword === "운영진" || keyword === "회장"){
        switch(keyword){
          case "전체":{
            loadMemberSearchAuthoritiesList(discriminationDirection(direction),"ALL",PageReducer.page,PageReducer.selected)
            break;
          }
          case "회원":{
            loadMemberSearchAuthoritiesList(discriminationDirection(direction),"MEMBER",PageReducer.page,PageReducer.selected)
            break;
          }
          case "운영진":{
            loadMemberSearchAuthoritiesList(discriminationDirection(direction),"EXECUTIVE",PageReducer.page,PageReducer.selected)
            break;
          }
          case "회장":{
            loadMemberSearchAuthoritiesList(discriminationDirection(direction),"PRESIDENT",PageReducer.page,PageReducer.selected)
            break;
          }
        }
      
      }
      else{
        alert("잘못된 검색입니다. 검색어로는 전체,회원,운영진,회장 입니다.")
      }
      // loadMemberSearchAuthoritiesList = (direction,authority,page,sortType)
      // authority를 호출에 따라서 수행
      
    }
    else if(option === "학적상태"){
      const keyword = PageReducer.isSearching[2]
      if(keyword === "재학" || keyword === "휴학" || keyword === "졸업" || keyword === "그외"){
        switch(keyword){
          case "재학":{
            loadMemberSearchAcademicStatusesList(discriminationDirection(direction),"ATTENDING",PageReducer.page,PageReducer.selected)
            break;
          }
          case "휴학":{
            loadMemberSearchAcademicStatusesList(discriminationDirection(direction),"ABSENCE",PageReducer.page,PageReducer.selected)
            break;
          }
          case "졸업":{
            loadMemberSearchAcademicStatusesList(discriminationDirection(direction),"GRADUATED",PageReducer.page,PageReducer.selected)
            break;
          }
          case "그외":{
            loadMemberSearchAcademicStatusesList(discriminationDirection(direction),"ETC",PageReducer.page,PageReducer.selected)
            break;
          }
        }
      }
      else{
        alert("잘못된 검색입니다. 검색어로는 재학,휴학,졸업,그외 입니다.")
      }
      //loadMemberSearchAcademicStatusesList = (direction,academicStatus ,page,sortType)
      
    }
    else if(option === "성별"){
      //loadMemberSearchGenderList = (direction,gender,page,sortType)
      //gender는 따로
      const keyword = PageReducer.isSearching[2]
      if(keyword === "남" || keyword === "여"){
        switch(keyword){
          case "남":{
            loadMemberSearchGenderList(discriminationDirection(direction),"MAN",PageReducer.page,PageReducer.selected)
            break;
          }
          case "여":{
            loadMemberSearchGenderList(discriminationDirection(direction),"WOMAN",PageReducer.page,PageReducer.selected)
            break;
          }
        }
      }
      else{
        alert("잘못된 검색입니다. 검색어로는 남(여) 입니다.")
      }
  
    }
    else if(option === "학년"){
    //loadMemberSearchGradesList = (direction,grade,page,sortType)
    //grade는 따로
    const keyword = PageReducer.isSearching[2]
    if(keyword === "1" || keyword === "2" || keyword === "3" || keyword === "4" || keyword === "그외"){
      switch(keyword){
        case "1":{
          loadMemberSearchGradesList(discriminationDirection(direction),"FRESHMAN",PageReducer.page,PageReducer.selected)
          break;
        }
        case "2":{
          loadMemberSearchGradesList(discriminationDirection(direction),"SOPHOMORE",PageReducer.page,PageReducer.selected)
          break;
        }
        case "3":{
          loadMemberSearchGradesList(discriminationDirection(direction),"JUNIOR",PageReducer.page,PageReducer.selected)
          break;
        }
        case "4":{
          loadMemberSearchGradesList(discriminationDirection(direction),"SENIOR",PageReducer.page,PageReducer.selected)
          break;
        }
        case "그 외":{
          loadMemberSearchGradesList(discriminationDirection(direction),"ETC",PageReducer.page,PageReducer.selected)
          break;
        }
      }
    }
    else{
      alert("잘못된 검색입니다. 검색어로는 1, 2, 3, 4, 그외 입니다.")
    }
    }
  }

  // 회원 가입 승인 탭에 관련된 함수
  const loadMemberPermissionList = (page) => { // 회원 권한 요청 목록 조회
    axios.get(`/club/executives/requests?page=${page}&role=ROLE_MEMBER&size=${19}`,{
    })
    .catch(function (error) {
      console.log(error.toJSON());
    })
    .then(function(res){
      console.log(res);
      settotalPage(res.data.data.totalPages)
      setPosts((current) => res.data.data.content)
      setLoad(true)
    });
  }

  const loadMemberPermissionSearch = (page,type,word) => {// 회원 권한 요청 목록 검색
    axios.get(`/club/executives/requests/search?page=${page}&size=19&type=${type}&word=${word}`,{
    })
    .catch(function (error) {
      console.log(error.toJSON());
    })
    .then(function(res){
      console.log(res);
      settotalPage(res.data.data.totalPages)
      setPosts((current) => res.data.data.content)
      setLoad(true)
    });
  }

  const handleMemberPermissionSearchFuntion = (option) => {
    console.log(option);
    const PageReducer = props.PageReducer
    console.log(PageReducer.isSearching[2]);
    const keyword = PageReducer.isSearching[2]
    if(option === "이름"){
      loadMemberPermissionSearch(PageReducer.page,"NAME",keyword)
    }
    else if(option === "학번"){
      loadMemberPermissionSearch(PageReducer.page,"STUDENT_ID",PageReducer.isSearching[2])
    }
  }

  //그룹 관리 API

  const loadGroupMemberList = (direction, groupId, page, role, type) => { // 그룹원 목록 조회
    axios.get(`/groups/executives/members?direction=${direction}&groupId=${groupId}&page=${page}&role=${role}&size=19&type=${type}`,{
    })
    .catch(function (error) {
      console.log(error.toJSON());
    })
    .then(function (res) {
     console.log(res);
      //setSubScrrenTitle(groupInfor.name)
      settotalPage(res.data.data.totalPages)
      setPosts(res.data.data.content)
      setLoad(true)
    });
  }

  const loadGroupSearchList = (direction,groupId,page,searchType,sortType,word ) => { //그룹원 검색(검색어
    axios.get(`/groups/executives/members/search?direction=${direction}&groupId=${groupId}&page=${page}&size=19&searchType=${searchType}&sortType=${sortType}&word=${word}`,{
    })
    .catch(function (error) {
      console.log(error.toJSON());
    })
    .then(function (res) {
     //console.log(res);
     settotalPage(res.data.data.totalPages)
     setPosts((current) => res.data.data.content)
     setLoad(true)
    });
  }

  const loadGroupSearchGradesList = (direction,groupId,page,sortType,grade) => { //그룹원 검색(학년)
    axios.get(`/groups/executives/members/grades?direction=${direction}&grade=${grade}&groupId=${groupId}&page=${page}&size=19&sortType=${sortType}`,{
    })
    .catch(function (error) {
      console.log(error.toJSON());
    })
    .then(function (res) {
     //console.log(res);
     settotalPage(res.data.data.totalPages)
     setPosts((current) => res.data.data.content)
     setLoad(true)
    });
  }

  const loadGroupSearchGenderList = (direction,groupId,page,sortType,gender) => { //그룹원 검색(성별)
    axios.get(`/groups/executives/members/grades?direction=${direction}&groupId=${groupId}&page=${page}&size=19&gender=${gender}&sortType=${sortType}`,{
    })
    .catch(function (error) {
      console.log(error.toJSON());
    })
    .then(function (res) {
     //console.log(res);
     settotalPage(res.data.data.totalPages)
     setPosts((current) => res.data.data.content)
     setLoad(true)
    });
  }

  const loadGroupSearchAcademicStatusesList = (direction,groupId,page,sortType,academicStatus) => { //그룹원 검색(학적)
    axios.get(`/groups/executives/members/academic-statuses?academicStatus=${academicStatus}&direction=${direction}&groupId=${groupId}&page=${page}&size=19&sortType=${sortType}`,{
    })
    .catch(function (error) {
      console.log(error.toJSON());
    })
    .then(function (res) {
     //console.log(res);
     settotalPage(res.data.data.totalPages)
     setPosts((current) => res.data.data.content)
     setLoad(true)
    });
  }

  const handleGroupSearchFunction = (option) => {
    const PageReducer = props.PageReducer
    if(option.includes("검색어") === true){ // 검색어 요청
      console.log(discriminationDirection(direction));
      console.log(PageReducer.page);
      console.log(PageReducer.selected);
      console.log(PageReducer.isSearching[2]);
      if(option === "검색어 (이름)"){
        //loadGroupSearchList = (direction,groupId,page,searchType,sortType,word )
        console.log("검색어 (이름)");
        loadGroupSearchList(discriminationDirection(direction),groupId,PageReducer.page,'NAME',PageReducer.selected,PageReducer.isSearching[2])
      }
      else if(option === "검색어 (학번)"){
        loadGroupSearchList(discriminationDirection(direction),groupId,PageReducer.page,'STUDENT_ID',PageReducer.selected,PageReducer.isSearching[2])
      }
      else if(option === "검색어 (번호)"){
        loadGroupSearchList(discriminationDirection(direction),groupId,PageReducer.page,'PHONE',PageReducer.selected,PageReducer.isSearching[2])
      }
      else if(option === "검색어 (학과)"){
        loadGroupSearchList(discriminationDirection(direction),groupId,PageReducer.page,'DEPARTMENT',PageReducer.selected,PageReducer.isSearching[2])
      }
    }
    else if(option === "학적상태"){
      const keyword = PageReducer.isSearching[2]
      if(keyword === "재학" || keyword === "휴학" || keyword === "졸업" || keyword === "그외"){
        switch(keyword){
          case "재학":{
            loadGroupSearchAcademicStatusesList(discriminationDirection(direction),groupId,PageReducer.page,PageReducer.selected,"ATTENDING")
            break;
          }
          case "휴학":{
            loadGroupSearchAcademicStatusesList(discriminationDirection(direction),groupId,PageReducer.page,PageReducer.selected,"ABSENCE")
            break;
          }
          case "졸업":{
            loadGroupSearchAcademicStatusesList(discriminationDirection(direction),groupId,PageReducer.page,PageReducer.selected,"GRADUATED")
            break;
          }
          case "그외":{
            loadGroupSearchAcademicStatusesList(discriminationDirection(direction),groupId,PageReducer.page,PageReducer.selected,"ETC")
            break;
          }
        }
      }
      else{
        alert("잘못된 검색입니다. 검색어로는 재학,휴학,졸업,그외 입니다.")
      }
      //loadMemberSearchAcademicStatusesList = (direction,academicStatus ,page,sortType)
      
    }
    else if(option === "성별"){
      //loadGroupSearchGenderList = (direction,groupId,page,sortType,gender)
      //gender는 따로
      const keyword = PageReducer.isSearching[2]
      if(keyword === "남" || keyword === "여"){
        switch(keyword){
          case "남":{
            loadGroupSearchGenderList(discriminationDirection(direction),groupId,PageReducer.page,PageReducer.selected,"MAN")
            break;
          }
          case "여":{
            loadGroupSearchGenderList(discriminationDirection(direction),groupId,PageReducer.page,PageReducer.selected,"WOMAN")
            break;
          }
        }
      }
      else{
        alert("잘못된 검색입니다. 검색어로는 남(여) 입니다.")
      }
  
    }
    else if(option === "학년"){
    //loadGroupSearchGradesList = (direction,groupId,page,searchType,grade) 
    //grade는 따로
    const keyword = PageReducer.isSearching[2]
    if(keyword === "1" || keyword === "2" || keyword === "3" || keyword === "4" || keyword === "그외"){
      switch(keyword){
        case "1":{
          loadGroupSearchGradesList(discriminationDirection(direction),groupId,PageReducer.page,PageReducer.selected,"FRESHMAN")
          break;
        }
        case "2":{
          loadGroupSearchGradesList(discriminationDirection(direction),groupId,PageReducer.page,PageReducer.selected,"SOPHOMORE")
          break;
        }
        case "3":{
          loadGroupSearchGradesList(discriminationDirection(direction),groupId,PageReducer.page,PageReducer.selected,"JUNIOR")
          break;
        }
        case "4":{
          loadGroupSearchGradesList(discriminationDirection(direction),groupId,PageReducer.page,PageReducer.selected,"SENIOR")
          break;
        }
        case "그 외":{
          loadGroupSearchGradesList(discriminationDirection(direction),groupId,PageReducer.page,PageReducer.selected,"ETC")
          break;
        }
      }
    }
    else{
      alert("잘못된 검색입니다. 검색어로는 1, 2, 3, 4, 그외 입니다.")
    }
    }
  }



  

  React.useEffect(()=>{
   const PageReducer = props.PageReducer
    console.log("props 값 변환");
    console.log("props 작동!!!");
    //console.log(props);
    if(SubCategory === undefined){ // 네비바에서 이동해옴.,,
      const roles = props.userReducer.roles
      const AllLeader = (roles.includes("ROLE_GROUP_PRESIDENT")&&roles.includes("ROLE_CLUB_PRESIDENT")) // 동아리 회장이자, 소모임 회장
      const ClubLeaderGroupExecutive = (roles.includes("ROLE_CLUB_PRESIDENT")&&roles.includes("ROLE_GROUP_EXECUTIVE")) // 동아리 회장, 소모임 임원
      const ClubLeader = props.userReducer.roles.includes("ROLE_CLUB_PRESIDENT") // 동아리 회장 
      const ClubExecutiveGroupLeader = (roles.includes("ROLE_GROUP_PRESIDENT")&&roles.includes("ROLE_CLUB_EXECUTIVE")) // 동아리 임원, 소모임 회장
      const GroupLeader = props.userReducer.roles.includes("ROLE_GROUP_PRESIDENT") // 소모임 회장
      const ClubExecutiveGroupExecutive = (roles.includes("ROLE_GROUP_EXECUTIVE")&&roles.includes("ROLE_CLUB_EXECUTIVE")) // 동아리 임원, 소모임 임원
      const  ClubExecutive = props.userReducer.roles.includes("ROLE_CLUB_EXECUTIVE") // 동아리 임원
      const  GroupExecutive = props.userReducer.roles.includes("ROLE_GROUP_EXECUTIVE") // 소모임 인원

      console.log(ClubExecutiveGroupExecutive);
      const category = getAuthority(AllLeader,ClubLeaderGroupExecutive,ClubLeader,ClubExecutiveGroupLeader,GroupLeader,ClubExecutiveGroupExecutive,ClubExecutive,GroupExecutive)
      console.log(AllLeader,ClubLeaderGroupExecutive,ClubLeader,ClubExecutiveGroupLeader,GroupLeader,ClubExecutiveGroupExecutive,ClubExecutive,GroupExecutive);
      console.log(category);
      axios.get(`/members/groups`,{
      })
      .catch(function (error) {
        console.log(error.toJSON());
      })
      .then(function (res) {
        //console.log(res.data.data);
        setGroupList(res.data.data)
      })

      const userReducer = props.userReducer;
     
      let groupInfor = userReducer.group.find(item => (item.role === "회장"))
      let groupId = ""
      if(groupInfor){
        console.log("회장일때!");
        console.log(groupInfor);
        setGroupId(groupInfor.id)
        setSubScrrenTitle(groupInfor.name)
        groupId = groupInfor.id
        console.log(groupId);
      }
      else if(groupInfor = userReducer.group.find(item => (item.role === "임원"))){
        groupId = groupInfor.id
        console.log("임원일때!");
        console.log(groupInfor);
        setGroupId(groupInfor.id)
        setSubScrrenTitle(groupInfor.name)
      }
      else{
        groupId = 0
        setGroupId(-1)
        setSubScrrenTitle("error")
      }
      
      
      
      if(category.find(item => item.boardName === "회원 목록 조회") !== undefined){ // 회원 목록 조회 즉 동아리 회장이거나 임원일때
        axios.get(`/club/executives/members?direction=${"ASC"}&page=${0}&size=19&type=${"ID"}`,{
        })
        .catch(function (error) {
          console.log(error.toJSON());
        })
        .then(function (res) {
         console.log(res);
         settotalPage(res.data.data.totalPages)
         setPosts(res.data.data.content)
         setTarget("회원 목록 조회")
         setPage(PageReducer.page)
         //setSelected(PageReducer.selected)
         setSubCategory(category)
         
        });
      }
      else if(category.find(item => item.boardName === "그룹 회원 목록 조회")){ // 그룹원 목록 조회 즉 소모임 회장이거나 임원일때

        axios.get(`/groups/executives/members?direction=${"ASC"}&groupId=${groupId}&page=1&role=MEMBER&size=19&type=ID`,{
        })
        .catch(function (error) {
          console.log(error.toJSON());
        })
        .then(function (res) {
         console.log(res);
          settotalPage(res.data.data.totalPages)
          setPosts(res.data.data.content)
          setTarget("그룹 회원 목록 조회")
          setPage(PageReducer.page)
          console.log("최초시행 작동!");
         setSubCategory(category)
        });
      }

    }
    else{
      if(PageReducer.boardId === "회원 목록 조회" || PageReducer.boardId === "회원 강제 탈퇴" || (PageReducer.boardId===""&&target === "회원 목록 조회") || PageReducer.boardId === "회장 위임" || PageReducer.boardId === "그룹 회장 권한 부여"){
        if(PageReducer.isSearching[0] === true){
          console.log("검색로직 작동!");
          //console.log(PageReducer);
          handleSearchFunction(PageReducer.isSearching[1])
          //loadMeberSearchList(discriminationDirection(direction),PageReducer.page,PageReducer.isSearching[1],PageReducer.selected,PageReducer.isSearching[2])
        }
        else{
          console.log("hahah");
          loadMemberList(discriminationDirection(direction),PageReducer.page,PageReducer.selected)
        }
      }
      else if(PageReducer.boardId === "회원 가입 승인 및 거절"){
        console.log("회원 가입 승인!!!");
        if(PageReducer.isSearching[0] === true){
          console.log("검색로직 작동!");
          handleMemberPermissionSearchFuntion(PageReducer.isSearching[1])
        }
        else{
          loadMemberPermissionList(PageReducer.page)
        }
      }
      else if(PageReducer.boardId === "회원 권한 부여"){ // 추후 load 필요
        if(PageReducer.isSearching[0] === true){
          console.log("회원 권한 부여 검색로직 작동!");
          //console.log(PageReducer);
          handleSearchFunction(PageReducer.isSearching[1])
          //loadMeberSearchList(discriminationDirection(direction),PageReducer.page,PageReducer.isSearching[1],PageReducer.selected,PageReducer.isSearching[2])
        }
      }
      else if(PageReducer.boardId === "운영진 권한 부여 및 회원 권한 해제"){ // 추후 load 변경
        console.log("운영진 권한 부여 및 회원 권한 해제 로직 작동!");
        loadMemberSearchAuthoritiesList(discriminationDirection(direction),"MEMBER",PageReducer.page,PageReducer.selected)
      }//loadMemberSearchAuthoritiesList
      else if(PageReducer.boardId === "운영진 권한 해제"){ // 추후 load 변경
        console.log("운영진 권한 해제 로직 작동!");
        loadMemberSearchAuthoritiesList(discriminationDirection(direction),"EXECUTIVE",PageReducer.page,PageReducer.selected)
      }
      else if(PageReducer.boardId ==="그룹 회원 목록 조회" || target === "그룹 회원 목록 조회"){

        if(PageReducer.isSearching[0] === true){
          console.log("그룹 회원 목록 조회의 검색로직 작동!");
          handleGroupSearchFunction(PageReducer.isSearching[1])
        }
        else{
          loadGroupMemberList(discriminationDirection(direction),groupId,PageReducer.page,"MEMBER",PageReducer.selected)
        }
      }
      else if(PageReducer.boardId === "그룹 가입 승인"){
        if(PageReducer.isSearching[0] === true){
          console.log("그룹 가입 승인의 검색로직 작동!");
          handleGroupSearchFunction(PageReducer.isSearching[1])
        }
        else{
          loadGroupMemberList(discriminationDirection(direction),groupId,PageReducer.page,"APPLICANT",PageReducer.selected)
        }
      }
      else if(PageReducer.boardId === "그룹 강제 탈퇴" || PageReducer.boardId === "그룹 임원 권한 부여"){

        if(PageReducer.isSearching[0] === true){
          console.log("검색로직 작동!");
          handleGroupSearchFunction(PageReducer.isSearching[1])
        }
        else{
          loadGroupMemberList(discriminationDirection(direction),groupId,PageReducer.page,"MEMBER",PageReducer.selected)
        }
      }
      else if(PageReducer.boardId === "그룹 회장 위임 및 임원 권한 해제"){

        if(PageReducer.isSearching[0] === true){
          console.log("검색로직 작동!");
          handleGroupSearchFunction(PageReducer.isSearching[1])
        }
        else{
          loadGroupMemberList(discriminationDirection(direction),groupId,PageReducer.page,"EXECUTIVE",PageReducer.selected)
        }
      }
    }
    
  },[props])

  React.useEffect(()=>{
    if(SubCategory !== undefined){
      console.log("target작동");
      const PageReducer = props.PageReducer
      const boardId = target
      console.log(boardId);
      //setSelected("LASTEST")
      direction = true;
      sortDirection("dafalut")
      setLoad(false)
      props.setAll(boardId,1,[false],"ID",PageReducer.boardCategoryName)
    }
  },[target])

  React.useEffect(()=>{
    if(SubCategory !== undefined){
      console.log("page작동");
      const PageReducer = props.PageReducer
      props.setAll(PageReducer.boardId,page,PageReducer.isSearching,PageReducer.selected,PageReducer.boardCategoryName)
    }
  },[page])

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  const handleSearching = (data,e) => { // 사용자가 검색을 했을때
    console.log(data);
    const PageReducer = props.PageReducer
    //let searchType = "" // 검색 타입 Available values : NAME, STUDENT_ID, DEPARTMENT, PHONE
    // let searchType
    // switch(data.option){
    //   case():
    // }

    //console.log(data.option.includes("검색어"));

    props.setAll(PageReducer.boardId,1,[true,data.option,data.keyword],PageReducer.selected,PageReducer.boardCategoryName)
  }

  const handleNumber = () => {
    const PageReducer = props.PageReducer
    direction = !numberDirection
    setNumberDirection((current)=> !current)
    const sortType = "ID"
    props.setAll(PageReducer.boardId,PageReducer.page,PageReducer.isSearching,sortType,PageReducer.boardCategoryName)
  }

  const sortDirection = (type) => { // 클릭한 항목을 제외, UI적으로 변경하는 함수
    switch(type){
      case "Number":{
        setGradeDirection(true)
        setStudentIdDirection(true)
        setPhoneNumberDirection(true)
        setNameDirection(true)
        setRoleDirection(true)
        setAttendanceDirection(true)
        setGenderDirection(true)
        break;
      }
      case "Grade":{
        setNumberDirection(true)
        setStudentIdDirection(true)
        setPhoneNumberDirection(true)
        setNameDirection(true)
        setRoleDirection(true)
        setAttendanceDirection(true)
        setGenderDirection(true)
        break;
      }
      case "StudentId":{
        setNumberDirection(true)
        setGradeDirection(true)
        setPhoneNumberDirection(true)
        setNameDirection(true)
        setRoleDirection(true)
        setAttendanceDirection(true)
        setGenderDirection(true)
        break;
      }
      case "PhoneNumber":{
        setNumberDirection(true)
        setGradeDirection(true)
        setStudentIdDirection(true)
        setNameDirection(true)
        setRoleDirection(true)
        setAttendanceDirection(true)
        setGenderDirection(true)
        break;
      }
      case "Name":{
        setNumberDirection(true)
        setGradeDirection(true)
        setStudentIdDirection(true)
        setPhoneNumberDirection(true)
        setRoleDirection(true)
        setAttendanceDirection(true)
        setGenderDirection(true)
        break;
      }
      case "Attendance":{
        setNumberDirection(true)
        setGradeDirection(true)
        setStudentIdDirection(true)
        setPhoneNumberDirection(true)
        setNameDirection(true)
        setRoleDirection(true)
        setGenderDirection(true)
        break;
      }
      case "Gender":{
        setNumberDirection(true)
        setGradeDirection(true)
        setStudentIdDirection(true)
        setPhoneNumberDirection(true)
        setNameDirection(true)
        setRoleDirection(true)
        setAttendanceDirection(true)
        break;
      }
      default:{
        setNumberDirection(true)
        setGradeDirection(true)
        setStudentIdDirection(true)
        setPhoneNumberDirection(true)
        setNameDirection(true)
        setRoleDirection(true)
        setAttendanceDirection(true)
        setGenderDirection(true)
      }
    }
  }

  const handleSort = (type) => { // 클릭시 새롭게 페이지를 로드를 유발하는 함수
    const PageReducer = props.PageReducer
    let sortType
   
    switch(type){
      case "Number":{ 
        direction = !numberDirection
        console.log(direction);
        setNumberDirection((current)=> !current)
        sortType = "ID"
        console.log("번호 호출");
        
      }
      case "Grade":{
        direction = !gradeDirection
        setGradeDirection((current)=> !current)
        sortType = "GRADE"
        console.log("학년 호출");
        break;
        
      }
      case "StudentId":{
        direction = !studentIdDirection
        setStudentIdDirection((current)=> !current)
        sortType = "STUDENT_ID"
        console.log("학번 호출");
        break;
      }
      case "PhoneNumber":{
        direction = !phoneNumberDirection
        setPhoneNumberDirection((current)=> !current)
        sortType = "PHONE"
        console.log("번호 호출");
        break;
      }
      case "Name":{
        direction = !nameDirection
        setNameDirection((current)=> !current)
        sortType = "NAME"
        console.log("이름 호출");
        break;
      }
      case "Attendance":{
        direction = !attendanceDirection
        setAttendanceDirection((current)=> !current)
        sortType = "ACADEMIC_STATUS"
        console.log("학적 호출");
        break;
      }
      case "Gender":{
        direction = !genderDirection
        setGenderDirection((current)=> !current)
        sortType = "GENDER"
        console.log("성별 호출");
        break;
      }
      default:{

      }
    }
    sortDirection(type)
    props.setAll(PageReducer.boardId,PageReducer.page,PageReducer.isSearching,sortType,PageReducer.boardCategoryName)
    
  }
  
  return (
    <>
    <PageTitle title="운영" />
    <SideBar posts={SubCategory} getFilter={setTarget} target={target}></SideBar>
    <Content>
    {((target === "그룹 가입 승인")||(target === "그룹 강제 탈퇴")||(target === "그룹 임원 권한 부여")||(target === "그룹 회장 위임"))?
    <ScreenTitle>{target} | {subScreenTitle}</ScreenTitle>
    :
    <ScreenTitle>{target}</ScreenTitle>
    }
    
    {((target === "회원 목록 조회")||(target === "회원 강제 탈퇴")||(target === "운영진 권한 부여")||(target === "그룹 회장 위임")||(target === "회장 위임")||(target === "그룹 회장 권한 부여")||(target === "회원 권한 부여"))?
      <SearchBarSection>
      <SearchBarForm onSubmit={handleSubmit(handleSearching)}>
        <SearchBarSelect {...register("option")} >
              <option >{`검색어 (이름)`}</option>
              <option >{`검색어 (학번)`}</option>
              <option >{`검색어 (번호)`}</option>
              <option >{`검색어 (학과)`}</option>
              <option >그룹</option>
              <option >권한</option>
              <option >학년</option>
              <option >학적상태</option>
              <option >성별</option>
          </SearchBarSelect>
        <SearchBar>
        <SearchBarInput {...register("keyword", { required: true })} />
            <SearchBarSubmit type="submit" value="" />
        </SearchBar>
      </SearchBarForm>
    </SearchBarSection>
    :
    null
    } 

    
    {(props.PageReducer.boardId === "회원 가입 승인 및 거절")?
        <SearchBarSection>
        <SearchBarForm onSubmit={handleSubmit(handleSearching)}>
          <SearchBarSelect {...register("option")} >
                <option >이름</option>
                <option >학번</option>
            </SearchBarSelect>
          <SearchBar>
          <SearchBarInput {...register("keyword", { required: true })} />
              <SearchBarSubmit type="submit" value="" />
          </SearchBar>
        </SearchBarForm>
      </SearchBarSection>
    :
    null
    }
   
  {((target === "그룹 회원 목록 조회"))?
    <SearchBarSection>
    <SearchBarForm onSubmit={handleSubmit(handleSearching)}>
      <SearchBarSelect {...register("option")} >
            <option >{`검색어 (이름)`}</option>
            <option >{`검색어 (학번)`}</option>
            <option >{`검색어 (번호)`}</option>
            <option >{`검색어 (학과)`}</option>
            <option >학년</option>
            <option >학적상태</option>
            <option >성별</option>
        </SearchBarSelect>
      <SearchBar>
      <SearchBarInput {...register("keyword", { required: true })} />
          <SearchBarSubmit type="submit" value="" />
      </SearchBar>
    </SearchBarForm>
  </SearchBarSection>
  :
  null
  }
  {((target === "전체 동아리원 초기화")||(target ==="게시판 추가 및 삭제"))
  ?
  null
  :
  <InforBar>
  <InforContents>
    {(numberDirection === true) ?
      <Number onClick={(e)=>{handleNumber()}}>번호<InforSelection src={img} ></InforSelection></Number>
      :
      <Number onClick={(e)=>{handleNumber()}}>번호<InforSelection src={img} desc ></InforSelection></Number>
    }
    {(gradeDirection === true) ?
      <Grade onClick={(e)=>{handleSort("Grade")}}>학년<InforSelection src={img} ></InforSelection></Grade>
      :
      <Grade onClick={(e)=>{handleSort("Grade")}}>학년<InforSelection src={img} desc></InforSelection></Grade>
    }
    {(studentIdDirection === true) ?
      <StudentId onClick={(e)=>{handleSort("StudentId")}}>학번<InforSelection src={img}></InforSelection></StudentId>
      :
      <StudentId onClick={(e)=>{handleSort("StudentId")}}>학번<InforSelection src={img} desc></InforSelection></StudentId>
    }
    {(phoneNumberDirection === true) ?
      <PhoneNumber onClick={(e)=>{handleSort("PhoneNumber")}}>연락처<InforSelection src={img}></InforSelection></PhoneNumber>
      :
      <PhoneNumber onClick={(e)=>{handleSort("PhoneNumber")}}>연락처<InforSelection src={img} desc></InforSelection></PhoneNumber>
    }
    {(nameDirection === true) ?
      <Name onClick={(e)=>{handleSort("Name")}}>이름<InforSelection src={img}></InforSelection></Name>
      :
      <Name onClick={(e)=>{handleSort("Name")}}>이름<InforSelection src={img} desc></InforSelection></Name>
    }
      <Role>회원직책</Role>
    {(attendanceDirection === true) ?
      <Attendance onClick={(e)=>{handleSort("Attendance")}}>학적<InforSelection src={img}></InforSelection></Attendance>
      :
      <Attendance onClick={(e)=>{handleSort("Attendance")}}>학적<InforSelection src={img} desc></InforSelection></Attendance>
    }
    {(genderDirection === true) ?
      <Gender onClick={(e)=>{handleSort("Gender")}}>성별<InforSelection src={img}></InforSelection></Gender>
      :
      <Gender onClick={(e)=>{handleSort("Gender")}}>성별<InforSelection src={img} desc></InforSelection></Gender>
    }
    {(target !== "회원 목록 조회") ? <Check>버튼</Check> : null}
  </InforContents>
</InforBar>
  }


    
      {(load)?
      <>
            {(target === "회원 목록 조회" && posts !== []) ?
              <PostMemberBar data={posts} type={""}/>
              :
              null
            }

            {(props.PageReducer.boardId === "회원 가입 승인 및 거절" && posts !== []) ?
              <PostMemberPermissionBar data={posts} type={"회원 가입 승인 및 거절"}/>
              :
              null   
            }

            {(props.PageReducer.boardId === "회원 권한 부여" && posts !== []) ?
              <PostMemberBar data={posts} type={"회원 권한 부여"} />
              :
              null
            }

            {(props.PageReducer.boardId === "운영진 권한 부여 및 회원 권한 해제" && posts !== []) ?
              <PostMemberBar data={posts} type={"운영진 권한 부여 및 회원 권한 해제"} />
              :
              null  //운영진 권한 해제
            }

            {(props.PageReducer.boardId === "운영진 권한 해제" && posts !== []) ?
              <PostMemberBar data={posts} type={"운영진 권한 해제"} />
              :
              null
            }

            {(props.PageReducer.boardId === "그룹 회장 권한 부여" && posts !== []) ?
              <PostMemberBar data={posts} type={"그룹 회장 권한 부여"} groupList={groupList}/>
              :
              null
            }

            {(props.PageReducer.boardId === "회원 강제 탈퇴" && posts !== [])?
              <PostMemberExpulsionBar data={posts} />
              :
              null
            }

            {(props.PageReducer.boardId === "회장 위임" && posts !== []) ?
              <PostMemberBar data={posts} type={"회장 위임"} />
              :
              null
            }

            {(target === "그룹 회원 목록 조회" && posts !== [] ) ?
              <PostGroupPermissionBar data={posts} groupId={groupId} type={"그룹 회원 목록 조회"}/>
              :
              null
            }

            {(target === "그룹 가입 승인" && posts !== [] ) ?
              <PostGroupPermissionBar data={posts} groupId={groupId} type={"그룹 가입 승인"}/>
              :
              null
            }

            {(target === "그룹 강제 탈퇴" && posts !== [] ) ?
              <PostGroupPermissionBar data={posts} groupId={groupId} type={"그룹 강제 탈퇴"}/>
              :
              null
            }

            {(target === "그룹 임원 권한 부여" && posts !== [] ) ?
              <PostGroupPermissionBar data={posts} groupId={groupId} type={"그룹 임원 권한 부여"}/>
              :
              null
            }

            {(target === "그룹 회장 위임 및 임원 권한 해제" && posts !== [] ) ?
              <PostGroupPermissionBar data={posts} groupId={groupId} type={"그룹 회장 위임 및 임원 권한 해제"}/>
              :
              null
            }
      </>

      :
      null
      }

        {(target === "게시판 추가 및 삭제") ?
          <>
            <BoardEdit  groupList={groupList} />
          </>
          :
          null
        }
     
     {(target === "전체 동아리원 초기화" ) ?
              <ResetAllMember/>
              :
              null
      }

{((target === "전체 동아리원 초기화")||(target ==="게시판 추가 및 삭제"))?
  null
:
<Pagination
total={totalPage}
limit={19}
page={page}
setPage={setPage}
/>
}

    </Content>
    </>
  );
}
export default connect(mapStateToProps,mapDispatchToProps)(Operator);
