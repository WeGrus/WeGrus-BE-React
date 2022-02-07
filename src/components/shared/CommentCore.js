import axios from "axios";
import * as React from 'react';
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Comments, Comment
    , CommentContent, CommentWriteSection, CommentWrite, CommentSubmit,
    CommentName, CommentLeft, CommentNameBox,
    CommentBox, Date, CommentRecommand, BtnBar, CommentInfor, ReComment, CommentSpan
} from "./PageElements"

function mapStateToProps(state) {
    return state;
}

function CoreComment(props){
    const comment = props.comment
    return (
        <>
            <CommentBox>
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
        </>)

}

export default connect(mapStateToProps)(CoreComment);