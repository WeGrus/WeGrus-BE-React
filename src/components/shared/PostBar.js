import styled from "styled-components";
import * as React from "react"
import { Link } from "react-router-dom";
import {PostInforBar,PostCotent,Categorization,Title,Writer,Date,Hits,Recommendation,Bold} from "./BoardElement"
import { faVolumeOff  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HashLink   } from 'react-router-hash-link';

const Number = styled.div`
min-width: 65px;
text-align: center;
margin-left: 23px;
`
const Test = styled.span`
padding-left:10px;
z-index: 20;
`

const activeBoldWeight = `
font-weight: bold;
`

const splitDate = (data) => {
  const date = data.split('|')
  const ymd = date[0]
  return ymd
}

function PostBar({target,page,data,userReducer}) {
    const limit = 19;
    const offset = (page-1)*limit;
    const number = (page-1)*16;
    console.log(data);
    console.log(userReducer);
    const isAuthority = userReducer.roles.some(i => ["ROLE_GROUP_EXECUTIVE","ROLE_GROUP_PRESIDENT","ROLE_CLUB_EXECUTIVE","ROLE_CLUB_PRESIDENT"].includes(i))
    // console.log("PostBar에서의 location값");
    // console.log(selected);

  const postdata = data.map((data, i) =>
    <PostInforBar key={i + 1}>
      {(data.secretFlag === true) ? // 비밀글일때,
        <>
          {(isAuthority === true || data.memberId === userReducer.id) ?
            <PostCotent>
              <Number>{(i + 1) + number}</Number>
              <Title>
                <Link to={`${(i + 1) + number}`} state={{ category: "커뮤니티", subCategory: target, postId: data.postId }}  >
                  {"비밀글 "+ data.title}
                </Link>
                <HashLink to="1#commentTag" state={{ category: "커뮤니티", subCategory: target, postId: data.postId }} >
                  <Test>
                    [{data.postReplies}]
                  </Test>
                </HashLink >
              </Title>
              <Writer>{data.memberName}</Writer>
              <Date>{splitDate(data.createdDate)}</Date>
              <Recommendation>{data.postLike}</Recommendation>
              <Hits>{data.postView}</Hits>
            </PostCotent>
            :
            <PostCotent>
            <Number>{(i + 1) + number}</Number>
            <Title>
                {"비밀글 입니다."} 
                <Test>
                  [{data.postReplies}]
                </Test>
            </Title>
            <Writer>{"작성자"}</Writer>
            <Date>{splitDate(data.createdDate)}</Date>
            <Recommendation>{data.postLike}</Recommendation>
            <Hits>{data.postView}</Hits>
          </PostCotent>
          }
        </>
        :
        <> 
          {(data.type === "NORMAL") ? // 비밀글이 아닐때.
            <PostCotent>
              <Number>{(i + 1) + number}</Number>

              <Title>
                <Link to={`${(i + 1) + number}`} state={{ category: "커뮤니티", subCategory: target, postId: data.postId }}  >
                  {data.title}
                </Link>
                <HashLink to="1#commentTag" state={{ category: "커뮤니티", subCategory: target, postId: data.postId }} >
                  <Test>
                    [{data.postReplies}]
                  </Test>
                </HashLink >
              </Title>
              <Writer>{data.memberName}</Writer>
              <Date>{splitDate(data.createdDate)}</Date>
              <Recommendation>{data.postLike}</Recommendation>
              <Hits>{data.postView}</Hits>
            </PostCotent>
            :
            <PostCotent bold>
              <Number><FontAwesomeIcon icon={faVolumeOff} color="#0B665C" /></Number>
              <Title>
                <Link to={`${(i + 1) + number}`} state={{ category: "커뮤니티", subCategory: target, postId: data.postId }}  >
                  {data.title}
                </Link>
                <HashLink to="1#commentTag" state={{ category: "커뮤니티", subCategory: target, postId: data.postId }} >
                  <Test>
                    [{data.postReplies}]
                  </Test>
                </HashLink >
              </Title>
              <Writer>{data.memberName}</Writer>
              <Date>{splitDate(data.createdDate)}</Date>
              <Recommendation>{data.postLike}</Recommendation>
              <Hits>{data.postView}</Hits>
            </PostCotent>
          }
        </>

      }


    </PostInforBar>

  )
    

    return (
        <>
            {postdata}
        </>
    );
  }

export default PostBar;