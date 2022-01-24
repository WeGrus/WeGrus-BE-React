import * as React from "react";
import PageTitle from "../shared/PageTitle";
import ScreenTitle from "../shared/ScreenTitle";
import SideBar from "../shared/SideBar";
import { Content } from "../shared/Content";
import {SearchBarSection,SearchBarForm,SearchBarSelect,SearchBar,SearchBarInput,SearchBarSubmit,InforBar,InforContents,Number,
  Grade,StudentId,Major,Apply,Name,Role,Attendance,Age,Permission,Withdraw,PostInforBar,PostCotent} from "./../shared/OperatorElement"
const subCategory = [
  { filter: "회원 목록 조회" },
  { filter: "회원 가입 승인" },
  { filter: "회원 강제 탈퇴" },
  { filter: "그룹 가입 승인" },
  { filter: "운영진 권한 부여" },
];

function Operator() {

  const [target, setTarget] = React.useState("회원 목록 조회");
  const [test, setTest] = React.useState("")
  React.useEffect(()=>{
    console.log(target);
    setTest("test")
  },[target])

  return (
    <>
    <PageTitle title="운영" />
    <SideBar posts={subCategory} getFilter={setTarget}></SideBar>
    <Content>
    <ScreenTitle>{target}</ScreenTitle>
    <SearchBarSection>
      <SearchBarForm>
        <SearchBarSelect></SearchBarSelect>
        <SearchBar>
          <SearchBarInput></SearchBarInput>
          <SearchBarSubmit></SearchBarSubmit>
        </SearchBar>
      </SearchBarForm>
    </SearchBarSection>
    <InforBar>
      <InforContents>
        <Number>번호</Number>
        <Grade>학년</Grade>
        <StudentId>학번</StudentId>
        <Major>학과</Major>
        <Apply>소그룹 희망</Apply>
        <Name>이름</Name>
        <Role>회원직책</Role>
        <Attendance>재학</Attendance>
        <Age>나이</Age>
        <Permission>허가</Permission>
        <Withdraw>탈퇴</Withdraw>
      </InforContents>
    </InforBar>
    <PostInforBar>
      <PostCotent>
        <Number></Number>
        <Grade></Grade>
        <StudentId></StudentId>
        <Major></Major>
        <Apply></Apply>
        <Name></Name>
        <Role></Role>
        <Attendance></Attendance>
        <Age></Age>
        <Permission></Permission>
        <Withdraw></Withdraw>
      </PostCotent>
    </PostInforBar>
    </Content>
    </>
  );
}
export default Operator;
