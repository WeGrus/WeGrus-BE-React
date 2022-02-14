import styled from "styled-components";
import * as React from "react"
import {PostInforBar,PostCotent,Grade,StudentId,PhoneNumber,Name,PostRole,PostAttendance,PostGender,PostNumber,CheckBtn as Btn} from "./BoardElement"
import axios from "axios";
import { connect } from "react-redux";
import { actionCreators } from "../../store";


export const CheckBtn = styled.div`
margin-left: ${(props) => (props.red ? "10px" : "28px")};
width: 15px;
height: 15px;
background-color: ${(props) => (props.red ? "red" : "#6CD2D7")};
border: none;
border-radius: 15px;
cursor: pointer;
`

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
        return "그룹운영진"
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

function PostGroupPermissionBar(props){
    
    console.log(props);
    const groupId = props.groupId
    console.log(groupId);
    const permissionGroup = (groupId, memberId) => {
        axios.patch(`/groups/executives/applicants/approve?groupId=${groupId}&memberId=${memberId}`,
        {
            headers: { 'Authorization': `Bearer ${props.userReducer.token}` }
        })
        .catch(function (error) {
            console.log(error);
          })
        .then(function (res) {
            console.log(res);
            const PageReducer = props.PageReducer
            props.setAll("그룹 가입 승인",PageReducer.page,PageReducer.isSearching,PageReducer.selected,!(PageReducer.boardCategoryName))
        });
    }

    const rejectionGroup = (groupId, memberId) => {
        axios.delete(`/groups/executives/applicants/reject?groupId=${groupId}&memberId=${memberId}`,{},{
            headers: { 'Authorization': `Bearer ${props.userReducer.token}` }
        })
        .catch(function (error) {
            console.log(error);
          })
        .then(function (res) {
            console.log(res);
            const PageReducer = props.PageReducer
            props.setAll("그룹 가입 승인",PageReducer.page,PageReducer.isSearching,PageReducer.selected,!(PageReducer.boardCategoryName))
        });
    }

    const promoteGroup = (groupId,memberId) => { // 임원 승급
        axios.patch(`/groups/president/promote?groupId=${groupId}&memberId=${memberId}`,{
            headers: { 'Authorization': `Bearer ${props.userReducer.token}` }
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

    const degradeGroup = (groupId,memberId) => { // 임원 하락
        axios.patch(`/groups/president/degrade?groupId=${groupId}&memberId=${memberId}`,{
            headers: { 'Authorization': `Bearer ${props.userReducer.token}` }
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

    const delegateGroup = (groupId,memberId) => {
        axios.patch(`/groups/president/delegate?groupId=${groupId}&memberId=${memberId}`,{
            headers: { 'Authorization': `Bearer ${props.userReducer.token}` }
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

    const kickGroup = (groupId,memberId) => {
        axios.patch(`/groups/president/kick?groupId=${groupId}&memberId=${memberId}`,{
            headers : { 'Authorization': `Bearer ${props.userReducer.token}` }
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

 



    const handlePermission = (e) => {
        console.log(e);
        //console.log(e.target.dataset.id);

        const check = window.confirm("이 회원의 그룹 승인을 하시겠습니까?")
        console.log(check);
        if(check){
            const id = e.target.dataset.id
            permissionGroup(groupId,id)
        }
    }

    const handleRejection = (e) => {
        console.log(e);
        //console.log(e.target.dataset.id);

        const check = window.confirm("이 회원의 그룹 거절을 하시겠습니까?")
        console.log(check);
        if(check){
            const id = e.target.dataset.id
            rejectionGroup(groupId,id)
        }
    }

    const handlePromote = (e) => {
        const check = window.confirm("이 회원에게 임원권한을 부여하시겠습니까?")
        console.log(check);
        if(check){
            const id = e.target.dataset.id
            promoteGroup(groupId,id)
        }
    }

    const handleDegrade = (e) => {
        const check = window.confirm("이 회원의 임원권한을 해제하시겠습니까?")
        console.log(check);
        if(check){
            const id = e.target.dataset.id
            degradeGroup(groupId,id)
        }
    }

    const handleDelegate = (e) => {
        const name = e.target.parentNode.childNodes[4].innerText
        const check = window.confirm(`${name}에게 회장을 위임 하시겠습니까?`)
        console.log(check);
        if(check){
            const id = e.target.dataset.id
            delegateGroup(groupId,id)
        }
    }

    const handleKick = (e) => {
        const name = e.target.parentNode.childNodes[4].innerText
        const check = window.confirm(`${name}을 탈퇴시겠습니까?`)
        console.log(check);
        if(check){
            const id = e.target.dataset.id
            kickGroup(groupId,id)
        }
    }
// 
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
            {(props.type === "그룹 가입 승인")?
                <>
                <CheckBtn data-id={data.id} onClick={handlePermission}></CheckBtn>
                <CheckBtn data-id={data.id} onClick={handleRejection} red></CheckBtn>
                </>
                :
                null
            }
            {(props.type === "그룹 임원 권한 부여")?
                <>
                <Btn data-id={data.id} onClick={handlePromote}></Btn>
                </>
                :
                null
            }
            {(props.type === "그룹 회장 위임 및 임원 권한 해제")?
                <>
                <CheckBtn data-id={data.id} onClick={handleDelegate}></CheckBtn>
                <CheckBtn data-id={data.id} onClick={handleDegrade} red></CheckBtn>
                </>
                :
                null
            }
            {(props.type === "그룹 강제 탈퇴")?
                <>
                    <Btn data-id={data.id} onClick={handlePromote} red></Btn>
                </>
                :
                null
            }

        </PostCotent>
    </PostInforBar>
    )

    return (
        <>
           {( props.data[0] !== undefined)?
            postdata
            :
            null
           }
        </>
    );
}

export default  React.memo(connect(mapStateToProps,mapDispatchToProps)(PostGroupPermissionBar));