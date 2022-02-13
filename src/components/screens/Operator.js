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
import { actionCreators } from "./../../store";

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
  { boardName: "회원 가입 승인" },
  { boardName: "회원 강제 탈퇴" },
  { boardName: "그룹 가입 승인" },
  { boardName: "운영진 권한 부여"},
];

const authority = (permissionSignUp,quitMember,permissionGroup,giverManagement) =>{
  if(permissionSignUp&&quitMember&&permissionGroup&&giverManagement){ // 회장일때
    //console.log("hahah");
    return subCategory
  }
  else if(permissionSignUp&&quitMember){ // 동아리 임원일때
    //console.log("동아리 임원일때");
    console.log(subCategory.filter(item => (item.boardName !== "그룹 가입 승인")&&(item.boardName !== "운영진 권한 부여")));
    return subCategory.filter(item => (item.boardName !== "그룹 가입 승인")&&(item.boardName !== "운영진 권한 부여"))
  }
  else if(permissionGroup){ // 소그룹장일때
    //console.log("소그룹장일때");
    return subCategory.filter(item => item.boardName !== (item.boardName !== "회원 가입 승인")&&(item.boardName !== "회원 강제 탈퇴")&&(item.boardName !=="운영진 권한 부여"))
  }
  else{ //소그룹 임원일때
    //console.log("소그룹 임원일때");
    return subCategory.filter(item => item.boardName === ("회원 목록 조회"))
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

  const [target, setTarget] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [SubCategory,setSubCategory] =React.useState(undefined);
  
  const [posts, setPosts] = React.useState(null); // API로 받은 값
  const [totalPage, settotalPage] = React.useState(0); // 총 페이지.

  const [numberDirection, setNumberDirection] = React.useState(true); // 방향지정 및 이벤트. true이면 오름차순이다. false이면 내림차순
  const [gradeDirection, setGradeDirection] = React.useState(true); 
  const [studentIdDirection, setStudentIdDirection] = React.useState(true); 
  const [phoneNumberDirection, setPhoneNumberDirection] = React.useState(true); 
  const [nameDirection, setNameDirection] = React.useState(true);
  const [roleDirection, setRoleDirection] = React.useState(true); 
  const [attendanceDirection, setAttendanceDirection] = React.useState(true); 
  const [genderDirection, setGenderDirection] = React.useState(true);
  


  const loadMemberList = (direction,page,type) => { //회원 목록 조회
    axios.get(`/club/executives/members?direction=${direction}&page=${page}&size=19&type=${type}`,{
      headers: { 'Authorization': `Bearer ${props.userReducer.token}` }
    })
    .catch(function (error) {
      console.log(error.toJSON());
    })
    .then(function (res) {
     console.log(res);
     settotalPage(res.data.data.totalPages)
     setPosts(res.data.data.content)
    });
  }

  const loadMeberSearchList = (direction,page,searchType,sortType,word) => { //회원 검색 검색어
    axios.get(`/club/executives/members/search?direction=${direction}&page=${page}&searchType=${searchType}&size=19&sortType=${sortType}&word=${word}`,{
      headers: { 'Authorization': `Bearer ${props.userReducer.token}` }
    })
    .catch(function (error) {
      console.log(error.toJSON());
    })
    .then(function (res) {
     console.log(res);
     settotalPage(res.data.data.totalPages)
     setPosts(res.data.data.content)
    });
  }

  const loadMemberSearchAcademicStatusesList = (direction,academicStatus ,page,sortType) => { // 회원 검색 (학적상태)
    axios.get(`/club/executives/members/authorities?academicStatus =${academicStatus }&direction=${direction}&page=${page}&size=19&sortType=${sortType}`,{
      headers: {'Authorization': `Bearer ${props.userReducer.token}`}
    })
    .catch(function (error) {
      console.log(error.toJSON());
    })
    .then(function(res){
      console.log(res);
    });
  }

  const loadMemberSearchAuthoritiesList = (direction,authority,page,sortType) => { // 회원 검색 (권한)
    axios.get(`/club/executives/members/authorities?authority=${authority}&direction=${direction}&page=${page}&size=19&sortType=${sortType}`,{
      headers: {'Authorization': `Bearer ${props.userReducer.token}`}
    })
    .catch(function (error) {
      console.log(error.toJSON());
    })
    .then(function(res){
      console.log(res);
    });
  }

  const loadMemberSearchGenderList = (direction,gender,page,sortType) => { // 회원 검색 (성별)
    axios.get(`/club/executives/members/genders?direction=${direction}&gender=${gender}&page=${page}&size=19&sortType=${sortType}`,{
      headers: {'Authorization': `Bearer ${props.userReducer.token}`}
    })
    .catch(function (error) {
      console.log(error.toJSON());
    })
    .then(function(res){
      console.log(res);
    });
  }

  const loadMemberSearchGradesList = (direction,grade,page,sortType) => { // 회원 검색 (학년)
    axios.get(`/club/executives/members/grades?direction=${direction}&grade=${grade}&page=${page}&size=19&sortType=${sortType}`,{
      headers: {'Authorization': `Bearer ${props.userReducer.token}`}
    })
    .catch(function (error) {
      console.log(error.toJSON());
    })
    .then(function(res){
      console.log(res);
    });
  }

  const loadMemberSearchGruopList = (direction,groupId,page,sortType) => { // 회원 검색 (그룹)
    axios.get(`/club/executives/members/groups?direction=${direction}&groupId=${groupId}&page=${page}&size=19&sortType=${sortType}`,{
      headers: {'Authorization': `Bearer ${props.userReducer.token}`}
    })
    .catch(function (error) {
      console.log(error.toJSON());
    })
    .then(function(res){
      console.log(res);
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
      loadMemberSearchGruopList(discriminationDirection(direction),3,PageReducer.page,PageReducer.selected)
    }
    else if(option === "권한"){
      // loadMemberSearchAuthoritiesList = (direction,authority,page,sortType)
      // authority를 호출에 따라서 수행
      loadMemberSearchAuthoritiesList(discriminationDirection(direction),"ALL",PageReducer.page,PageReducer.selected)
    }
    else if(option === "학적상태"){
      //loadMemberSearchAcademicStatusesList = (direction,academicStatus ,page,sortType)
      loadMemberSearchAcademicStatusesList(discriminationDirection(direction),"ATTENDING",PageReducer.page,PageReducer.selected)
    }
    else if(option === "성별"){
      //loadMemberSearchGenderList = (direction,gender,page,sortType)
      //gender는 따로
      loadMemberSearchGenderList(discriminationDirection(direction),"MAN",PageReducer.page,PageReducer.selected)
    }
    else if(option === "학년"){
    //loadMemberSearchGradesList = (direction,grade,page,sortType)
    //grade는 따로
      loadMemberSearchGradesList(discriminationDirection(direction),"FRESHMAN",PageReducer.page,PageReducer.selected)
    }
  }

  React.useEffect(()=>{
   const PageReducer = props.PageReducer
    console.log("props 값 변환");
    //console.log(props);
    if(SubCategory === undefined){
      const listofMember =   props.userReducer.roles.some(i => ["ROLE_GROUP_EXECUTIVE","ROLE_GROUP_PRESIDENT","ROLE_CLUB_EXECUTIVE","ROLE_CLUB_PRESIDENT"].includes(i)) // 목록조회
      const permissionSignUp = props.userReducer.roles.some(i => ["ROLE_CLUB_EXECUTIVE","ROLE_CLUB_PRESIDENT"].includes(i)) // 회원가입 승인
      const quitMember = props.userReducer.roles.some(i => ["ROLE_CLUB_EXECUTIVE","ROLE_CLUB_PRESIDENT"].includes(i)) // 회원 탈퇴
      const permissionGroup = (props.userReducer.roles.some(i => ["ROLE_GROUP_PRESIDENT","ROLE_CLUB_PRESIDENT"].includes(i))||true) // 그룹 승인 허가
      const giverManagement = (props.userReducer.roles.some(i => ["ROLE_CLUB_PRESIDENT"].includes(i))||true) // 운영진 권한 부여
      const category = authority(permissionSignUp,quitMember,permissionGroup,giverManagement)

      axios.get(`/club/executives/members?direction=${"ASC"}&page=${0}&size=19&type=${"ID"}`,{
        headers: { 'Authorization': `Bearer ${props.userReducer.token}` }
      })
      .catch(function (error) {
        console.log(error.toJSON());
      })
      .then(function (res) {
       //console.log(res);
       settotalPage(res.data.data.totalPages)
       setPosts(res.data.data.content)
       setTarget(PageReducer.boardId)
       setPage(PageReducer.page)
       //setSelected(PageReducer.selected)
       setSubCategory(category)
      });
    }
    else{
      if(PageReducer.isSearching[0] === true){
        console.log("검색로직 작동!");
        console.log(PageReducer);
        handleSearchFunction(PageReducer.isSearching[1])
        //loadMeberSearchList(discriminationDirection(direction),PageReducer.page,PageReducer.isSearching[1],PageReducer.selected,PageReducer.isSearching[2])
      }
      else{
        loadMemberList(discriminationDirection(direction),PageReducer.page,PageReducer.selected)
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
      props.setAll(boardId,1,[false],"LASTEST",PageReducer.boardCategoryName)
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
    //console.log(data);
    const PageReducer = props.PageReducer
    //let searchType = "" // 검색 타입 Available values : NAME, STUDENT_ID, DEPARTMENT, PHONE
    // let searchType
    // switch(data.option){
    //   case():
    // }

    //console.log(data.option.includes("검색어"));

    props.setAll(PageReducer.boardId,1,[true,data.option,data.keyword],PageReducer.selected,PageReducer.boardCategoryName)
    // setSelected("최신순")
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
    <ScreenTitle>{target}</ScreenTitle>
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
            {(roleDirection === true) ?
              <Role onClick={(e)=>{handleSort("")}}>회원직책<InforSelection src={img}></InforSelection></Role>
              :
              <Role onClick={(e)=>{handleSort("")}}>회원직책<InforSelection src={img} desc></InforSelection></Role>
            }
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

    {/* <PostInforBar>
      <PostCotent>
        <Number>3548</Number>
        <Grade>2</Grade>
        <StudentId>15487145</StudentId>
        <PhoneNumber>101-1542-1424</PhoneNumber>
        <Name>김승태김승태김승태</Name>
        <PostRole>운영진</PostRole>
        <PostAttendance>휴학</PostAttendance>
        <PostGender>남</PostGender>
        {(target !== "회원 목록 조회")?<CheckBtn></CheckBtn>:null}
      </PostCotent>
    </PostInforBar> */}

    

    {
      (posts !== null) ?
      <PostMemberBar data={posts}/>
      :
       null
    }

    <Pagination
            total={totalPage}
            limit={19}
            page={page}
            setPage={setPage}
        />
    </Content>
    </>
  );
}
export default connect(mapStateToProps,mapDispatchToProps)(Operator);
