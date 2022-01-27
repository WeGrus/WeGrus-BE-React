import styled from "styled-components";
import * as React from "react"
import { Link } from "react-router-dom";
import {PostInforBar,PostCotent,Categorization,Title,Writer,Date,Hits,Recommendation,Comment} from "./BoardElement"


const Number = styled.div`
min-width: 65px;
text-align: center;
margin-left: 23px;
`

function PostBar({target,page,data}) {
    const limit = 19;
    const offset = (page-1)*limit;
    
    const postdata = data.slice(offset, offset+limit).map((data) => 
    <Link to="1" state={{ category: "게시판", subCategory:  target  }}  key={data.number}>
    <PostInforBar>
      <PostCotent>
        <Number>{data.number}</Number>
        <Categorization>{data.categorization}</Categorization>
        <Title>{data.title}</Title>
        <Writer>{data.writer}</Writer>
        <Date>{data.date}</Date>
        <Hits>{data.hits}</Hits>
        <Recommendation>{data.recommend}</Recommendation>
        <Comment>{data.comment}</Comment>
      </PostCotent>
    </PostInforBar>
    </Link>
    )

    return (
        <>
            {postdata}
        </>
    );
  }

export default PostBar;