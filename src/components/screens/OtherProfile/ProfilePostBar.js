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
} from "./../Profile/ProfilePostBarElements";
import { HashLink } from "react-router-hash-link";
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return state;
}

const Test = styled.span`
  padding-left: 10px;
  z-index: 20;
`;

const splitDate = (data) => {
  const date = data.split("|");
  const ymd = date[0];
  return ymd;
};

function ProfilePostBar(props) 
{
  console.log(props);
  const { data } = props;

  console.log(data);

  const isAuthority = props?.userReducer?.roles?.some((i) =>
      [
        "ROLE_CLUB_EXECUTIVE",
        "ROLE_CLUB_PRESIDENT",
      ].includes(i)
    );

  function pickBoardCategory(linkHeader) {
    if (linkHeader === "게시판") {
      console.log(linkHeader);
      return "board";
    } else if (linkHeader === "스터디") {
      return "study";
    } else if (linkHeader === "공지사항") {
      return "announce";
    } else if (linkHeader === "소모임") {
      return "group";
    }
  }

  // const postdata = data.map((data, i) => (
  
  //  <PostInforBar key={i + 1}>
  //   {(data.secretFlag === true)?
  //     <>
  //         {(isAuthority == true) ?
  //           <>
              
  //               <PostCotent>
  //                 <BoardName>
  //                   {data.boardCategory} / {data.board}
  //                 </BoardName>
  //                 <Title>
  //                   {console.log(
  //                     data.boardCategory,
  //                     pickBoardCategory(data.boardCategory)
  //                   )}
  //                   <Link to={`/${pickBoardCategory(data.boardCategory)}/${data.postId}`}>
  //                     {data.title}
  //                   </Link>
  //                   <HashLink
  //                     to={`/${pickBoardCategory(data.boardCategory)}/${data.postId}`}
  //                   >
  //                     <Test>[{data.postReplies}]</Test>
  //                   </HashLink>
  //                 </Title>
  //                 <Writer>{data.memberName}</Writer>

  //                 <Date>{splitDate(data.createdDate)}</Date>
  //                 <Recommendation>{data.postLike}</Recommendation>
  //                 <Hits>{data.postView}</Hits>
  //               </PostCotent>
           
  //           </>
  //           :
  //           <>
             
  //               <PostCotent>
  //                 <BoardName>
  //                   {data.boardCategory} / {data.board}
  //                 </BoardName>
  //                 <Title>
  //                   {console.log(
  //                     data.boardCategory,
  //                     pickBoardCategory(data.boardCategory)
  //                   )}
  //                   <>
  //                     {"비밀글입니다."}
  //                   </>
  //                     <Test>[{data.postReplies}]</Test>
  //                 </Title>
  //                 <Writer>{data.memberName}</Writer>

  //                 <Date>{splitDate(data.createdDate)}</Date>
  //                 <Recommendation>{data.postLike}</Recommendation>
  //                 <Hits>{data.postView}</Hits>
  //               </PostCotent>
              
  //           </>}
  //     </>
  //     :
  //       <>
          
  //           <PostCotent>
  //             <BoardName>
  //               {data.boardCategory} / {data.board}
  //             </BoardName>
  //             <Title>
  //               {console.log(
  //                 data.boardCategory,
  //                 pickBoardCategory(data.boardCategory)
  //               )}
  //               <Link to={`/${pickBoardCategory(data.boardCategory)}/${data.postId}`}>
  //                 {data.title}
  //               </Link>
  //               <HashLink
  //                 to={`/${pickBoardCategory(data.boardCategory)}/${data.postId}`}
  //               >
  //                 <Test>[{data.postReplies}]</Test>
  //               </HashLink>
  //             </Title>
  //             <Writer>{data.memberName}</Writer>

  //             <Date>{splitDate(data.createdDate)}</Date>
  //             <Recommendation>{data.postLike}</Recommendation>
  //             <Hits>{data.postView}</Hits>
  //           </PostCotent>
          
  //       </>
  //   }

  //  </PostInforBar>

 
  // ));

  return <>{"문제 없음!"}</>;
}

export default React.memo(connect(ProfilePostBar));

