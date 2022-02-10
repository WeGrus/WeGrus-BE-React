import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { DEPARTMENTS } from "../Signup";
import FileUploadComponent from "./fileUpload.component";
import DetailBox, {
  ButtonBox,
  ContentBox,
  EditButton,
  EditPhoto,
  InfoBox,
  InfoText,
  ProfilePhoto,
} from "./ProfileElements";

const EditForm = styled.form``;
const EditInput = styled.form``;
const Select = styled.select``;

function UserInfo(props) {
  const { handleSubmit, register, formState } = useForm();
  const [infoPage, setInfoPage] = useState(true);

  const DATA = props.data;
  const inputRef = useRef(null);
  const handleEditPhoto = async (e) => {
    console.log(e);
    const formData = new FormData();
    const o = formData.append("file", e.target.files[0]);
    console.log(o);
    axios
      .patch("/members/image", {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => console.log(res));
  };

  function handleEditProfile() {
    if (infoPage) {
      setInfoPage(false);
    } else {
      setInfoPage(true);
    }
  }
  useEffect(() => {
    console.log(infoPage);
  }, [infoPage]);

  return (
    <>
      <InfoBox>
        <DetailBox title="프로필 사진 편집">
          <ContentBox>
            <ProfilePhoto>
              <img src={`${DATA.imageUrl}`} alt="profile" />
            </ProfilePhoto>
            <ButtonBox>
              <FileUploadComponent />
              <EditButton type="file">삭제</EditButton>
            </ButtonBox>
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
                <ButtonBox>
                  <EditButton onClick={() => handleEditProfile()}>
                    수정
                  </EditButton>
                </ButtonBox>
              </InfoText>
            </>
          ) : (
            <>
              <EditForm>
                <EditInput
                  {...register("name", {
                    required: "name is required.",
                  })}
                  type="text"
                  placeholder="*이름"
                  hasError={Boolean(formState.errors?.name?.message)}
                />

                <Select
                  {...register("gender", { required: "gender is required." })}
                  placeholder="성별"
                  options={["남성", "여성"]}
                />
                <Select
                  {...register("department", {
                    required: "department is required.",
                  })}
                  placeholder="학과"
                  options={DEPARTMENTS}
                />
                <Select
                  {...register("grade", { required: "grade is required." })}
                  placeholder="학년"
                  options={["1학년", "2학년", "3학년", "4학년"]}
                />
                <Select
                  {...register("academicStatus", {
                    required: "academicStatus is required.",
                  })}
                  placeholder="재학 여부"
                  options={["재학", "휴학", "졸업"]}
                />
                <EditInput
                  {...register("phone", {
                    required: "academicStatus is required.",
                  })}
                  type="tel"
                  placeholder="*전화번호"
                  hasError={Boolean(formState.errors?.password?.message)}
                />
              </EditForm>
              <EditButton onClick={() => handleEditProfile()}>저장</EditButton>
            </>
          )}
        </DetailBox>
      </InfoBox>
    </>
  );
}

export default UserInfo;
