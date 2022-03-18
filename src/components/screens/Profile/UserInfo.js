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

function UserInfo(props) {
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

  function handleEditProfile() {
    if (infoPage) {
      setInfoPage(false);
    } else {
      setInfoPage(true);
    } //회원 정보 버튼 클릭 시 state를 바꾸어 수정 화면으로 리렌더링
  }

  const onSubmit = ({
    department,
    academicStatus,
    grade,
    phone,
    introduce,
  }) => {
    phone = phone //전화번호 사이에 "-" 넣어주는 로직
      .replace(/[^0-9]/, "")
      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    const body = {
      academicStatus: STATUS[academicStatus],
      department: DEPARTMENTS[department],
      grade: GRADE[grade],
      introduce,
      name: DATA.name,
      phone,
    };

    console.log(JSON.stringify(body));

    axios
      .patch("/members/info", body, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res.data.data);
        console.log(props);
        props.putUserInfo(
          DATA.id,
          DATA.email,
          DATA.name,
          DATA.studentId,
          DEPARTMENTS[department],
          GRADE[grade],
          DATA.gender,
          phone,
          DATA.createdDate,
          introduce,
          DATA.imageUrl,
          STATUS[academicStatus],
          DATA.roles,
          DATA.group
        );
        console.log(props.userReducer);
        setHasError(false);
        handleEditProfile();
      })
      .catch((err) => {
        const errMessage = err.response.data.message;
        console.log(errMessage);
        setHasError(true);
      });
  };

  return (
    <>
      <InfoBox>
        <DetailBox title="프로필 사진 편집">
          <ContentBox>
            <ProfilePhoto>
              <img src={`${DATA.imageUrl}`} alt="profile" />
            </ProfilePhoto>
            {props?.userReducer?.roles?.length > 1 ? (
              <ButtonBox>
                <FileUploadComponent />
                <EditButton type="file" onClick={() => handleDeletePhoto()}>
                  삭제
                </EditButton>
              </ButtonBox>
            ) : null}
          </ContentBox>
        </DetailBox>
        <DetailBox title="회원 정보">
          {infoPage ? (
            <>
              <InfoText>
                <span>이름 | {DATA.name}</span>
                <span>학번 | {DATA.studentId}</span>
                <span>학과 | {DATA.department}</span>
                <span>학년 | {DATA.grade}</span>
                <span>상태 | {DATA.academicStatus}</span>
                <span>연락처 | {DATA.phone}</span>
                <span>소개 | {DATA.introduce}</span>
                {props?.userReducer?.roles?.length > 1 ? (
                  <ButtonBox>
                    <EditButton onClick={() => handleEditProfile()}>
                      수정
                    </EditButton>
                  </ButtonBox>
                ) : null}
              </InfoText>
            </>
          ) : (
            <>
              <EditForm onSubmit={handleSubmit(onSubmit)}>
                <EditInput>
                  <div>이름 | {DATA.name}</div>
                  {/*<EditProfileInput
                    {...register("name", {
                      required: "name is required.",
                    })}
                    value={DATA.name}
                    type="text"
                    placeholder="*이름"
                    hasError={Boolean(formState.errors?.name?.message)}
                  />*/}
                </EditInput>
                <EditInput>
                  <div>학번 | {DATA.studentId}</div>
                </EditInput>
                <EditInput>
                  <div>학과 | </div>
                  <Select
                    {...register("department", {
                      required: "학과는 필수 입력 요소입니다.",
                    })}
                    placeholder="학과"
                    options={DEPARTMENTS}
                  />
                </EditInput>
                <EditInput>
                  <div>학년 | </div>
                  <Select
                    {...register("grade", {
                      required: "학년은 필수 입력 요소입니다.",
                    })}
                    placeholder="학년"
                    options={["1학년", "2학년", "3학년", "4학년", "그 외"]}
                  />
                </EditInput>
                <EditInput>
                  <div>상태 | </div>
                  <Select
                    {...register("academicStatus", {
                      required: "학적 상태는 필수 입력 요소입니다.",
                    })}
                    placeholder="재학 여부"
                    options={["재학", "휴학", "졸업"]}
                  />
                </EditInput>
                <EditInput>
                  <div>연락처 | </div>
                  <EditProfileInput
                    {...register("phone", {
                      required: "연락처는 필수 입력 여부입니다.",
                    })}
                    defaultValue={DATA.phone.replace(/-/g, "")}
                    type="tel"
                    placeholder="*전화번호"
                    hasError={Boolean(formState.errors?.password?.message)}
                  />
                </EditInput>
                <EditInput>
                  <div>소개 | </div>
                  <EditProfileInput
                    {...register("introduce")}
                    defaultValue={DATA.introduce}
                    type="text"
                    placeholder="소개"
                    hasError={Boolean(formState.errors?.password?.message)}
                  />
                </EditInput>
                {hasError ? (
                  <FormError>필수 항목을 모두 입력해주세요.</FormError>
                ) : null}
                <ButtonBox>
                  <SubmitButton type="submit" />
                </ButtonBox>
              </EditForm>
            </>
          )}
        </DetailBox>
      </InfoBox>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
