import axios from "axios";
import * as React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp  } from "@fortawesome/free-regular-svg-icons";
import {faThumbsUp as solidFaThumbsUp} from "@fortawesome/free-solid-svg-icons"
import {Comments,Comment
    ,CommentContent,CommentWriteSection,CommentWrite,CommentSubmit,
    CommentName,CommentLeft,CommentNameBox,
    CommentBox,Date,CommentRecommand,BtnBar, CommentInfor,ReComment,CommentSpan,CommentLeftContent,CommentImage,ReCommentImage} from "./PageElements"

function mapStateToProps(state) {
        return state;
    }

function CommentSection(props){
  const pageData = props.pageData
  const postId = pageData.postId
  const commentData = props.commentData.filter(item => item.replyParentId === -1)
  const reCommentData = props.commentData.filter(item => item.replyParentId !== -1)

    const [comment,setComment] = React.useState("") // 댓글 입력칸
    const [placeholder, setPlaceholder] = React.useState("  댓글 작성 시 네티켓을 지켜주세요.")
    const [commentIndex,setCommentIndex] = React.useState(-1); // 대댓글 작성을 위해 이용한다.
    const reCommentEl = React.useRef();
    const commentInputEl = React.useRef(); // 추후에 추가할 공백입력

    const triggerSwitch = () => {
      props.trigger((current)=> !current)
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

    const createTime = () => {
       let today = new Date().toString(); 
      let year = today.getFullYear(); // 년도
      let month = today.getMonth() + 1;  // 월
      let day = today.getDate();  // 날짜
      const test = year + '/' + month + '/' + day
      console.log(test);
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


    const handleCommentSubmit = (e) => { //댓글 작성하고 제출하는 함수
      if(checkBlank(comment)){ // 댓글을 달지 않고 버튼을 클릭했을 때.
        setPlaceholder("  내용이 없는 댓글은 등록하실 수 없습니다.")
      }
      else{
        axios.post(`/comments`,{
          "content": comment,
          "postId": postId, 
          "replyId": -1
        },
        {
        })
        .catch(function (error) {
          console.log(error.toJSON());
        })
        .then(function(res){
          console.log(res);
          triggerSwitch()
          setComment("");
        });

      }
    }
  
    const handleCommentDelete = (e) => { // 댓글 삭제 함수
      const replyId = e.target.parentNode.parentNode.dataset.id;
      let value = window.confirm("해당 댓글을 삭제하겠습니까?")
      if(value){
        axios.delete(`/comments?replyId=${replyId}`,
        {
        })
        .catch(function (error) {
          console.log(error.toJSON());
        })
        .then(function(res){
          console.log(res);
          triggerSwitch()
        });
      }
    }
    
    const handleCommentRecommandCancel = (e) => { // 댓글 추천 취소함수
      const info = e.target.parentNode.parentNode.dataset.id;
      const commentId = Number(info);

      axios.delete(`/comments/like?replyId=${commentId}`, {
      })
      .then(function (res) {
          console.log(res);
          console.log("추천 취소");
          const changeNum = Number(e.target.parentNode.parentNode.childNodes[0].childNodes[1].childNodes[1].childNodes[1].innerText) -1
          console.log(e.target.parentNode.parentNode.childNodes[0].childNodes[1].childNodes[1].childNodes[1].childNodes[1].textContent = changeNum);
          triggerSwitch()
      });
    }

  const handleCommentRecommand = (e) => { // 댓글 추천 함수
    const info = e.target.parentNode.parentNode.dataset.id;
    const commentId = Number(info);
    console.log(commentId);
    // const changeNum = Number(e.target.parentNode.parentNode.childNodes[0].childNodes[1].childNodes[1].childNodes[1].innerText) + 1
    // e.target.parentNode.parentNode.childNodes[0].childNodes[1].childNodes[1].childNodes[1].childNodes[1].textContent = changeNum
    axios.post(`/comments/like?replyId=${commentId}`, {}, {
    })
      .catch(function (error) {
        console.log(error);
      })
      .then(function (res, error) {
        if (res === undefined) {
        }
        else {
          console.log("추천 완료");
          triggerSwitch()
        }
       });
  }

  const handleEmojiRecommand = (e) => {

    const commentId = Number(e.target.parentNode.parentNode.parentNode.parentNode.parentNode.dataset.id)

    console.log(e.target.parentNode.parentNode);
    axios.post(`/comments/like?replyId=${commentId}`, {}, {
    })
      .catch(function (error) {
        console.log(error);
        //handleCommentRecommandCancel(e, commentId)
      })
      .then(function (res, error) {
        if (res === undefined) {
        }
        else {
          const changeNum = Number(e.target.parentNode.innerText)+1
          e.target.parentNode.childNodes[1].textContent = changeNum
          triggerSwitch()
        }
      });


  }

  const handleEmojiCancel = (e) => {
    console.log(e.target.parentNode.parentNode.innerText);
    const commentId = Number(e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.dataset.id)
    console.log(commentId);
    axios.delete(`/comments/like?replyId=${commentId}`, {
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function (res) {
        console.log(res);
        console.log("추천 취소");
        const changeNum = Number(e.target.parentNode.parentNode.innerText)-1
        e.target.parentNode.parentNode.childNodes[1].textContent = changeNum
        triggerSwitch()
    });
  }
    
  const handleReCommentWirte = (e) => { // 댓글에서 답글 버튼을 눌렀을 때 동작하는 함수
    let index = e.target.parentNode.parentNode.dataset.id;
    if (index === commentIndex)
      index = -1
    setCommentIndex(index);
    //console.log(e);
  }
    
  const handleReCommentSubmit = (e) => { // 대댓글을 전송하는 함수 
    const parentId = Number(reCommentEl.current.dataset.id)
    
    const recomment= reCommentEl.current.value;
    
    if(checkBlank(recomment)){ // 댓글을 달지 않고 버튼을 클릭했을 때.
      reCommentEl.current.placeholder="  내용이 없는 댓글은 등록하실 수 없습니다."
    }
    else{
      axios.post(`/comments`,{
        "content": recomment,
        "postId": postId, 
        "replyId": parentId
      },
      {
      })
      .catch(function (error) {
        console.log(error.toJSON());
      })
      .then(function(res){
        console.log(res);
        console.log(parentId);
        console.log(recomment);
        reCommentEl.current.value = "";
        reCommentEl.current.placeholder="  댓글 작성 시 네티켓을 지켜주세요."
        setCommentIndex(-1);
        triggerSwitch()
        
      });
    }
  }
      
  const handleReCommentDelete = (e) => { // 대댓글 삭제함수
        const index = e.target.parentNode.parentNode.dataset.id;
        let value = window.confirm("해당 댓글을 삭제하겠습니까?")
        if(value){
          axios.delete(`/comments?replyId=${index}`,
          {
          })
          .catch(function (error) {
            console.log(error.toJSON());
          })
          .then(function(res){
            console.log(res);
            triggerSwitch()
          });
        }
  }

    

    
      const printComment = commentData.map((comment,i)=>
        <CommentBox key={comment.replyId}>
          <Comment data-id={`${comment.replyId}`} >
            <CommentLeft>
              <CommentImage src={`${comment.image.url}`}></CommentImage>
              <CommentLeftContent>
              <CommentNameBox>
                <CommentName>{comment.memberName}</CommentName>
              </CommentNameBox>
              <CommentInfor data-index={comment.replyId}>
                <Date>{splitDate(comment.updatedDate)} </Date>
                {(comment.userReplyLiked === false)?
                <CommentRecommand><FontAwesomeIcon icon={faThumbsUp} onClick={handleEmojiRecommand} color="#0B665C" />{comment.replyLike}</CommentRecommand>
                :
                <CommentRecommand><FontAwesomeIcon icon={solidFaThumbsUp} onClick={handleEmojiCancel} color="#0B665C" />{comment.replyLike}</CommentRecommand>
                }        
              </CommentInfor>
            </CommentLeftContent>

            </CommentLeft>

            <CommentContent>{comment.content}</CommentContent>

            {(comment.memberId === props.userReducer.id) ? // 이후 JWT 디코딩 이후 수정할 부분이다.
              <BtnBar data-index={comment.replyId}> {(comment.userReplyLiked === false)?<CommentSpan onClick={handleCommentRecommand}>추천</CommentSpan>:<CommentSpan onClick={handleCommentRecommandCancel}>추천취소</CommentSpan>} | <CommentSpan onClick={handleReCommentWirte}>답글</CommentSpan> | <CommentSpan onClick={handleCommentDelete}>삭제</CommentSpan></BtnBar>
              :
              <BtnBar data-index={comment.replyId}>{(comment.userReplyLiked === false)?<CommentSpan onClick={handleCommentRecommand}>추천</CommentSpan>:<CommentSpan onClick={handleCommentRecommandCancel}>추천취소</CommentSpan>}  | <CommentSpan onClick={handleReCommentWirte}>답글</CommentSpan></BtnBar>
            }
          </Comment>
          
          {reCommentData.filter(item => item.replyParentId === comment.replyId).map(reComment =>
            <>
              <ReComment key={reComment.replyId} data-id={`${reComment.replyId}`}>
              <CommentLeft>
              <ReCommentImage src={`${reComment.image.url}`}></ReCommentImage>
              <CommentLeftContent>
              <CommentNameBox>
                <CommentName>{reComment.memberName}</CommentName>
              </CommentNameBox>
              <CommentInfor data-index={reComment.replyId}>
                <Date>{splitDate(comment.updatedDate)} </Date>
                {(reComment.userReplyLiked === false)?
                <CommentRecommand><FontAwesomeIcon icon={faThumbsUp} onClick={handleEmojiRecommand} color="#0B665C" />{reComment.replyLike}</CommentRecommand>
                :
                <CommentRecommand><FontAwesomeIcon icon={solidFaThumbsUp} onClick={handleEmojiCancel} color="#0B665C" />{reComment.replyLike}</CommentRecommand>
                }
              </CommentInfor>
              </CommentLeftContent>
              </CommentLeft>
            
            <CommentContent>{reComment.content}</CommentContent>

            {(reComment.memberId === props.userReducer.id) ?
              <BtnBar data-index={reComment.replyId}>{(reComment.userReplyLiked === false)?<CommentSpan onClick={handleCommentRecommand}>추천</CommentSpan>:<CommentSpan onClick={handleCommentRecommandCancel}>추천취소</CommentSpan>} | <CommentSpan onClick={handleReCommentDelete}>삭제</CommentSpan></BtnBar>
              :
              <BtnBar data-index={reComment.replyId}>{(reComment.userReplyLiked === false)?<CommentSpan onClick={handleCommentRecommand}>추천</CommentSpan>:<CommentSpan onClick={handleCommentRecommandCancel}>추천취소</CommentSpan>}</BtnBar>
            }
          </ReComment>
            </>
            )}



          {(comment.replyId == commentIndex) ?
          <CommentWriteSection>
          <CommentWrite ref={reCommentEl}  onChange={(e) => {}} placeholder={"댓글 작성시 네티켓을 지켜주세요."} required data-id={comment.replyId}></CommentWrite>
          <CommentSubmit onClick={handleReCommentSubmit}>답글 등록</CommentSubmit>
          </CommentWriteSection>
          :
            null
          }    
        </CommentBox>
      )

    return(
        <>
            <Comments id="commentTag">
            {printComment}
            </Comments>
            {(typeof props.userReducer != 'undefined') ? // userInfor가 있는 지 확인하면서 회원이 아니라면 댓글 작성 x
              <CommentWriteSection>
                <CommentWrite  value={comment} ref={commentInputEl} onChange={(e)=>{setComment(e.target.value)}}  placeholder={placeholder} required></CommentWrite>
                <CommentSubmit onClick={handleCommentSubmit}>댓글 등록</CommentSubmit>
              </CommentWriteSection>
              : null}
        </>
    )
};

export default connect(mapStateToProps)(CommentSection);