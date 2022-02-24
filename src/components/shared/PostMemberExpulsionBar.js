import styled from "styled-components";
import * as React from "react"
import {PostInforBar,PostCotent,Grade,StudentId,PhoneNumber,Name,PostRole,PostAttendance,PostGender,PostNumber,CheckBtn} from "./BoardElement"
import axios from "axios";
import { connect } from "react-redux";
import { actionCreators } from "../../store";

const printRole = (value) => {
    if(value.includes("ROLE_CLUB_PRESIDENT")){
        return "회장"
    }
    else if(value.includes("ROLE_GROUP_PRESIDENT")){
        return "소모임장"
    }
    else if(value.includes("ROLE_CLUB_EXECUTIVE")){
        return "운영진"
    }
    else if(value.includes("ROLE_GROUP_EXECUTIVE")){
        return "운영진"
    }
    else if(value.includes("ROLE_MEMBER")){
        return "일반"
    }
    else if(value.includes("ROLE_GUEST")){
        return "게스트"
    }
    else if(value.includes("ROLE_BAN")){
        return "밴"
    }
    else if(value.includes("ROLE_RESIGN")){
        return "사직"
    }
}

function mapDispatchToProps(dispatch){
    return{
      setAll: (boardId,page,isSearching,selected,boardCategoryName) => dispatch(actionCreators.setAll(boardId,page,isSearching,selected,boardCategoryName)),
    }
  }

function mapStateToProps(state) {
    return state;
  }

function PostMemberExpulsionBar(props){
    //console.log(props.data);
    //console.log(props);
    

    const expulsionMember = (memberId) => {
        axios.patch(`/club/president/ban?memberId=${memberId}`,{},{
        })
        .catch(function (error) {
            console.log(error);
          })
        .then(function (res) {
            console.log(res);
            const PageReducer = props.PageReducer
            props.setAll(PageReducer.boardId,PageReducer.page,PageReducer.isSearching,PageReducer.selected,!(PageReducer.boardCategoryName))
        });
    }

    const handleExpulsion = (e) => {
        console.log(e);
        const name = e.target.parentNode.childNodes[4].innerText
        console.log(e);
        const check = window.confirm(`${name}을(를) 정말 강제로 탈퇴시키겠습니까?`)
        console.log(check);
        if(check){
            const id = e.target.dataset.id
            expulsionMember(id)
        }
    }

    const postdata = props.data.map((data)=>
    <PostInforBar key={data.id}>
        <PostCotent>
            <PostNumber>{data.id}</PostNumber>
            <Grade post>{data.grade}</Grade>
            <StudentId>{data.studentId}</StudentId>
            <PhoneNumber post>{data.phone}</PhoneNumber>
            <Name>{data.name}</Name>
            <PostRole>{printRole(data.roles)}</PostRole>
            <PostAttendance>{data.academicStatus}</PostAttendance>
            <PostGender>{data.gender}</PostGender>
            <CheckBtn data-id={data.id} onClick={handleExpulsion} red></CheckBtn>
        </PostCotent>
    </PostInforBar>
    )

    return (
        <>
           {
           postdata
           }
        </>
    );
}

export default  React.memo(connect(mapStateToProps,mapDispatchToProps)(PostMemberExpulsionBar));