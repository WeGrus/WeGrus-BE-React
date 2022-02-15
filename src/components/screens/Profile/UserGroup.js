import axios from "axios";
import { forwardRef, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import styled from "styled-components";
import { actionCreators } from "../../../store";
import { DEPARTMENTS, GRADE, STATUS } from "../Signup";
import FileUploadComponent from "./fileUpload.component";
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
} from "./ProfileElements";

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

const Select = forwardRef(({ onChange, name, options, placeholder }, ref) => (
  <>
    <SSelect name={name} ref={ref} onChange={onChange} required>
      <option value="hide">*--{placeholder}--</option>
      {options.map((value, dataName) => (
        <option key={value} value={dataName}>
          {value}
        </option>
      ))}
    </SSelect>
  </>
));

function UserGroup(props) {
  console.log(props);
  const { handleSubmit, register, formState } = useForm();
  const [infoPage, setInfoPage] = useState(true);
  const [hasError, setHasError] = useState(false);

  const DATA = props.data;

  useState(() => {
    console.log("delete photo");
  }, [DATA, hasError, infoPage]); //DATA에 변화가 생기면 리렌더링하여 기본 프로필 사진을 띄웁니다.

  const config = {
    header: { "content-type": "multipart/form-data" },
  };
  const formData = new FormData();
  formData.append("emtyData", null);

  const handleDeletePhoto = () => {
    axios
      .patch("/members/image", formData, config)
      .then((res) => {
        props.editPhoto(
          "https://igrus-webservice-bucket.s3.ap-northeast-2.amazonaws.com/basic.jpeg"
        );
      })
      .catch((err) => {
        const ErrMessage = err?.response?.data?.message;
        console.log(ErrMessage); //이미지 변경 중 에러 발생 시 에러 메시지를 프린트
      });
  };

  return (
    <>
      <InfoBox>
        <DetailBox title="소모임 목록">
          <ContentBox>
            <ButtonBox>
              <FileUploadComponent />
              <EditButton>삭제</EditButton>
            </ButtonBox>
          </ContentBox>
        </DetailBox>
        <DetailBox title="회원 정보">
          <InfoText>
            <ButtonBox>
              <EditButton>수정</EditButton>
            </ButtonBox>
          </InfoText>

          <ButtonBox>
            <SubmitButton type="submit" />
          </ButtonBox>
        </DetailBox>
      </InfoBox>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(UserGroup);
