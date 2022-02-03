import styled from "styled-components";
import * as React from "react"
import { Link } from "react-router-dom";
import {PostInforBar,PostCotent,Categorization,Title,Writer,Date,Hits,Recommendation,Comment} from "./BoardElement"
import { faVolumeOff  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HashLink } from 'react-router-hash-link';

const Number = styled.div`
min-width: 65px;
text-align: center;
margin-left: 23px;
`
const Test = styled.span`
padding-left:10px;
z-index: 20;
`

const activeBoldWeight = `
font-weight: bold;
`

function PostBar({target,page,data}) {
    const limit = 19;
    const offset = (page-1)*limit;
    console.log("postbar의 페이지값"+page);
    const postdata = data.slice(offset, offset+limit).map((data) => 
  
    <PostInforBar key={data.number}>
      <PostCotent>
        {(data.isNotice === true)?
        <Number><FontAwesomeIcon icon={faVolumeOff} color="#0B665C" /></Number>
        :
        <Number>{data.number}</Number>
        }
        <Link to="1" state={{ category: "게시판", subCategory:  target, page: page }}  key={data.number}>
        <Title>
        {data.title}
        <HashLink to="1#commentTag" state={{ category: "게시판", subCategory:  target  }}  key={data.number}>
          <Test>
            [{data.comment}]
            </Test>
        </HashLink>
        </Title>
        </Link> 
       
        <Writer>{data.writer}</Writer>
        <Date>{data.date}</Date>
        <Recommendation>{data.recommend}</Recommendation>
        <Hits>{data.hits}</Hits>
        <Comment>{data.comment}</Comment>
      </PostCotent>
    </PostInforBar>
  
    )

    return (
        <>
            {postdata}
        </>
    );
  }

export default PostBar;