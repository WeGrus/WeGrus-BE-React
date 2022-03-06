import axios from "axios";
import { forwardRef, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import styled from "styled-components";
import { actionCreators } from "../../../store";
import { DEPARTMENTS, GRADE, STATUS } from "../Signup";
import DetailBox, {
  ButtonBox,
  ContentBox,
  EditButton,
  EditForm,
  EditInput,
  EditProfileInput,
  FormError,
  InfoBox,
  InfoText,
  ProfilePhoto,
  SubmitButton,
} from "./../Profile/ProfileElements";

function mapStateToProps(state) {
  console.log(state);
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    editPhoto: (imageUrl) => dispatch(actionCreators.editPhoto(imageUrl)),
    putUserInfo: (
      id,
      email,
      name,
      studentId,
      department,
      grade,
      gender,
      phone,
      createdDate,
      introduce,
      imageUrl,
      academicStatus,
      roles,
      group
    ) =>
      dispatch(
        actionCreators.putUserInfo(
          id,
          email,
          name,
          studentId,
          department,
          grade,
          gender,
          phone,
          createdDate,
          introduce,
          imageUrl,
          academicStatus,
          roles,
          group
        )
      ),
  };
}
const SSelect = styled.select`
  width: 80%;
`;

function UserInfo(props) {
  console.log(props);
  const {data} =props;
  console.log(data);
  const formData = new FormData();
  formData.append("emtyData", null);

  return (
    <>
      <InfoBox>
        <DetailBox title="프로필 사진 편집">
          <ContentBox>
            <ProfilePhoto>
              <img src={`${data.imageUrl}`} alt="profile" />
            </ProfilePhoto>
          </ContentBox>
        </DetailBox>
        <DetailBox title="회원 정보">
          <InfoText>
            <span>이름 | {data.name}</span>
            <span>학번 | {data.studentId}</span>
            <span>학과 | {data.department}</span>
            <span>학년 | {data.grade}</span>
            <span>상태 | {data.academicStatus}</span>
            <span>연락처 | {data.phone}</span>
            <span>소개 | {data.introduce}</span>
          </InfoText>
        </DetailBox>
      </InfoBox>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
