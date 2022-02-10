import axios from "axios";
import * as React from 'react';
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { faThumbsUp  } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Comments,Comment
    ,CommentContent,CommentWriteSection,CommentWrite,CommentSubmit,
    CommentName,CommentLeft,CommentNameBox,
    CommentBox,Date,CommentRecommand,BtnBar, CommentInfor,ReComment,CommentSpan} from "./PageElements"

      
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


      const recommentLogic = `
      {reCommentInfor.filter(item => item.parentNumber === comment.commentNumber).map(reComment=> // 대댓글
        <div  key={reComment.commentNumber}>
          <ReComment key={reComment.commentNumber} id={reComment.commentNumber} >
            <CommentLeft>
              <CommentNameBox>
                <CommentName>{reComment.commentWriter}</CommentName>
              </CommentNameBox>

              <CommentInfor data-index={reComment.commentNumber}>
                <Date>{reComment.date} | {reComment.time}</Date>
                <CommentRecommand><FontAwesomeIcon icon={faThumbsUp} color="#0B665C" />{reComment.recommand}</CommentRecommand>
              </CommentInfor>
              </CommentLeft>
              {/* {(reComment.commentWriter === userInfor.userName) ?
                <CommentOwnerBtn data-index={reComment.commentNumber}>
                  <CommentUpdate onClick={handleReCommentUpdateBtn}>수정</CommentUpdate>
                  <CommentDelete onClick={handleReCommentDelete}>삭제</CommentDelete>
                </CommentOwnerBtn>
                :
                null
              } */}
            

            <CommentContent>{reComment.text}</CommentContent>


            {(reComment.commentWriter === userInfor.userName) ?
              <BtnBar data-index={reComment.commentNumber}><CommentSpan onClick={toggleReCommentRecommand}>추천</CommentSpan> | <CommentSpan onClick={handleReCommentUpdateBtn}>수정</CommentSpan> | <CommentSpan onClick={handleReCommentDelete}>삭제</CommentSpan></BtnBar>
              :
              <BtnBar data-index={reComment.commentNumber}><CommentSpan  onClick={toggleReCommentRecommand}>추천</CommentSpan></BtnBar>
            }

            {/* {(typeof userInfor != 'undefined') ?
              <CommentBtnSection>
                <CommentRecommand data-index={reComment.commentNumber} onClick={toggleReCommentRecommand}>추천 <span>{reComment.recommand}</span></CommentRecommand>
              </CommentBtnSection>
              :
              <CommentBtnSection>
                <CommentRecommand >추천 <span>{reComment.recommand}</span></CommentRecommand>
              </CommentBtnSection>
            } */}
          </ReComment>
          {(reComment.commentNumber == commentIndex) ?
            <CommentWriteSection>
              <CommentWrite ref={reCommentUpdateEl} placeholder={"댓글 수정시 네티켓을 지켜주세요."} required data-index={reComment.commentNumber}></CommentWrite>
              <CommentSubmit onClick={handleReCommentUpdate}>대댓글 등록</CommentSubmit>
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
      `

      let userInfor = {
        userName: "김승태",
        userId: "testId"
      }



function mapStateToProps(state) {
        return state;
    }

function CommentSection(props){
  const pageData = props.pageData
  const postId = pageData.postId
  const commentData = props.commentData

    const [comment,setComment] = React.useState("") // 댓글 입력칸
    const [placeholder, setPlaceholder] = React.useState("  댓글 작성 시 네티켓을 지켜주세요.")
    const [commentInfor, setCommentInfor] = React.useState(commentData); // 댓글 정보
    const [reCommentInfor,setReCommentInfor] = React.useState(getReCommentInfor)
    const [commentIndex,setCommentIndex] = React.useState(-1);
    const [checkSubmitBtn, setCheckSubmitBtn] = React.useState(0) // 0이면 댓글 등록이고 다른 숫자이면 수정하는 댓글의 index이다. 
    const [isRecommand, setIsRecommand] = React.useState(0)
    const reCommentEl = React.useRef();
    const reCommentUpdateEl = React.useRef();
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

    const createdTime = () => {
      let today = ("2021" + '/' + "12" + '/' + "03")
      let time = ("01" + ':' + "05" + ':' + "63")
      return {date: today,
              time: time};
    }

    const handleCommentSubmit = (e) => { //댓글 작성하고 제출하는 함수
      if(checkBlank(comment)){ // 댓글을 달지 않고 버튼을 클릭했을 때.
        setPlaceholder("  내용이 없는 댓글은 등록하실 수 없습니다.")
      }
      else{
        axios.post(`/comments`,{
          "content": comment,
          "postId": postId, 
        },
        {
          headers: {'Authorization': `Bearer ${props.tokenReducer}`}
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
  
    const handleCommentUpdate = (e) => { // 댓글 수정버튼 누른 후, 댓글 등록 버튼 누를 시에 동작
      let i = 0;
      // for(i;i<commentInfor.length; i++){
      //   if(commentInfor[i].commentNumber == checkSubmitBtn){
      //     const today = createdTime();
      //     let temp  = [...commentInfor];
      //     temp[i].text = comment;
      //     temp[i].date =  today.date;
      //     temp[i].time = today.time;
      //     setCommentInfor(temp);
      //     setCheckSubmitBtn(0);
      //     setComment("");
      //     break;
      //   }
      // }
      
    }

    const handleCommentUpdateBtn = (e) => { // 댓글 수정 버튼 누를 시에 동작하는 함수
        const index = e.target.parentNode.dataset.index
        let i = 0;
        // for(i;i<commentInfor.length; i++){
        //   if(commentInfor[i].commentNumber == index){
        //     console.log(commentInfor[i].text)
        //     setComment(commentInfor[i].text)
        //     setCheckSubmitBtn(index)
        //     break;
        //   }
        // }
    }
      
    const handleCommentDelete = (e) => { // 댓글 삭제 함수
      const info = e.target.parentNode.parentNode.dataset.info;
      const commentinfo = info.split(['\''])

      axios.delete(`/comments?replyId=${commentinfo[1]}`,
      {
        headers: {'Authorization': `Bearer ${props.tokenReducer}`}
      })
      .catch(function (error) {
        console.log(error.toJSON());
      })
      .then(function(res){
        console.log(res);
        triggerSwitch()
      });
  
    }
    
    const handleCommentRecommandCancel = (e, commentId) => {

      axios.delete(`/comments/like?replyId=${commentId}`, {
        headers: { 'Authorization': `Bearer ${props.tokenReducer}` }
      })
      .then(function (res) {
          console.log(res);
          console.log("추천 취소");
          const changeNum = Number(e.target.parentNode.parentNode.childNodes[0].childNodes[1].childNodes[1].innerText)-1
          console.log(e.target.parentNode.parentNode.childNodes[0].childNodes[1].childNodes[1].childNodes[1].textContent = changeNum);
      });
    }

    const handleCommentRecommand = (e) => { // 댓글 추천 함수
      const info = e.target.parentNode.parentNode.dataset.info;
      const commentinfo = info.split(['\''])
      const commentId = Number(commentinfo[1]);

      axios.post(`/comments/like?replyId=${commentId}`, {}, {
        headers: { 'Authorization': `Bearer ${props.tokenReducer}` }
      })
        .catch(function (error) {
          console.log(error);
          handleCommentRecommandCancel(e,commentId)
        })
        .then(function (res, error) {
          if (res === undefined) {
          }
          else{
            const changeNum = Number(e.target.parentNode.parentNode.childNodes[0].childNodes[1].childNodes[1].innerText)+1
            console.log("추천 완료");
            // console.log(e);
            // console.log(e.target.parentNode.parentNode.childNodes[0].childNodes[1].childNodes[1]);
            // console.log(e.target.parentNode.parentNode.childNodes[0].childNodes[1].childNodes[1].childNodes[1]);
            console.log(e.target.parentNode.parentNode.childNodes[0].childNodes[1].childNodes[1].childNodes[1].textContent = changeNum);
          }
        });
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
          setCommentIndex(-1);
        }
      }
    
      const handleReCommentUpdate = (e) => { // 대댓글 수정함수
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
        console.log(e);
        let index =e.target.parentNode.parentNode.id;
        if(index === commentIndex)
        index = -1
        setCommentIndex(index);
      }
      
      const handleReCommentDelete = (e) => { // 대댓글 삭제함수
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
    
      const printComment = commentData.map((comment,i)=>
        <CommentBox key={i + 1}>
          <Comment data-info={`commentNo: '${comment.replyId}'`} >
            <CommentLeft>
              <CommentNameBox>
                <CommentName>{comment.memberName}</CommentName>
              </CommentNameBox>
              <CommentInfor data-index={comment.replyId}>
                <Date>{comment.updatedDate} | {comment.updatedDate}</Date>
                <CommentRecommand><FontAwesomeIcon icon={faThumbsUp} color="#0B665C" />{comment.replyLike}</CommentRecommand>
              </CommentInfor>
            </CommentLeft>

            <CommentContent>{comment.content}</CommentContent>

            {(comment.memberId === 3) ? // 이후 JWT 디코딩 이후 수정할 부분이다.
              <BtnBar data-index={comment.replyId}><CommentSpan onClick={handleCommentRecommand}>추천</CommentSpan> | <CommentSpan onClick={handleReCommentWirte}>답글</CommentSpan> | <CommentSpan onClick={handleCommentUpdateBtn}>수정</CommentSpan> | <CommentSpan onClick={handleCommentDelete}>삭제</CommentSpan></BtnBar>
              :
              <BtnBar data-index={comment.replyId}><CommentSpan onClick={handleCommentRecommand}>추천</CommentSpan> | <CommentSpan onClick={handleReCommentWirte}>답글</CommentSpan></BtnBar>
            }
          </Comment>
        </CommentBox>
      )

    return(
        <>
            <Comments id="commentTag">
            {printComment}
            </Comments>
            {(typeof userInfor != 'undefined') ? // userInfor가 있는 지 확인하면서 회원이 아니라면 댓글 작성 x
              <CommentWriteSection>
                <CommentWrite  value={comment} ref={commentInputEl} onChange={(e)=>{setComment(e.target.value)}}  placeholder={placeholder} required></CommentWrite>
                <CommentSubmit onClick={(checkSubmitBtn === 0)?handleCommentSubmit:handleCommentUpdate}>댓글 등록</CommentSubmit>
              </CommentWriteSection>
              : null}
        </>
    )
};

export default connect(mapStateToProps)(CommentSection);