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
} from "./../../shared/BoardElement";
import { faVolumeOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HashLink } from "react-router-hash-link";

const Number = styled.div`
  min-width: 65px;
  text-align: center;
  margin-left: 23px;
`;
const Test = styled.span`
  padding-left: 10px;
  z-index: 20;
`;

const activeBoldWeight = `
font-weight: 600;
`;

const splitDate = (data) => {
  const date = data.split("|");
  const ymd = date[0];
  return ymd;
};

function ProfilePostBar({ target, page, data, userReducer }) {
  // 기존의 postBar에서 userReducer가 추가되었습니다. 변경하고 나서 문제가 생기실 수도 있으니 한번 확인해주시길 바랍니다.
  const limit = 19;
  const offset = (page - 1) * limit;
  const number = page * 16;
  console.log(data);
  console.log(userReducer);
  const isAuthority = userReducer.roles.some((i) =>
    [
      "ROLE_GROUP_EXECUTIVE",
      "ROLE_GROUP_PRESIDENT",
      "ROLE_CLUB_EXECUTIVE",
      "ROLE_CLUB_PRESIDENT",
    ].includes(i)
  );

  const postdata = data.map((data, i) => (
    <PostInforBar key={i + 1}>
      <PostCotent>
        <Number>{i + 1 + number}</Number>

        <Title>
          <Link
            to={`${i + 1 + number}`}
            state={{
              category: "커뮤니티",
              subCategory: target,
              postId: data.postId,
            }}
          >
            {data.title}
          </Link>
          <HashLink
            to="1#commentTag"
            state={{
              category: "커뮤니티",
              subCategory: target,
              postId: data.postId,
            }}
          >
            <Test>[{data.postReplies}]</Test>
          </HashLink>
        </Title>
        <BoardName>{data.boardCategory}</BoardName>
        <Date>{splitDate(data.createdDate)}</Date>
        <Recommendation>{data.postLike}</Recommendation>
        <Hits>{data.postView}</Hits>
      </PostCotent>
    </PostInforBar>
  ));

  return <>{postdata}</>;
}

export default ProfilePostBar;
