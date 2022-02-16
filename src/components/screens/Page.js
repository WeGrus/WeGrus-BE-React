import * as React from 'react';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import { useParams, useLocation, Link, useNavigate  } from "react-router-dom";
import styled from "styled-components";
import * as ReactDOM from 'react-dom';
import axios from "axios";
import { connect } from 'react-redux';
import CommentSection from './../shared/Comment';
import {Background,Content,Category,OtherDetail,Description,Recommand,GoToList,Correction,Delete,
  PostInfor, PostBtnSection, PostRecommand, PostScrape,HeaderContent,PageImage,DownloadBtn} from "./../shared/PageElements"
  import { actionCreators } from "../../store";

const Title = styled.div`
width: 924px;
height: 21px;
font-size: 18px;
font-weight: 700;
border: none;
margin-bottom: 4px;
`

const Right = styled.span`
float: right;
`

const BtnSection = styled.div`
margin-top: 12.5px;
padding-bottom: 12.5px;
`

export const Header = styled.div`
padding-bottom: 16px;
border-bottom: 2px solid #0B665C;
margin-bottom: 42px;
width: 924px;
padding-top: 16px;
margin: auto;
display: flex;
flex-direction: row;
`

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

function mapDispatchToProps(dispatch){
  return{
    setAll: (boardId,page,isSearching,seleted) => dispatch(actionCreators.setAll(boardId,page,isSearching,seleted))
  }
}

function Page(props) {
  
  //const params = useParams();
  const location = useLocation().state;

  const [pageDate, setPageData] = React.useState(null);
  const [commentData, setCommentData]= React.useState(null);
  const [countOfRecommend, setCountOfRecommend] = React.useState(0); // 게시글 추천수
  const [countOfScrape, setCountOfScrape] = React.useState(0); // 게시글 스크랩수
  const [countOfComment, setCountOfComment] = React.useState(0); // 게시글 댓글수
  const [isRecommend, setIsRecommend] = React.useState(checkRecommend(false)); // 게시글 추천 유무 확인에 따라 값 변경.
  const [isScraped, setIsScraped] = React.useState(false)
  const [trigger, setTrigger] = React.useState(true)
  const [load, setLoad]=React.useState(false)
  const Navigate = useNavigate();
  const isAuthority =   props.userReducer.roles.some(i => ["ROLE_GROUP_EXECUTIVE","ROLE_GROUP_PRESIDENT","ROLE_CLUB_EXECUTIVE","ROLE_CLUB_PRESIDENT"].includes(i))
  let data, time;

  const downRef = React.useRef();

  React.useEffect(()=>{
    axios.get(`/posts/${location.postId}`,{
      headers: {'Authorization': `Bearer ${props.userReducer.token}`}
    })
    .catch(function (error) {
      console.log(error.toJSON());
    })
    .then(function(res){
      //console.log(res.data.data.board);
      //console.log("work!");
      setPageData(res.data.data.board)
      setCommentData((current) => res.data.data.replies)
      setCountOfRecommend(res.data.data.board.postLike)
      setCountOfScrape(0) // 스크랩 이후 수정
      setCountOfComment(res.data.data.board.postReplies)
      //props.setAll(7,2,false,'LASTEST')
      //setPreviousTrigger(!trigger)
    });

  },[location,trigger])

  React.useEffect(()=>{
    if(pageDate !== null){
      setLoad(true)
      setIsScraped(pageDate.userPostBookmarked)
      setIsRecommend(pageDate.userPostLiked)
      console.log(pageDate);
      console.log(props);
      console.log();
    }
  },[pageDate])


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
    let value = window.confirm("해당 게시물을 삭제하겠습니까?")
    if (value === true) {
      axios.delete(`/posts?postId=${pageDate.postId}`,{
        headers: {'Authorization': `Bearer ${props.userReducer.token}`}
      })
      .catch(function (error) {
        console.log(error.toJSON());
      })
      .then(function(res){
        console.log(res);
        Navigate(props.PageReducer.boardCategoryName)
      });
     
    }
  }

  window.onpopstate = function(event){ // 뒤로가기
    event.preventDefault();
    Navigate(props.PageReducer.boardCategoryName,{state:{category:location.subCategory}})
  }

  const splitDate = (data) => {
    const date = data.split('|')
    const ymd = date[0]
    const time = date[1].substr(0,5)
    // console.log(date);
    // console.log(ymd);
    // console.log(time);
    
    const result = `${ymd} | ${time}`
    //console.log(result);
    //createTime()

    return result
  }

  const handleDownload = (e) => {
    //e.preventDefault();
    console.log(pageDate.postFileUrls[0]);
    const turl = new URL(pageDate.postFileUrls[0])
    console.log(turl);
    const blob = new Blob([pageDate.postFileUrls[0]])
    console.log(blob);
     //const url = window.URL.createObjectURL(blob);
     downRef.current.href = turl//pageDate.postFileUrls[0];
     //downRef.current.download = pageDate.postFileUrls[0]
     downRef.current.click();
    setTimeout(_ => {
      //window.URL.revokeObjectURL(url);
    }, 60000);
    //downRef.current.remove()


    // const a = document.createElement('a');
    // a.href = url;
    // a.download = `{원하는 파일명}.pdf`;
    // document.body.appendChild(a);
    // a.click();
    // setTimeout(_ => {
    //   window.URL.revokeObjectURL(url);
    // }, 60000);
    // a.remove();
    // setOpen(false);
    // <button href={pageDate.postFileUrls[0]} download>download</button>
	};

  return (
    <div>
      {(load !== false)?
            <Background>
            <Content>
              <Category>{props.PageReducer.viewCategoryName}|{pageDate.board}</Category>
    
              <Header>
                <PageImage src={`${pageDate.image.url}`}></PageImage>
              <HeaderContent>
                <Title>{pageDate.title}</Title>
                <OtherDetail>{pageDate.memberName} | {splitDate(pageDate.updatedDate)}<Right>조회 {pageDate.postView} | 추천 {countOfRecommend} | 댓글 {countOfComment}</Right></OtherDetail>
                </HeaderContent>
              </Header>
    
              <Description>
                <Viewer initialValue={pageDate.content} />
                <PostInfor><span>댓글 {countOfComment}</span> | <span>추천 {countOfRecommend}</span> | <span>스크랩 {countOfScrape}</span></PostInfor>
                <PostBtnSection>
                {(isRecommend === true)?
                <PostRecommand value="추천" onClick={postRecommand} checked>{"추천"}</PostRecommand>
                :
                <PostRecommand value="추천" onClick={postRecommand}>{"추천"}</PostRecommand>}
    
                {(isScraped === true)?
                  <PostScrape onClick={handlePostScrape} checked>스크랩</PostScrape>
                  :
                  <PostScrape onClick={handlePostScrape}>스크랩</PostScrape>
                } 
                  
              {(pageDate.postFileUrls[0] !== undefined)?<DownloadBtn ref={downRef} href={pageDate.postFileUrls[0]} download>첨부파일</DownloadBtn>:null}  
                </PostBtnSection>
                
               

              </Description>
              
              <CommentSection pageData={pageDate} commentData={commentData} trigger={setTrigger} test={trigger}/>
    
              <BtnSection>
              <Link to={`${props.PageReducer.boardCategoryName}`}
                ><GoToList >목록으로</GoToList></Link>
                {(props.userReducer.id === pageDate.memberId||isAuthority === true) ?  // user의 이름과 게시글 작성자가 같다면 보여주고 아니라면 편집기능 구현 x
                  <div style={{ float: "right" }}>
                    <Link
                      to={`${props.PageReducer.boardCategoryName}/update/${props.userReducer.id}/${props.userReducer.name}`}
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
          </Background>
      :
      null
      }

    </div>
  );
}
export default connect(mapStateToProps,mapDispatchToProps)(Page);