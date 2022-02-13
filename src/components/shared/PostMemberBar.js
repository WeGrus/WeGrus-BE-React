import styled from "styled-components";
import * as React from "react"
import {PostInforBar,PostCotent,Grade,StudentId,PhoneNumber,Name,PostRole,PostAttendance,PostGender,PostNumber,CheckBtn} from "./BoardElement"



const printGrade = (value) => {
    switch(value){
        case "FRESHMAN":
            return 1
        case "SOPHOMORE":
            return 2
        case "JUNIOR":
            return 3
        case "SENIOR":
            return 4
        case "ETC ":
            return "5+"
    }
}

const printAcademicStatus = (value) => {
    switch(value){
        case "ATTENDING":
            return "재학"
        case "ABSENCE":
            return "휴학"
        case "GRADUATED":
            return "졸업"
        case "ETC":
            return "그외"
    }
}

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


function PostMemberBar(props) { // 기존의 postBar에서 userReducer가 추가되었습니다. 변경하고 나서 문제가 생기실 수도 있으니 한번 확인해주시길 바랍니다.
    //console.log(props);
    //console.log("렌더링문제?");
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
        </PostCotent>
    </PostInforBar>
    )

    return (
        <>
           {postdata}
        </>
    );
}

export default React.memo(PostMemberBar);




function PostMemberOutBar(props){

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
            <CheckBtn></CheckBtn>
        </PostCotent>
    </PostInforBar>
    )

    return (
        <>
           {postdata}
        </>
    );
}

export {PostMemberOutBar};
