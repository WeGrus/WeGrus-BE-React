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



function mapStateToProps(state) {
        return state;
    }

function CommentSection(props){
    const [comment,setComment] = React.useState("") // 댓글 입력칸
    const [placeholder, setPlaceholder] = React.useState("  댓글 작성 시 네티켓을 지켜주세요.")
    const [commentInfor, setCommentInfor] = React.useState(geCommentInfor); // 댓글 정보
    const [reCommentInfor,setReCommentInfor] = React.useState(getReCommentInfor)
    const [commentIndex,setCommentIndex] = React.useState(-1);
    const [checkSubmitBtn, setCheckSubmitBtn] = React.useState(0) // 0이면 댓글 등록이고 다른 숫자이면 수정하는 댓글의 index이다. 
    const reCommentEl = React.useRef();
    const reCommentUpdateEl = React.useRef();
    const commentInputEl = React.useRef(); // 추후에 추가할 공백입력

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
        //const today = createdTime();
        let temp  = [...commentInfor];
        temp.push(
          {
            commentNumber: commentInfor[commentInfor.length - 1].commentNumber+1,
            commentWriter: userInfor.userName,
            text: comment,
            recommand: 0,
            date: "2021/3/13",//today.date,
            time: "15:30"//today.time
          }
        )
        axios.post(`/comments`,{
          "boardId": 6, // 추후 수정
          "content": comment
        },
        {
          headers: {'Authorization': `Bearer ${props.tokenReducer}`}
        })
        .catch(function (error) {
          console.log(error.toJSON());
        })
        .then(function(res){
          console.log(res);
        });
  
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
      
    const handleCommentDelete = (e) => { // 댓글 삭제 함수
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
      axios.delete(`/comments?commentId=${1}`,
      {
        headers: {'Authorization': `Bearer ${props.tokenReducer}`}
      })
      .catch(function (error) {
        console.log(error.toJSON());
      })
      .then(function(res){
        console.log(res);
      });
  
    }
    
    const toggleCommentRecommand = (e) => { // 댓글 추천 함수
        const index = e.target.parentNode.dataset.index
        let i = 0;
        for(i;i<commentInfor.length; i++){
          if(commentInfor[i].commentNumber == index){
            //먼저 추천했는지 확인 만약 추천했다면 추천 취소 
            let temp  = [...commentInfor];
            temp[i].recommand = commentInfor[i].recommand+1;
            setCommentInfor(temp);
            console.log("work!");
            break;
          }
        }

        axios.post(`/comments/like?commentId=${2}`,{},{
          headers: {'Authorization': `Bearer ${props.tokenReducer}`}
        })
        .catch(function (error) {
          if (error.response){
            axios.delete(`/comments/like?commentId=${2}`,{
              headers: {'Authorization': `Bearer ${props.tokenReducer}`}
            })
            .then(function(res){
              console.log(res);
              console.log("추천 취소");
            });
          }
        })
        .then(function(res){
          console.log(res);
          console.log("추천 완료");
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
    
      const printComment = commentInfor.map(comment=>
        <CommentBox key={comment.commentNumber}>
        <Comment key={comment.commentNumber} id = {comment.commentNumber} >
          <CommentLeft>
            <CommentNameBox>
              <CommentName>{comment.commentWriter}</CommentName>
            </CommentNameBox>
            <CommentInfor data-index={comment.commentNumber}>
              <Date>{comment.date} | {comment.time}</Date>
              <CommentRecommand><FontAwesomeIcon icon={faThumbsUp} color="#0B665C" />{comment.recommand}</CommentRecommand>
            </CommentInfor>
            </CommentLeft>
            
            <CommentContent>{comment.text}</CommentContent>
            
            {(comment.commentWriter === userInfor.userName) ?
              <BtnBar data-index={comment.commentNumber}><CommentSpan onClick={toggleCommentRecommand}>추천</CommentSpan> | <CommentSpan onClick={handleReCommentWirte}>답글</CommentSpan> | <CommentSpan onClick={handleCommentUpdateBtn}>수정</CommentSpan> | <CommentSpan onClick={handleCommentDelete}>삭제</CommentSpan></BtnBar>
              :
              <BtnBar  data-index={comment.commentNumber}><CommentSpan onClick={toggleCommentRecommand}>추천</CommentSpan> | <CommentSpan onClick={handleReCommentWirte}>답글</CommentSpan></BtnBar>
            }
              
              {/* {(typeof userInfor != 'undefined')?  
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
                } */
                }
          </Comment>
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