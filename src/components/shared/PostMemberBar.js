import styled from "styled-components";
import * as React from "react"
import {PostInforBar,PostCotent,Grade,StudentId,PhoneNumber,Name,PostRole,PostAttendance,PostGender,PostNumber,CheckBtn,SmallCheckBtn} from "./BoardElement"
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

function PostMemberBar(props) { // 

    //console.log(props);

   if (props.groupList) {
       console.log(props.groupList);
   }


    const delegateClub = (memberId) => { //회장 위임
        axios.patch(`/club/president/delegate?memberId=${memberId}`, {}, {
            headers: { 'Authorization': `Bearer ${props.userReducer.token}` }
        })
            .catch(function (error) {
                console.log(error);
            })
            .then(function (res) {
                console.log(res);
                const PageReducer = props.PageReducer
                props.setAll(PageReducer.boardId, PageReducer.page, PageReducer.isSearching, PageReducer.selected, !(PageReducer.boardCategoryName))
            });
    }
    const handleDelegate = (e) => { // 회장 위임 핸들러
        const name = e.target.parentNode.childNodes[4].innerText
        const check = window.confirm(`${name}의 회장 위임을 승인하시겠습니까?`)
        console.log(check);
        if (check) {
            const id = e.target.dataset.id
            delegateClub(id)
        }
    }

    const empowerClub = (memberId,type) => { // 회원 권한 부여
        axios.post(`/club/president/empower?memberId=${memberId}&type=${type}`,{},{
            headers: { 'Authorization': `Bearer ${props.userReducer.token}` }
        })
        .then(function(res){
            const PageReducer = props.PageReducer
            console.log(res);
            props.setAll(PageReducer.boardId,PageReducer.page,PageReducer.isSearching,PageReducer.selected,!(PageReducer.boardCategoryName))
        })
    }

    const handleEmpower = (e,type) => { //회원권한부여 핸들러
        const name = e.target.parentNode.childNodes[4].innerText
        if(type === "운영진"){
            const check = window.confirm(`${name}에게 운영진 권한을 부여하시겠습니까?`)
            console.log(check);
            if (check) {
                const id = e.target.dataset.id
                const type = "ROLE_CLUB_EXECUTIVE"
                empowerClub(id,type)
            }
        }
        else{
            const check = window.confirm(`${name}에게 회원 권한을 부여하시겠습니까?`)
            console.log(check);
            if (check) {
                const id = e.target.dataset.id
                const type = "ROLE_MEMBER"
                empowerClub(id,type)
            }
        }

    }

    const revokePermissionClub = (memberId,type) => { //회원 권한 해제
        axios.delete(`/club/president/authority?memberId=${memberId}&type=${type}`,{},{
            headers: { 'Authorization': `Bearer ${props.userReducer.token}` }
        })
        .then(function(res){
            const PageReducer = props.PageReducer
            console.log(res);
            props.setAll(PageReducer.boardId,PageReducer.page,PageReducer.isSearching,PageReducer.selected,!(PageReducer.boardCategoryName))
        })
    }

    const handleRevoke = (e,type) => { //회원권한해제 핸들러
        const name = e.target.parentNode.childNodes[4].innerText
        if(type === "운영진"){
            const check = window.confirm(`${name}의 운영진 권한을 해제하시겠습니까?`)
            console.log(check);
            if (check) {
                const id = e.target.dataset.id
                const type = "ROLE_CLUB_EXECUTIVE"
                revokePermissionClub(id,type)
            }
        }
        else{
            const check = window.confirm(`${name}에게 회원 권한을 해제하시겠습니까?`)
            console.log(check);
            if (check) {
                const id = e.target.dataset.id
                const type = "ROLE_MEMBER"
                revokePermissionClub(id,type)
            }
        }
    }
    
    const empowerGroupLeader = (memberId,groupId) => { // 소모임장 권한 부여
        axios.post(`/club/executives/groups?groupId=${groupId}&memberId=${memberId}`,{},{
            headers: { 'Authorization': `Bearer ${props.userReducer.token}` }
        })
        .then(function(res){
            const PageReducer = props.PageReducer
            console.log(res);
            props.setAll(PageReducer.boardId,PageReducer.page,PageReducer.isSearching,PageReducer.selected,!(PageReducer.boardCategoryName))
        })
    }

    const printPromt = () => {
        let output = ""
        
        return output
    }

    const handleEmpowerGroupLeader = (e) => {
        const name = e.target.parentNode.childNodes[4].innerText
        const check = window.confirm(`${name}에게 소그룹장의 권한을 주시겠습니까?`)
        let output = ""
        props.groupList.map(item => output += `${item.id}번은 ${item.name}입니다.\n`)
        output+='번호를 입력해주세요.'
        console.log(check);
        if (check) {
            const groupCheck = window.prompt(output)   
            const lastCheck = props.groupList.find(item => item.id === Number(Number(groupCheck)))
            if(lastCheck !== undefined){
                const id = e.target.dataset.id
                const groupId = lastCheck.id
                empowerGroupLeader(id,groupId)
            }
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
                {(props.type === "회장 위임") ?
                    <>
                        <CheckBtn data-id={data.id} onClick={handleDelegate}></CheckBtn>
                    </>
                    :
                    null
                }
                {(props.type === "회원 권한 부여") ?
                    <>
                        <CheckBtn data-id={data.id} onClick={(e)=>{handleEmpower(e,"회원")}}></CheckBtn>
                    </>
                    :
                    null
                }
                {(props.type === "운영진 권한 부여 및 회원 권한 해제") ?
                    <>
                        <SmallCheckBtn data-id={data.id} onClick={(e)=>{handleEmpower(e,"운영진")}}></SmallCheckBtn>
                        <SmallCheckBtn data-id={data.id} onClick={(e)=>{handleRevoke(e,"회원")}} red></SmallCheckBtn>
                    </>
                    :
                    null
                }
                {(props.type === "운영진 권한 해제") ?
                    <>
                        <CheckBtn data-id={data.id} onClick={(e) => { handleRevoke(e, "운영진") }} red></CheckBtn>
                    </>
                    :
                    null
                }

                {(props.type === "그룹 회장 권한 부여") ?
                    <>
                        <CheckBtn data-id={data.id} onClick={(e) => { handleEmpowerGroupLeader(e) }}></CheckBtn>
                    </>
                    :
                    null
                }

                
        </PostCotent>
    </PostInforBar>
    )

    return (
        <>
           {postdata}
        </>
    );
}

export default React.memo(connect(mapStateToProps,mapDispatchToProps)(PostMemberBar));

