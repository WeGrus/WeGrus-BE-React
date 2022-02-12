import axios from "axios";
import { forwardRef, useEffect, useRef, useState } from "react";
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
  EditPhoto,
  InfoBox,
  InfoText,
  ProfilePhoto,
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
      phone,
      createdDate,
      introduce,
      imageUrl,
      academicStatus,
      roles
    ) =>
      dispatch(
        actionCreators.putUserInfo(
          id,
          email,
          name,
          studentId,
          department,
          grade,
          phone,
          createdDate,
          introduce,
          imageUrl,
          academicStatus,
          roles
        )
      ),
  };
}

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const EditInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 13px;

  span {
    font-weight: 400;
  }
`;

const SSelect = styled.select`
  width: 80%;
`;

const Select = forwardRef(({ onChange, name, options, placeholder }, ref) => (
  <>
    <SSelect name={name} ref={ref} onChange={onChange}>
      <option value="hide">*--{placeholder}--</option>
      {options.map((value, dataName) => (
        <option key={value} value={dataName}>
          {value}
        </option>
      ))}
    </SSelect>
  </>
));

const EditProfileInput = styled.input`
  border: 1px solid gray;
  border-radius: 3px;
  width: 75%;
`;

const SubmitButton = styled.input`
  width: 63px;
  height: 33px;
  background-color: #0b665c;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 20px;
  color: white;
  font-weight: 500;
  cursor: pointer;
`;

function UserInfo(props) {
  console.log(props);
  const { handleSubmit, register, formState } = useForm();
  const [infoPage, setInfoPage] = useState(true);
  const [emtyFile, setEmtyFile] = useState();

  const DATA = props.data;
  const emtyData = new FormData();

  useState(() => {
    console.log("delete photo");
  }, [DATA]);

  const config = {
    header: { "content-type": "multipart/form-data" },
  };
  const formData = new FormData();
  formData.append("emtyData", null);

  const handleDeletePhoto = () => {
    axios
      .patch("/members/image", formData, config)
      .then((res) => {
        console.log(props);
        setEmtyFile(res.data.data.status);
        props.editPhoto(
          "https://igrus-webservice-bucket.s3.ap-northeast-2.amazonaws.com/basic.jpeg"
        );
      })
      .catch((err) => {
        console.log("회원 이미지가 이미 기본 이미지입니다.");
      });
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

  const onSubmit = ({
    department,
    academicStatus,
    grade,
    phone,
    introduce,
  }) => {
    phone = phone
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
        console.log(res);
        props.putUserInfo(
          DATA.id,
          DATA.email,
          DATA.name,
          DATA.studentId,
          DEPARTMENTS[department],
          GRADE[grade],
          phone,
          DATA.createdDate,
          introduce,
          DATA.imageUrl,
          STATUS[academicStatus],
          DATA.roles
        );
        handleEditProfile();
      })
      .catch((res) => console.log(res));
  };

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
              <EditButton type="file" onClick={() => handleDeletePhoto()}>
                삭제
              </EditButton>
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
                      required: "department is required.",
                    })}
                    placeholder="학과"
                    options={DEPARTMENTS}
                  />
                </EditInput>
                <EditInput>
                  <div>학년 | </div>
                  <Select
                    {...register("grade", { required: "grade is required." })}
                    placeholder="학년"
                    options={["1학년", "2학년", "3학년", "4학년", "그 외"]}
                  />
                </EditInput>
                <EditInput>
                  <div>상태 | </div>
                  <Select
                    {...register("academicStatus", {
                      required: "academicStatus is required.",
                    })}
                    placeholder="재학 여부"
                    options={["재학", "휴학", "졸업"]}
                  />
                </EditInput>
                <EditInput>
                  <div>연락처 | </div>
                  <EditProfileInput
                    {...register("phone", {
                      required: "phone is required.",
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
                    {...register("introduce", {
                      required: "introduce is required.",
                    })}
                    defaultValue={DATA.introduce}
                    type="text"
                    placeholder="소개"
                    hasError={Boolean(formState.errors?.password?.message)}
                  />
                </EditInput>

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
