import axios from "axios";
import * as React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { Link, Outlet, useLocation,useParams } from "react-router-dom";
import styled from "styled-components";
import PageTitle from "../../shared/PageTitle";
import Pagination from "../../shared/Pagination";
import PostBar from "../../shared/PostBar";
import ScreenTitle from "../../shared/ScreenTitle";
import SideBar from "../../shared/SideBar";
import img from "./../../../images/Polygon.jpg";
import { Content } from "./ProfileElements";
import SavedPosts from "./SavedPosts";
import UserAccount from "./UserAccount";
import UserComments from "./UserComments";
import UserGroup from "./UserGroup";
import UserInfo from "./UserInfo";
import UserPosts from "./UserPosts";

const mapStateToProps = (state) => {
  return state;
};

const mappingParamBoardName = [
    {param: "infor", boardName: "정보"},
    {param: "posts", boardName: "게시글"},
    {param: "comments", boardName: "댓글"},
    {param: "scrap", boardName: "저장한 게시글"},
]

const mapping = (param) => {
    const boardName = mappingParamBoardName.find((item) => item.param === param).boardName
    return boardName
}

function OtherProfile(props) {
  const location = useLocation();
  const param = useParams();

  const [target, setTarget] = React.useState(null);
  const [info, setInfo] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [load, setLoad] = React.useState(false); // load유무로 location의 값이 바뀐 뒤에 렌더

  const DATA = props.userReducer;
  const input = useLocation();
  let renderComponent = null;

  React.useEffect(()=>{
      axios.get(`/members/info/${param.userid}`)
      .catch(function (error) {
        console.log(error.toJSON());
      })
      .then(function (res) {
        console.log(res);
        setInfo(res.data.info)
        setTarget(mapping(param.category));
        if (param.category === "infor") {
            renderComponent = <UserInfo data={res.data.info} />;
        }
        // else if (param.category === "posts") {
        //     renderComponent = <UserGroup />;
        // } 
        // else if (param.category === "comments") {
        //     renderComponent = <UserPosts />;
        // } 
        // else if (target === "scrap") {
        //     renderComponent = <UserComments />;
        // }
      })
  },[location])

  return (
    <>
      <PageTitle title="프로필" />
      <SideBar
            posts={mappingParamBoardName}
            getFilter={setTarget}
            target={target}
            linkHeader={"profile"}
            userId={param.userId}
          ></SideBar>
      <Content>
        <ScreenTitle>{`프로필 | ${target}`}</ScreenTitle>
        {renderComponent}
      </Content>
    </>
  );
}
export default connect(mapStateToProps)(OtherProfile);