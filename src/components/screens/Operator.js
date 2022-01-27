import * as React from "react";
import PageTitle from "../shared/PageTitle";
import ScreenTitle from "../shared/ScreenTitle";
import SideBar from "../shared/SideBar";
import { Content } from "../shared/Content";
import {SearchBarSection,SearchBarForm,SearchBarSelect,SearchBar,SearchBarInput,SearchBarSubmit,InforBar,InforContents,Number,
  Grade,StudentId,Major,Apply,Name,Role,Attendance,Age,Permission,Withdraw,PostInforBar,PostCotent} from "./../shared/BoardElement.js"
import { useForm } from "react-hook-form";
import Pagination from "../shared/Pagination";

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
  const [page, setPage] = React.useState(1);
  React.useEffect(()=>{
    console.log(target);
    setTest("test")
  },[target])

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <>
    <PageTitle title="운영" />
    <SideBar posts={subCategory} getFilter={setTarget}></SideBar>
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
