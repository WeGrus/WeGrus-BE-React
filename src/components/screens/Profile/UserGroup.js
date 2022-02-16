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
  ProfileButton,
  ProfilePhoto,
  SubmitButton,
} from "./ProfileElements";

function mapStateToProps(state) {
  console.log(state);
  return state;
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

const EnrollBtnBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const EnrollBtn = styled.button`
  width: 190px;
  height: 40px;
  border: none;

  background-color: #0b665c;
  color: white;
  font-weight: 600;
  margin-bottom: 15px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #0b665c;
  }
`;

function UserGroup(props) {
  console.log(props);

  const [hasError, setHasError] = useState(false);
  const [groupData, setGroupData] = useState([]);

  const handleEnrollClub = (data) => {
    console.log(data);
    axios
      .post(`/members/groups/apply?groupId=${data.id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        const errMessage = err.response.data.message;
        window.alert(errMessage);
      });
  };

  const DATA = props.userReducer;
  const userGroup = DATA.group;
  console.log(userGroup);

  const getGroups = () => {
    axios.get("members/groups").then((res) => {
      const GROUPS = res.data.data;
      setGroupData(GROUPS);
      console.log(GROUPS);
    });
  };

  useState(() => {
    getGroups();
    console.log("delete photo");
  }, [DATA, hasError]); //DATA에 변화가 생기면 리렌더링하여 기본 프로필 사진을 띄웁니다.

  return (
    <>
      <InfoBox>
        <DetailBox title="내 그룹">
          <InfoText>
            {userGroup !== [] ? (
              <span>소모임에 가입하지 않았습니다.</span>
            ) : (
              userGroup.map((data) => <span>{data}</span>)
            )}
          </InfoText>
        </DetailBox>
        <DetailBox title="소모임 신청">
          <ContentBox>
            <InfoBox>
              <EnrollBtnBox>
                {groupData.map((data) => (
                  <EnrollBtn
                    key={data.id}
                    onClick={() => handleEnrollClub(data)}
                  >
                    {data.name} 가입 신청
                  </EnrollBtn>
                ))}
              </EnrollBtnBox>
            </InfoBox>
          </ContentBox>
        </DetailBox>
      </InfoBox>
    </>
  );
}

export default connect(mapStateToProps)(UserGroup);
