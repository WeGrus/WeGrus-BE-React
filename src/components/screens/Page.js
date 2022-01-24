import * as React from 'react';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as ReactDOM from 'react-dom';

const Background = styled.div`
  width: 1240px;        
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
width: 88px;
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
max-width: 608px;
min-height: 96.22px;
`

const Recode = styled.div`
position: absolute;
top:10px;
right: 0
`
const CommentRecommand = styled.button`
background-color: white;
border: 1px solid black;
border-radius: 15px;
width: 62px;
height: 29.22;
cursor: pointer;
`

const CommentDelete = styled.button`
margin-right: 2.98px;
background-color: white;
border: 1px solid black;
border-radius: 15px;
width: 49.02px;
height: 29.22;
cursor: pointer;
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
padding-bottom: 12.5px;
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

const CommentName = styled.div`
width: 109px;
`

const CommentLeft = styled.div`
min-width: 109px;
`

const CommentNameBox = styled.div`
min-width: 109px;
position: relative;
margin-bottom: 74px;
display: flex;
`

const ReCommentName = styled.div`
width: 20px;
font-size: 14px;
`
const CommentOwnerBtn = styled.div`
position: absolute;
bottom: 7.78px;
`

const CommentUpdate = styled.button`
margin-right: 2.98px;
background-color: white;
border: 1px solid black;
border-radius: 15px;
width: 49.02px;
height: 29.22;
cursor: pointer;
`

const CommentBtnSection = styled.div`
position: absolute;
bottom: 7.78px;
right: 0px;
`
const ReCommentWrite = styled.button`
margin-left: 7px;
background-color: white;
border: 1px solid black;
border-radius: 15px;
width: 62px;
height: 29.22;
cursor: pointer;
`

let getPage = { // 서버에서 가져온 page의 정보라고 가정.
  title: "플러터 스터디 모집합니다. 초보자 환영입니다.",
  isSecret: false,
  countOfRecommend: 0, // 게시글의 추천수
  isRecommend: false,  //서버에서 이 유저가 게시글에 추천을 했는지 확인한다. true면 추천한 것이다.
  author: "김승태",
  date: "2021.12.21",
  time: "23:44",
  example: ` <p>본문을 적어주세요.fsdfdsfsdfdsf</p>
  <p>fdsfsfsdf</p><p>fwefwef</p><p>fsfsdfsdf</p><ul>
  <li class="task-list-item" data-task="true"><p>코드는 깔끔한가?</p></li>
  <li class="task-list-item" data-task="true"><p>이해하기 쉽게 직관적인가?</p></li>
  <li class="task-list-item" data-task="true"><p><br class="ProseMirror-trailingBreak"></p></li></ul> `
  // editor에 넣을 예제값이다.
}

const geCommentInfor = [ // 서버에서 가져온 data라고 가정한다면.
  {
    commentNumber: 3,
    commentWriter: "두바이 석유왕자",
    text: "우와~ 저도 참여할게요.",
    recommand: 30,
    date: "21/12/21",
    time: "23:14:24",
  },
  {
    commentNumber: 4,
    commentWriter: "김승태",
    text: "우와~ 저도 참여할게요.!!!!",
    recommand: 25,
    date: "21/12/21",
    time: "23:14:24",
  }
]

const getReCommentInfor = [
  {
    parentNumber: 3,
    commentNumber: 15,
    commentWriter: "아랍 제벌부자",
    text: "좋습니다!",
    recommand: 2,
    date: "21/12/21",
    time: "23:14:24",
  },
  {
    parentNumber: 3,
    commentNumber: 16,
    commentWriter: "김승태",
    text: "저도 좋습니다!",
    recommand: 2,
    date: "21/12/21",
    time: "23:14:24",
  },
  {
    parentNumber: 4,
    commentNumber: 17,
    commentWriter: "김승태",
    text: "저도 좋습니다!",
    recommand: 2,
    date: "21/12/21",
    time: "23:14:24",
  },
  {
    parentNumber: 5,
    commentNumber: 18,
    commentWriter: "김승태",
    text: "저도 좋습니다!",
    recommand: 2,
    date: "21/12/21",
    time: "23:14:24",
  }
]

let userInfor = {
  userName: "김승태",
  userId: "testId"
}

const checkRecommend = (isRecommend) => {
  if (isRecommend) {
    return "추천취소"
  }
  else {
    return "추천"
  }

}

const createdTime = () => {
  const DATE = new Date();
  let year = DATE.getFullYear(); // 년도
  let month = DATE.getMonth() + 1;  // 월
  let date = DATE.getDate();  // 날짜
  let hours = DATE.getHours(); // 시
  let minutes = DATE.getMinutes();  // 분
  let seconds = DATE.getSeconds();  // 초

  let today = (year + '/' + month + '/' + date)
  let time = (hours + ':' + minutes + ':' + seconds)
  return {date: today,
          time: time};
}

const checkBlank = (value) => { // 댓글을 입력할 때 공백만 입력하는지 확인하는 함수. ex) comment = "         " 이런 값일 때.
  let isBlank = true;
  for(let i=0; i<value.length; i++){
    if(value[i] !== " "){
      isBlank = false;
      break;
    }
  }
  return isBlank
}



function Page(props) {
  const params = useParams();
  const filter = useLocation().state;
  const [countOfRecommend, setCountOfRecommend] = React.useState(getPage.countOfRecommend); // 게시글 추천수
  const [isRecommend, setIsRecommend] = React.useState(checkRecommend(getPage.isRecommend)); // 게시글 추천 유무 확인에 따라 값 변경.
  const [comment,setComment] = React.useState("") // 댓글 입력칸
  const [placeholder, setPlaceholder] = React.useState("  댓글 작성 시 네티켓을 지켜주세요.")
  const [commentInfor, setCommentInfor] = React.useState(geCommentInfor); // 댓글 정보
  const [reCommentInfor,setReCommentInfor] = React.useState(getReCommentInfor)
  const [checkSubmitBtn, setCheckSubmitBtn] = React.useState(0) // 0이면 댓글 등록이고 다른 숫자이면 수정하는 댓글의 index이다. 
  const Navigate = useNavigate();
  const [test,setTest] = React.useState(null);
  const [commentIndex,setCommentIndex] = React.useState(-1);
 
  const reCommentEl = React.useRef();
  const reCommentUpdateEl = React.useRef();
  const postRecommand = () => {
    if (isRecommend === "추천취소") {
      setCountOfRecommend((count) => count - 1);
      setIsRecommend("추천")
      // 서버에도 변경사항 적용될수 있게 변경사항 보내기.
    }
    else {
      setCountOfRecommend((count) => count + 1);
      setIsRecommend("추천취소")
    }
  }

  const handleDeleteClick = () => {
    //axios로 delete하고 다시 보드 보여주기.
    let value = window.confirm("해당게시물을 삭제하겠습니까?")
    if (value) {
      //axios로 delete
      console.log("삭제");
      Navigate("/board", {
        state: { category: filter.subCategory }
      })
    }

    return value;
  }

  const handleCommentSubmit = (e) => {
    if(checkBlank(comment)){ // 댓글을 달지 않고 버튼을 클릭했을 때.
      setPlaceholder("  내용이 없는 댓글은 등록하실 수 없습니다.")
    }
    else{
      const today = createdTime();
      let temp  = [...commentInfor];
      temp.push(
        {
          commentNumber: commentInfor[commentInfor.length - 1].commentNumber+1,
          commentWriter: userInfor.userName,
          text: comment,
          recommand: 0,
          date: today.date,
          time: today.time
        }
      )
      setComment("");
      setCommentInfor(temp);
    }
  }

  const handleCommentUpdate = (e) => { // 댓글 수정버튼 누른 후, 댓글 등록 버튼 누를 시에 동작
    let i = 0;
    for(i;i<commentInfor.length; i++){
      if(commentInfor[i].commentNumber == checkSubmitBtn){
        const today = createdTime();
        let temp  = [...commentInfor];
        temp[i].text = comment;
        temp[i].date =  today.date;
        temp[i].time = today.time;
        setCommentInfor(temp);
        setCheckSubmitBtn(0);
        setComment("");
        break;
      }
    }
    
  }

  const handleCommentUpdateBtn = (e) => { // 댓글 수정 버튼 누를 시에 동작하는 함수
    const index = e.target.parentNode.dataset.index
    let i = 0;
    for(i;i<commentInfor.length; i++){
      if(commentInfor[i].commentNumber == index){
        console.log(commentInfor[i].text)
        setComment(commentInfor[i].text)
        setCheckSubmitBtn(index)
        break;
      }
    }
  }
  
  const handleCommentDelete = (e) => {
    const index = e.target.parentNode.dataset.index
    let i = 0;
    for(i;i<commentInfor.length; i++){
      if(commentInfor[i].commentNumber == index){
        let temp  = [...commentInfor]
        temp.splice(i,1)
        setCommentInfor(temp);
        break;
        //바뀐 거 보내주기
      }
    }

  }

  const toggleCommentRecommand = (e) => { // 댓글 추천 함수
    const index = e.target.dataset.index
    let i = 0;
    for(i;i<commentInfor.length; i++){
      if(commentInfor[i].commentNumber == index){
        //먼저 추천했는지 확인 만약 추천했다면 추천 취소 
        let temp  = [...commentInfor];
        temp[i].recommand = commentInfor[i].recommand+1;
        setCommentInfor(temp)
      }
    }
  }

  const handleReCommentWirte = (e) => { // 대댓글을 작성하기 위한 함수
    let index =e.target.parentNode.parentNode.id;
    if(index === commentIndex)
      index = -1
    setCommentIndex(index);
  }

  const handleReCommentSubmit = (e) => { // 대댓글을 전송하는 함수 
    const index = Number(reCommentEl.current.dataset.index)
    const recomment= reCommentEl.current.value;
    if(checkBlank(recomment)){ // 댓글을 달지 않고 버튼을 클릭했을 때.
      reCommentEl.current.placeholder="  내용이 없는 댓글은 등록하실 수 없습니다."
    }
    else{
      const today = createdTime();
      let temp  = [...reCommentInfor];
      console.log(temp);
      temp.push(
        {
          parentNumber: index,
          commentNumber: reCommentInfor[reCommentInfor.length - 1].commentNumber+1,
          commentWriter: userInfor.userName,
          text: recomment,
          recommand: 0,
          date: today.date,
          time: today.time
        }
      )
      reCommentEl.current.value = "";
      reCommentEl.current.placeholder="  댓글 작성 시 네티켓을 지켜주세요."
      setReCommentInfor(temp);
    }
  }

  const handleReCommentUpdate = (e) => { 
    const index = Number(reCommentUpdateEl.current.dataset.index)
    const recomment= reCommentUpdateEl.current.value;
    if(checkBlank(recomment)){ // 댓글을 달지 않고 버튼을 클릭했을 때.
      reCommentUpdateEl.current.placeholder="  내용이 없는 댓글은 등록하실 수 없습니다."
    }
    else{
      const today = createdTime();

      let i = 0;

      for(i;i<reCommentInfor.length; i++){
        if(reCommentInfor[i].commentNumber == index){
          let temp  = [...reCommentInfor];
          temp[i].text = recomment;
          temp[i].date =  today.date;
          temp[i].time = today.time;
          setReCommentInfor(temp);
          setCommentIndex(-1)
          break;
        }
      }

    }
  }

  const handleReCommentUpdateBtn = (e) => { // 대댓글 수정 버튼을 눌렀을 때 함수 실행
    let index =e.target.parentNode.parentNode.parentNode.id;
    if(index === commentIndex)
    index = -1
    setCommentIndex(index);
  }
  
  const handleReCommentDelete = (e) => {
    const index = e.target.parentNode.parentNode.parentNode.id;

    let i = 0;
    for(i;i<reCommentInfor.length; i++){
      if(reCommentInfor[i].commentNumber == index){
        let temp  = [...reCommentInfor]
        temp.splice(i,1)
        setReCommentInfor(temp);
        break;
        //바뀐 거 보내주기
      }
    }
  }

  const toggleReCommentRecommand = (e) => {
    const index = e.target.dataset.index
    let i = 0;
    for(i;i<reCommentInfor.length; i++){
      if(reCommentInfor[i].commentNumber == index){
        //먼저 추천했는지 확인 만약 추천했다면 추천 취소 
        let temp  = [...reCommentInfor];
        temp[i].recommand = reCommentInfor[i].recommand+1;
        setReCommentInfor(temp)
        break
      }
    }
  }

  const printComment = commentInfor.map(comment=>
    <div key={comment.commentNumber}>
    <Comment key={comment.commentNumber} id = {comment.commentNumber} >
      <CommentLeft>
        <CommentNameBox>
          {(comment.isReComment === true)?
          <ReCommentName>ㄴ</ReCommentName>
          :
          null
          }
          <CommentName>{comment.commentWriter}</CommentName>
        </CommentNameBox>
        {(comment.commentWriter === userInfor.userName) ?
          <CommentOwnerBtn data-index={comment.commentNumber}>
            <CommentUpdate onClick={handleCommentUpdateBtn}>수정</CommentUpdate>
            <CommentDelete onClick={handleCommentDelete}>삭제</CommentDelete>
          </CommentOwnerBtn>
          :
          null
        }
        </CommentLeft>
        
        <CommentContent>{comment.text}</CommentContent>
        
          
          <Recode  data-index={comment.commentNumber} >
            {comment.date} | {comment.time}
          </Recode>
          {(typeof userInfor != 'undefined')?  
            <CommentBtnSection>
               <CommentRecommand data-index={comment.commentNumber} onClick={toggleCommentRecommand}>추천 <span>{comment.recommand}</span></CommentRecommand>
               {(comment.isReComment != true)?
                <ReCommentWrite onClick={handleReCommentWirte}>댓글 {reCommentInfor.filter(item => item.parentNumber === comment.commentNumber).length}</ReCommentWrite>
               :
               null
               }    
            </CommentBtnSection>
            :
            <CommentBtnSection>
                 <CommentRecommand >추천 <span>{comment.recommand}</span></CommentRecommand>
            </CommentBtnSection>
            }
      </Comment>
      {reCommentInfor.filter(item => item.parentNumber === comment.commentNumber).map(reComment=> // 대댓글
        <div  key={reComment.commentNumber}>
          <Comment key={reComment.commentNumber} id={reComment.commentNumber} >
            <CommentLeft>
              <CommentNameBox>
                <ReCommentName>ㄴ</ReCommentName>
                <CommentName>{reComment.commentWriter}</CommentName>
              </CommentNameBox>
              {(reComment.commentWriter === userInfor.userName) ?
                <CommentOwnerBtn data-index={reComment.commentNumber}>
                  <CommentUpdate onClick={handleReCommentUpdateBtn}>수정</CommentUpdate>
                  <CommentDelete onClick={handleReCommentDelete}>삭제</CommentDelete>
                </CommentOwnerBtn>
                :
                null
              }
            </CommentLeft>

            <CommentContent>{reComment.text}</CommentContent>

            <Recode data-index={reComment.commentNumber} >
              {reComment.date} | {reComment.time}
            </Recode>
            {(typeof userInfor != 'undefined') ?
              <CommentBtnSection>
                <CommentRecommand data-index={reComment.commentNumber} onClick={toggleReCommentRecommand}>추천 <span>{reComment.recommand}</span></CommentRecommand>
              </CommentBtnSection>
              :
              <CommentBtnSection>
                <CommentRecommand >추천 <span>{reComment.recommand}</span></CommentRecommand>
              </CommentBtnSection>
            }
          </Comment>
          {(reComment.commentNumber == commentIndex) ?
            <CommentWriteSection>
              <CommentWrite ref={reCommentUpdateEl} placeholder={"댓글 수정시 네티켓을 지켜주세요."} required data-index={reComment.commentNumber}></CommentWrite>
              <CommentSubmit onClick={handleReCommentUpdate}>답글 등록</CommentSubmit>
            </CommentWriteSection>
            :
            null
          }
        </div>
      )}

      {(comment.commentNumber == commentIndex) ?
        <CommentWriteSection>
          <CommentWrite ref={reCommentEl}  onChange={(e) => {}} placeholder={"댓글 작성시 네티켓을 지켜주세요."} required data-index={comment.commentNumber}></CommentWrite>
          <CommentSubmit onClick={handleReCommentSubmit}>답글 등록</CommentSubmit>
        </CommentWriteSection>
        :
       null
       }     
      </div>
  )

  return (
    <div>
      <Background>
        <Content>
          <Category>{filter.category}|{filter.subCategory}</Category>

          <Header>
            <Title>{getPage.title}</Title>
            <OtherDetail>{getPage.author}|{getPage.date}|{getPage.time}<Right>조회 143|추천 {countOfRecommend}|댓글3</Right></OtherDetail>
          </Header>

          <Description>
            <Viewer initialValue={getPage.example} />
            <CommentInfor>댓글 3개</CommentInfor>
            <Recommand value="추천" onClick={postRecommand}>{isRecommend}</Recommand>
          </Description>

          <Comments>
            {printComment}
          </Comments>

          {(typeof userInfor != 'undefined') ? // userInfor가 있는 지 확인하면서 회원이 아니라면 댓글 작성 x
              <CommentWriteSection>
                <CommentWrite value={comment} onChange={(e)=>{setComment(e.target.value)}} placeholder={placeholder} required></CommentWrite>
                <CommentSubmit onClick={(checkSubmitBtn === 0)?handleCommentSubmit:handleCommentUpdate}>댓글 등록</CommentSubmit>
              </CommentWriteSection>
              : null}

          <BtnSection>
          <Link to="/board"
                  state={
                    {category:filter.subCategory}
                  }
            ><GoToList >목록으로</GoToList></Link>
            {(getPage.author === userInfor.userName) ?  // user의 이름과 게시글 작성자가 같다면 보여주고 아니라면 편집기능 구현 x
              <div style={{ float: "right" }}>
                <Link
                  to={`/board/update/${params.pagenum}/${userInfor.userId}`}
                  state={
                    {
                      title: getPage.title,
                      text: getPage.example,
                      isSecret: getPage.isSecret,
                      boardType: filter.category,
                      subCategory: filter.subCategory
                    }
                  }
                ><Correction>수정</Correction>
                </Link>
                <Delete onClick={handleDeleteClick}>삭제</Delete>

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