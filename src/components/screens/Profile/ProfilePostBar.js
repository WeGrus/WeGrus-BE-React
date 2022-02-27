import styled from "styled-components";
import * as React from "react";
import { Link } from "react-router-dom";
import {
  PostInforBar,
  PostCotent,
  Title,
  BoardName,
  Date,
  Hits,
  Recommendation,
  Bold,
  Writer,
  Number,
} from "./ProfilePostBarElements";
import { HashLink } from "react-router-hash-link";

const Test = styled.span`
  padding-left: 10px;
  z-index: 20;
`;

const splitDate = (data) => {
  const date = data.split("|");
  const ymd = date[0];
  return ymd;
};

function ProfilePostBar(props) {
  const { page, data, userReducer, linkHeader } = props;
  // 기존의 postBar에서 userReducer가 추가되었습니다. 변경하고 나서 문제가 생기실 수도 있으니 한번 확인해주시길 바랍니다.
  const number = (page - 1) * 16;
  console.log(linkHeader);
  if (linkHeader === "게시판") {
    linkHeader = "board";
  } else if (linkHeader === "스터디") {
    linkHeader = "study";
  } else if (linkHeader === "공지사항") {
    linkHeader = "announce";
  } else if (linkHeader === "소모임") {
    linkHeader = "group";
  }
  console.log(linkHeader);
  const postdata = data.map((data, i) => (
    <PostInforBar key={i + 1}>
      <PostCotent>
        <BoardName>
          {data.boardCategory} / {data.board}
        </BoardName>
        <Title>
          <Link to={`/${linkHeader}/${data.postId}`}>{data.title}</Link>
          <HashLink to={`/${linkHeader}/${data.postId}`}>
            <Test>[{data.postReplies}]</Test>
          </HashLink>
        </Title>
        <Writer>{data.memberName}</Writer>

        <Date>{splitDate(data.createdDate)}</Date>
        <Recommendation>{data.postLike}</Recommendation>
        <Hits>{data.postView}</Hits>
      </PostCotent>
    </PostInforBar>
  ));

  return <>{postdata}</>;
}

export default ProfilePostBar;
