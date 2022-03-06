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
const Comment = styled.span`
  padding-left: 10px;
  z-index: 20;
`;

const HashLinkComment = styled(HashLink)`
padding-left: 10px;
z-index: 2;
`

const LinkProfile = styled(Link)`
z-index: 2;
`


const splitDate = (data) => {
    const date = data.split("|");
    const ymd = date[0];
    return ymd;
  };

  function mapStateToProps(state) {
    return state;
  }
  
  
function PostBarContent(props){
const {number, data,hasLink,link, title, writer, isBold, id} = props
const navigate = useNavigate()

const goSignUP = (e) => {
  const check = window.confirm("게시물을 보려면 동아리 가입 승인을 먼저 받으셔야 합니다.\n 동아리 가입 신청을 먼저 받으시겠습니까?")
  if(check){
    navigate(`/`);
  }
}

return(
  <>
      {(link !== `/`)?
    <>
        {(hasLink === true) ?
          <>
            <Link to={link}>
              <PostCotent {...isBold}>
                {(number === "NOTICE") ?
                  <FontAwesomeIcon icon={faVolumeOff} color="#0B665C" />
                  :
                  <Number>{number}</Number>
                }
                <Title>
                  {title}
                  {(parseInt(data.postReplies) !== 0) ? // 댓글이 0개가 아니라면 보이게 하고 하나도 없으면 보이지 않게 한다.
                    <HashLinkComment to={`${link}#commentTag`}>
                      [{data.postReplies}]
                    </HashLinkComment>
                    :
                    null
                  }
                </Title>
                {(id === props.userReducer)?
                  <LinkProfile to={`/profile`}>
                    <Writer>{writer}</Writer>
                  </LinkProfile>
                :
                  <LinkProfile to={`/profile/infor/0/${id}`}>
                    <Writer>{writer}</Writer>
                  </LinkProfile>
                }
                <Date>{splitDate(data.createdDate)}</Date>
                <Recommendation>{data.postLike}</Recommendation>
                <Hits>{data.postView}</Hits>
              </PostCotent>
            </Link>
          </>
       :
       <>
            <PostCotent {...isBold}>
              {(number === "NOTICE") ?
                <FontAwesomeIcon icon={faVolumeOff} color="#0B665C" />
                :
                <Number>{number}</Number>
              }
              <Title>{title}</Title>
              <Writer>{writer}</Writer>
              <Date>{splitDate(data.createdDate)}</Date>
              <Recommendation>{data.postLike}</Recommendation>
              <Hits>{data.postView}</Hits>
            </PostCotent>
       </>}
    </>
    :
    <>
        <PostCotent {...isBold}>
          {(number === "NOTICE") ?
            <FontAwesomeIcon icon={faVolumeOff} color="#0B665C" />
            :
            <Number>{number}</Number>
          }
          <Title onclick={goSignUP}>{title}</Title>
          <Writer>{writer}</Writer>
          <Date>{splitDate(data.createdDate)}</Date>
          <Recommendation>{data.postLike}</Recommendation>
          <Hits>{data.postView}</Hits>
        </PostCotent>
    </>}
  </>

)
}

export default connect(mapStateToProps)(React.memo(PostBarContent));