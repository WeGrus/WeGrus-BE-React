import * as React from 'react';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import { useParams, useLocation, Link, useNavigate  } from "react-router-dom";
import styled from "styled-components";
import * as ReactDOM from 'react-dom';
import axios from "axios";
import { connect } from 'react-redux';
import CommentSection from './../shared/Comment';
import {Background,Content,Category,Header,OtherDetail,Description,Recommand,GoToList,Correction,Delete,
  PostInfor, PostBtnSection, PostRecommand, PostScrape} from "./../shared/PageElements"

const Title = styled.div`
width: 924px;
height: 21px;
font-size: 18px;
font-weight: 700;
border: none;
margin-bottom: 10px;
`

const Right = styled.span`
float: right;
`

const BtnSection = styled.div`
margin-top: 12.5px;
padding-bottom: 12.5px;
`

let getPage = { // 서버에서 가져온 page의 정보라고 가정.
  title: "플러터 스터디 모집합니다. 초보자 환영입니다.",
  isSecret: false,
  countOfRecommend: 0, // 게시글의 추천수
  isRecommend: false,  //서버에서 이 유저가 게시글에 추천을 했는지 확인한다. true면 추천한 것이다.
  author: "김승태",
  date: "2021.12.21",
  time: "23:44",
  // editor에 넣을 예제값이다.
}



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

function mapStateToProps(state) {
  return state;
}

function Page(props) {
  
  const params = useParams();
  const location = useLocation().state;

  const [pageDate, setPageData] = React.useState(null);
  const [commentData, setCommentData]= React.useState(null);
  const [countOfRecommend, setCountOfRecommend] = React.useState(0); // 게시글 추천수
  const [countOfScrape, setCountOfScrape] = React.useState(0); // 게시글 스크랩수
  const [countOfComment, setCountOfComment] = React.useState(0); // 게시글 댓글수
  const [isRecommend, setIsRecommend] = React.useState(checkRecommend(false)); // 게시글 추천 유무 확인에 따라 값 변경.
  const [isScraped, setIsScraped] = React.useState(false)
  const [trigger, setTrigger] = React.useState(true)
  const [previousTrigger, setPreviousTrigger]=React.useState(trigger)
  const Navigate = useNavigate();
  let data, time;

  React.useEffect(()=>{
    axios.get(`/posts/${location.postId}`,{
      headers: {'Authorization': `Bearer ${props.userReducer.token}`}
    })
    .catch(function (error) {
      console.log(error.toJSON());
    })
    .then(function(res){
      //console.log(res.data.data.replies);
      console.log(res.data.data.board);
      setPageData(res.data.data.board)
      setCommentData((current) => res.data.data.replies)
      setCountOfRecommend(res.data.data.board.postLike)
      setCountOfScrape(0) // 스크랩 이후 수정
      setCountOfComment(res.data.data.board.postReplies)
      setPreviousTrigger(!trigger)
    });
  },[trigger])


  const postRecommand = () => { // 게시글 추천하는 함수
    if (isRecommend === "추천취소") {
      axios.delete(`/posts/like?postId=${pageDate.postId}`,{
        headers: {'Authorization': `Bearer ${props.userReducer.token}`}
      })
      .catch(function (error) {
        console.log(error.toJSON());
      })
      .then(function(res){
        console.log(res);
      });
      setCountOfRecommend((count) => count - 1);
      setIsRecommend("추천")
    }
    else {
      axios.post(`/posts/like?postId=${pageDate.postId}`,{},{
        headers: {'Authorization': `Bearer ${props.userReducer.token}`}
      })
      .catch(function (error) {
        console.log(error.toJSON());
      })
      .then(function(res){
        console.log(res);
      });
      setCountOfRecommend((count) => count + 1);
      setIsRecommend("추천취소")
    }
  }

  const handlePostScrape = () => {
    if(isScraped === true){ // 이미 추가했다면 북마크 해제
      console.log("북마크 해제");
      
      axios.delete(`/members/bookmarks?postId=${pageDate.postId}`,{
        headers: {'Authorization': `Bearer ${props.userReducer.token}`}
      })
      .catch(function (error) {
        console.log(error.toJSON());
      })
      .then(function(res){
        console.log(res);
      });
      setIsScraped(false);
      setCountOfScrape((count)=>count-1)
    }
    else{
      console.log("북마크 성공");
      setIsScraped(true);
      axios.post(`/members/bookmarks?postId=${pageDate.postId}`,{},{
        headers: {'Authorization': `Bearer ${props.userReducer.token}`}
      })
      .catch(function (error) {
        console.log(error.toJSON());
      })
      .then(function(res){
        console.log(res);
      });
      setCountOfScrape((count)=>count+1)
    }
  }

  const handleDeleteClick = () => { // 게시글 삭제하는 함수
    //axios로 delete하고 다시 보드 보여주기.
    let value = window.confirm("해당게시물을 삭제하겠습니까?")
    if (value) {
      axios.delete(`/posts?postId=${pageDate.postId}`,{
        headers: {'Authorization': `Bearer ${props.userReducer.token}`}
      })
      .catch(function (error) {
        console.log(error.toJSON());
      })
      .then(function(res){
        console.log(res);
      });
      Navigate("/board", {
        state: { category: location.subCategory }
      })
    }

    return value;
  }

  window.onpopstate = function(event){
    console.log("page에서의 location값");
    console.log(location);
    Navigate(`/board`,{state:{category:location.subCategory, page:location.page}})

  }

  return (
    <div>
      {((pageDate!==null && commentData !== null))?
      <Background>
        <Content>
          <Category>{location.category}|{location.subCategory}</Category>

          <Header>
            <Title>{pageDate.title}</Title>
            <OtherDetail>{pageDate.memberName}|{pageDate.updatedDate}|{pageDate.updatedDate}<Right>조회 {pageDate.postView}|추천 {countOfRecommend}|댓글 {countOfComment}</Right></OtherDetail>
          </Header>

          <Description>
            <Viewer initialValue={pageDate.content} />
            <PostInfor><span>댓글 {countOfComment}</span> | <span>추천 {countOfRecommend}</span> | <span>스크랩 {countOfScrape}</span></PostInfor>
            <PostBtnSection>
            {(isRecommend === "추천취소")?
            <PostRecommand value="추천" onClick={postRecommand} checked>{"추천"}</PostRecommand>
            :
            <PostRecommand value="추천" onClick={postRecommand}>{"추천"}</PostRecommand>}

            {(isScraped === true)?
              <PostScrape onClick={handlePostScrape} checked>스크랩</PostScrape>
              :
              <PostScrape onClick={handlePostScrape}>스크랩</PostScrape>
            } 
              
            </PostBtnSection>
          </Description>
          
          <CommentSection pageData={pageDate} commentData={commentData} trigger={setTrigger} test={trigger}/>

          <BtnSection>
          <Link to="/board"
                  state={
                    {category:location.subCategory,
                      page: location.page
                    }
                  }
            ><GoToList >목록으로</GoToList></Link>
            {(getPage.author === userInfor.userName) ?  // user의 이름과 게시글 작성자가 같다면 보여주고 아니라면 편집기능 구현 x
              <div style={{ float: "right" }}>
                <Link
                  to={`/board/update/${params.pagenum}/${userInfor.userId}`}
                  state={
                    {
                      boardType: location.category,
                      subCategory: location.subCategory,
                      postId: pageDate.postId,
                      pageData: pageDate
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
      </Background>:
      null
      }
    </div>
  );
}
export default connect(mapStateToProps)(Page);