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
  const [selected, setSelected] = React.useState("") // 정렬타입 즉 학년 학번 이런 것들.
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
  


  const loadMemberList = (direction,page,type) => {
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

  const loadMeberSearchList = (direction,page,searchType,sortType,word) => {
    axios.get(`/club/executives/search?direction=${direction}&page=${page}&searchType=${searchType}&size=19&sortType=${sortType}&word=${word}`,{
      headers: { 'Authorization': `Bearer ${props.userReducer.token}` }
    })
    .catch(function (error) {
      console.log(error.toJSON());
    })
    .then(function (res) {
     console.log(res);
     //settotalPage(res.data.data.totalPages)
     //setPosts(res.data.data.content)
    });
  }

  React.useEffect(()=>{
    const PageReducer = props.PageReducer
    console.log("props 값 변환");
    console.log(props);
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
       setSelected(PageReducer.selected)
       setSubCategory(category)
      });
    }
    else{
      if(PageReducer.isSearching[0] === true){
        loadMeberSearchList(discriminationDirection(direction),PageReducer.page,PageReducer.isSearching[1],PageReducer.selected,PageReducer.isSearching[2])
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

  const handleNumber = () => {
    const PageReducer = props.PageReducer
    direction = !numberDirection
    setNumberDirection((current)=> !current)
    const sortType = "ID"
    props.setAll(PageReducer.boardId,PageReducer.page,PageReducer.isSearching,sortType,PageReducer.boardCategoryName)
  }

  const sortDirection = (type) => {
    switch(type){
      case "Number":{
        setGradeDirection(true)
        setStudentIdDirection(true)
        setPhoneNumberDirection(true)
        setNameDirection(true)
        setRoleDirection(true)
        setAttendanceDirection(true)
        setGenderDirection(true)
      }
      case "Grade":{
        setNumberDirection(true)
        setStudentIdDirection(true)
        setPhoneNumberDirection(true)
        setNameDirection(true)
        setRoleDirection(true)
        setAttendanceDirection(true)
        setGenderDirection(true)
      }
      case "StudentId":{
        setNumberDirection(true)
        setGradeDirection(true)
        setPhoneNumberDirection(true)
        setNameDirection(true)
        setRoleDirection(true)
        setAttendanceDirection(true)
        setGenderDirection(true)
      }
      case "PhoneNumber":{
        setNumberDirection(true)
        setGradeDirection(true)
        setStudentIdDirection(true)
        setNameDirection(true)
        setRoleDirection(true)
        setAttendanceDirection(true)
        setGenderDirection(true)
      }
      case "Name":{
        setNumberDirection(true)
        setGradeDirection(true)
        setStudentIdDirection(true)
        setPhoneNumberDirection(true)
        setRoleDirection(true)
        setAttendanceDirection(true)
        setGenderDirection(true)
      }
      case "Attendance":{
        setNumberDirection(true)
        setGradeDirection(true)
        setStudentIdDirection(true)
        setPhoneNumberDirection(true)
        setNameDirection(true)
        setRoleDirection(true)
        setGenderDirection(true)
      }
      case "Gender":{
        setNumberDirection(true)
        setGradeDirection(true)
        setStudentIdDirection(true)
        setPhoneNumberDirection(true)
        setNameDirection(true)
        setRoleDirection(true)
        setAttendanceDirection(true)
      }
    }
  }

  const handleSort = (type) => {
    const PageReducer = props.PageReducer
    let sortType
    switch(type){
      case "Number":{
        direction = !numberDirection
        setNumberDirection((current)=> !current)
        sortType = "ID"
      }
      case "Grade":{
        direction = !gradeDirection
        setGradeDirection((current)=> !current)
        sortType = "GRADE"
      }
      case "StudentId":{
        direction = !studentIdDirection
        setStudentIdDirection((current)=> !current)
        sortType = "STUDENT_ID"
      }
      case "PhoneNumber":{
        direction = !phoneNumberDirection
        setPhoneNumberDirection((current)=> !current)
        sortType = "PHONE"
      }
      case "Name":{
        direction = !nameDirection
        setNameDirection((current)=> !current)
        sortType = "NAME"
      }
      case "Attendance":{
        direction = !attendanceDirection
        setAttendanceDirection((current)=> !current)
        sortType = "ACADEMIC_STATUS"
      }
      case "Gender":{
        direction = !genderDirection
        setGenderDirection((current)=> !current)
        sortType = "GENDER"
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
      <SearchBarForm onSubmit={handleSubmit(onSubmit)}>
        <SearchBarSelect {...register("option")} >
              <option >소모임</option>
              <option >이름</option>
              <option >학번</option>
          </SearchBarSelect>
        <SearchBar>
        <SearchBarInput {...register("exampleRequired", { required: true })} />
            <SearchBarSubmit type="submit" value="" />
        </SearchBar>
      </SearchBarForm>
    </SearchBarSection>
    
        <InforBar>
          <InforContents>
            {(numberDirection === true) ?
              <Number onClick={(e)=>{handleSort("Number")}}>번호<InforSelection src={img} ></InforSelection></Number>
              :
              <Number onClick={(e)=>{handleSort("Number")}}>번호<InforSelection src={img} desc ></InforSelection></Number>
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
