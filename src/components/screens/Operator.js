import * as React from "react";
import PageTitle from "../shared/PageTitle";
import ScreenTitle from "../shared/ScreenTitle";
import SideBar from "../shared/SideBar";
import { Content } from "../shared/Content";

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
    </Content>
    </>
  );
}
export default Operator;
