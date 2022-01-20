import styled from "styled-components";
import * as React from "react"
import { Link } from "react-router-dom";
const PostInforBar = styled.div`
width: 909.07px;
height: 31px;
margin: 0 auto;
font-size: 14px;
line-height: 16.41px;
border-bottom: 1px solid black;
`
const PostCotent = styled.div`
padding-top: 8px;
display: flex;
flex-direction: row;
`

const Number = styled.div`
min-width: 65px;
text-align: center;
margin-left: 23px;
`
const Categorization = styled.div`
width: 90px;
text-align: center;
margin-left: 4px;
`
const Title = styled.div`
width: 373px;
margin-left: 31px;
`
const Writer = styled.div`
width: 77px;
text-align: center;
`
const Date = styled.div`
width: 63px;
text-align: center;
margin-left: 16px;
`
const Hits = styled.div`
width: 40px;
text-align: center;
margin-left: 11px;
`
const Recommendation = styled.div`
width: 40px;
text-align: center;
margin-left: 9px;
`
const Comment = styled.div`
width: 40px;
text-align: center;
margin-left: 7px;
`

function PostBar({target,page,data}) {
    const limit = 19;
    const offset = (page-1)*limit;
    
    const test = data.slice(offset, offset+limit).map((data) => 
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
            {test}
        </>
    );
  }

export default PostBar;