import styled from "styled-components";
import * as React from "react";
import { Link } from "react-router-dom";
import {
  PostCotent,
  Title,
  Writer,
  Date,
  Hits,
  Recommendation,
} from "./BoardElement";
import { faVolumeOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HashLink } from "react-router-hash-link";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
const Number = styled.div`
  min-width: 65px;
  text-align: center;
  margin-left: 23px;
`;
const Test = styled.span`
  padding-left: 10px;
  z-index: 20;
`;


const splitDate = (data) => {
    const date = data.split("|");
    const ymd = date[0];
    return ymd;
  };

  function mapStateToProps(state) {
    return state;
  }
  
  
function PostBarContent(props){
const {number, data,hasLink,link, title, writer, isBold} = props
const navigate = useNavigate()

const goSignUP = (e) => {
  const check = window.confirm("게시물을 보려면 동아리 가입 승인을 먼저 받으셔야 합니다.\n 동아리 가입 신청을 먼저 받으시겠습니까?")
  if(check){
    navigate(`/`);
  }
}

return(
    <PostCotent {...isBold}>
    {(number === "NOTICE")?
    <FontAwesomeIcon icon={faVolumeOff} color="#0B665C" />
    :
    <Number>{number}</Number>
    }
    
    <Title>
      {(link !== `/`)?
      <>
          {(hasLink === true) ?
            <>
              <Link to={link}>
                {title}
              </Link>
              {(parseInt(data.postReplies) !== 0) ? // 댓글이 0개가 아니라면 보이게 하고 하나도 없으면 보이지 않게 한다.
                <HashLink to={`${link}#commentTag`}>
                  <Test>[{data.postReplies}]</Test>
                </HashLink>
                :
                null
              }
            </>
            :
            { title }
          }
      </>
      :
      <div onclick={goSignUP}>
            {title}
      </div>
      }
    </Title>
    <Writer>{writer}</Writer>
    <Date>{splitDate(data.createdDate)}</Date>
    <Recommendation>{data.postLike}</Recommendation>
    <Hits>{data.postView}</Hits>
  </PostCotent>
)
}

export default connect(mapStateToProps)(React.memo(PostBarContent));