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

const Number = styled.div`
width: 40px;
text-align: left;
margin-left: 44px;
position: relative;
word-spacing: -3px;
`


const subCategory = [
  { filter: "회원 목록 조회" },
  { filter: "회원 가입 승인" },
  { filter: "회원 강제 탈퇴" },
  { filter: "그룹 가입 승인" },
  { filter: "운영진 권한 부여" },
];

function Operator() {

  const [target, setTarget] = React.useState("회원 목록 조회");
  const [page, setPage] = React.useState(1);
  React.useEffect(()=>{
    setPage(1)
  },[target])

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <>
    <PageTitle title="운영" />
    <SideBar posts={subCategory} getFilter={setTarget} target={target}></SideBar>
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
        <Number>번호<InforSelection src={img}></InforSelection></Number>
        <Grade>학년<InforSelection src={img}></InforSelection></Grade>
        <StudentId>학번<InforSelection src={img}></InforSelection></StudentId>
        <PhoneNumber>연락처<InforSelection src={img}></InforSelection></PhoneNumber>
        <Name>이름<InforSelection src={img}></InforSelection></Name>
        <Role>회원직책<InforSelection src={img}></InforSelection></Role>
        <Attendance>학적<InforSelection src={img}></InforSelection></Attendance>
        <Gender>성별<InforSelection src={img}></InforSelection></Gender>
        {(target !== "회원 목록 조회")?<Check>버튼</Check>:null}
      </InforContents>
    </InforBar>

    <PostInforBar>
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
    </PostInforBar>

    <Pagination
          total = {4}
          limit={19}
          page={page}
          setPage={setPage}
        />
    </Content>
    </>
  );
}
export default Operator;
