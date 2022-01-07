import * as React from 'react';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";

const Background = styled.div`
  width: 1240px;
  height: 1240px;          
  background-color: white;
`;

const Content = styled.div`
width: 924px;
margin: auto;
display: flex;
flex-direction: column;
`;

const Category = styled.div`
font-size: 18px;
font-weight: 700;
color: #0B665C;
margin-top: 38px;
margin-bottom: 16px;
`;

const Header = styled.div`
padding-bottom: 16px;
border-bottom: 2px solid #0B665C;
margin-bottom: 42px;
`
const Title = styled.div`
width: 924px;
height: 21px;
font-size: 18px;
font-weight: 700;
border: none;
margin-bottom: 10px;
`

const OtherDetail = styled.div`
padding-bottom: 16px;
height: 16px;
font-size: 14px;
text-align: justify;
`

const Right = styled.span`
float: right;
`

const CommentInfor = styled.div`
font-weight: 700;
font-size: 14px;
margin-top: 49px;
margin-bottom: 6px;
`

const Description = styled.div`
width: 924px;
margin: auto;
border-bottom: 2px solid #0B665C;
position: relative;
`

const Recommand = styled.button`
width: 53px;
height: 32px;
font-size: 14px;
color: white;
background-color: #6CD2D7;
border:none;
border-radius: 15px;
position: absolute;
right: 0px;
bottom: 6px;
cursor: pointer;
`

const Comments = styled.div`
height: max-content;
`

const Comment = styled.div`
display: flex;
flex-direction: row;
align-items: center;
padding-top: 10px;
padding-bottom: 8px;
font-size: 14px;
line-height: 16px;
border-bottom: 1px solid #555555;
position: relative
`

const CommentContent = styled.div`
margin-left: 49px;
`

const Recode = styled.div`
position: absolute;
right: 0
`
const CommentRecommand = styled.button`
margin-right: 10px;
background-color: white;
border: none;
cursor: pointer;
`

const CommentDelete = styled.button`
margin-left: 10px;
background-color: white;
border: none;
cursor: pointer;
`

const CommentCorrection = styled.button`
margin-left: 10px;
background-color: #6CD2D7;
border: none;
border-radius: 10px;
cursor: pointer;
color : white;
`

const CommentWriteSection = styled.div`
display: flex;
flex-direction: row;
height: 62px;
margin-top: 9px;
padding-bottom: 13px;
border-bottom: 2px solid #0B665C;

`

const CommentWrite = styled.textarea`
width: 832px;
border-radius: 15px;
`

const CommentSubmit = styled.button`
width: 78.39px;
color: white;
background-color: #0B665C;
border:none;
border-radius: 15px;
margin-left: 14px;
cursor: pointer;
`

const BtnSection = styled.div`
margin-top: 12.5px;
`

const GoToList = styled.button`
width: 127px;
height: 32px;
border: none;
border-radius: 15px;
color: white;
background-color: #6CD2D7;
font-size: 14px;
cursor: pointer;
`

const Correction = styled.button`
width: 53px;
height: 32px;
border: none;
border-radius: 15px;
color: white;
background-color: #6CD2D7;
font-size: 14px;
cursor: pointer;
`

const Delete = styled.button`
width: 53px;
height: 32px;
border: none;
border-radius: 15px;
color: white;
background-color: #6CD2D7;
font-size: 14px;
margin-left: 9px;
cursor: pointer;
`
const example = ` <p>본문을 적어주세요.fsdfdsfsdfdsf</p>
<p>fdsfsfsdf</p><p>fwefwef</p><p>fsfsdfsdf</p><ul>
  <li class="task-list-item" data-task="true"><p>코드는 깔끔한가?</p></li>
  <li class="task-list-item" data-task="true"><p>이해하기 쉽게 직관적인가?</p></li>
  <li class="task-list-item" data-task="true"><p><br class="ProseMirror-trailingBreak"></p></li></ul> `;
// editor에 넣을 예제값이다.

let getPage = { // page의 정보
  countOfRecommend: 0, // 게시글의 추천수
  isRecommend: false,  //서버에서 이 유저가 게시글에 추천을 했는지 확인한다. true면 추천한 것이다.
  author : "김승태",
  date : "2021.12.21",
  time : "23:44"
}

let userInfor = {
  userName: "김승태"
}


const checkRecommend = (isRecommend) => {
  if(isRecommend){
    return "추천취소"
  }
  else{
    return "추천"
  }

}

function Page(props) {
    const t = useParams();
    const filter = useLocation().state;
    const [countOfRecommend, setCountOfRecommend] = React.useState(getPage.countOfRecommend); // 게시글 추천수
    const [isRecommend,setIsRecommend] = React.useState(checkRecommend(getPage.isRecommend)); // 게시글 추천 유무 확인에 따라 값 변경.


    const postRecommand = () => {
      if(isRecommend === "추천취소"){
        setCountOfRecommend((count)=>count-1);
        setIsRecommend("추천")
        // 서버에도 변경사항 적용될수 있게 변경사항 보내기.
      }
      else{
        setCountOfRecommend((count)=>count+1);
        setIsRecommend("추천취소")
      }
    }
  



  return (
    <div>
      <Background>
        <Content>
          <Category>{filter.category}|{filter.subCategory}</Category>
          <Header>
            <Title>{"플러터 스터디 모집합니다. 초보자 환영입니다."}</Title>
            <OtherDetail>{getPage.author}|{getPage.date}|{getPage.time}<Right>조회 143|추천 {countOfRecommend}|댓글3</Right></OtherDetail>
          </Header>
          <Description>
          <Viewer initialValue={example}/>
          <CommentInfor>댓글 3개</CommentInfor>
          <Recommand value="추천" onClick={postRecommand}>{isRecommend}</Recommand>
          </Description>
          <Comments>
            <Comment>
              <div>두바이 석유왕자</div>
              <CommentContent>우와~ 저도 참여할게요.</CommentContent>
              <Recode>
                <CommentRecommand>👍️ 추천수:30</CommentRecommand>
                21/12/21 | 23:14:24
                <CommentCorrection>수정</CommentCorrection>
                <CommentDelete>❌</CommentDelete>
                </Recode>
            </Comment>
          </Comments>
          <CommentWriteSection>
            <CommentWrite placeholder="  댓글 작성 시 네티켓을 지켜주세요."></CommentWrite>
            <CommentSubmit>댓글 등록</CommentSubmit>
          </CommentWriteSection>
          <BtnSection>
            <GoToList>목록으로</GoToList>
            {(getPage.author === userInfor.userName) ?  // user의 이름과 게시글 작성자가 같다면 보여주고 아니라면 편집기능 구현 x
              <div style={{ float: "right" }}>
                <Correction>수정</Correction>
                <Delete>삭제</Delete>
              </div>
            :
             null}
          </BtnSection>
        </Content>
      </Background>

    </div>
  );
  }
  export default Page;