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

function PostMemberPermissionBar(props){
   // console.log(props.data);
    //console.log(props);
    let postdata

    const permissionMember = (requestId) => {
        axios.post(`/club/executives/authority?requestId=${requestId}`,{},{
            headers: { 'Authorization': `Bearer ${props.userReducer.token}` }
        })
        .catch(function (error) {
            console.log(error);
          })
        .then(function (res) {
            //console.log(res);
            const PageReducer = props.PageReducer
            props.setAll(PageReducer.boardId,PageReducer.page,PageReducer.isSearching,PageReducer.selected,!(PageReducer.boardCategoryName))
        });
    }

    const handlePermission = (e) => {
        console.log(e);
        //console.log(e.target.dataset.id);

        const check = window.confirm("이 인원의 회원 승인을 하시겠습니까?")
        console.log(check);
        if(check){
            const id = e.target.dataset.id
            permissionMember(id)
        }


    }

    if(props.data[0] !== undefined && props.data[0].member){
        postdata  = props.data.map((data)=>
        <PostInforBar key={data.member.id}>
            <PostCotent>
                <PostNumber>{data.member.id}</PostNumber>
                <Grade post>{data.member.grade}</Grade>
                <StudentId>{data.member.studentId}</StudentId>
                <PhoneNumber post>{data.member.phone}</PhoneNumber>
                <Name>{data.member.name}</Name>
                <PostRole>{printRole(data.member.roles)}</PostRole>
                <PostAttendance>{data.member.academicStatus}</PostAttendance>
                <PostGender>{data.member.gender}</PostGender>
                <CheckBtn data-id={data.id} onClick={handlePermission}></CheckBtn>
            </PostCotent>
        </PostInforBar>
        )
    }

    return (
        <>
           {( props.data[0] !== undefined && props.data[0].member)?
            postdata
            :
            null
           }
        </>
    );
}

export default  React.memo(connect(mapStateToProps,mapDispatchToProps)(PostMemberPermissionBar));