import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { actionCreators } from "../../../store";
import DetailBox, {
  ButtonBox,
  ContentBox,
  DelText,
  DelUserInput,
  EditForm,
  EditProfileInput,
  FormError,
  InfoBox,
  InfoText,
  ProfileButton,
  SubmitButton,
} from "./ProfileElements";

function mapStateToProps(state) {
  console.log(state);
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    editPhoto: (imageUrl) => dispatch(actionCreators.editPhoto(imageUrl)),
    logUserOut: (imageUrl) => dispatch(actionCreators.logUserOut(imageUrl)),
  };
}

function UserAccount(props) {
  let navigate = useNavigate();
  const [sendEmail, setSendEmail] = useState(true);
  const [hasError, setHasError] = useState();

  const DATA = props.userReducer;

  const handleDelUser = () => {
    console.log(DATA.email);

    axios
      .post("/members/verify") //회원 탈퇴를 위해 인증코드를 이메일로 보냄
      .then((res) => {
        if (sendEmail) {
          setSendEmail(false);
        } else {
          setSendEmail(true);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {}, [sendEmail]);
  useEffect(() => {}, [hasError]); //에러 발생시 리렌더링하여 에러메시지 보여줌

  const onSubmit = (data) => {
    axios
      .post(`/members/resign?certificationCode=${data.AuthNum}`)
      .then((res) => {
        //인증코드를 input에 적어 제출하면 회원 탈퇴 완료
        console.log(res);
        props.logUserOut();
        props.navigate("/");
      })
      .catch((err) => {
        const ErrMessage = err.response.data.message;
        console.log(ErrMessage);
        setHasError(ErrMessage); //서버에서 보내는 에러메시지 수취하여 보여줌
      });
  };

  const { handleSubmit, register, formState } = useForm();
  //const DATA = props;
  return (
    <>
      <InfoBox>
        <DetailBox title="회원 탈퇴">
          <ContentBox>
            <InfoText>
              <span>이름 | {DATA.name}</span>
              <span>학번 | {DATA.studentId}</span>
              <span>회원 ID | {DATA.id}</span>
            </InfoText>
            {sendEmail ? (
              <ButtonBox>
                <ProfileButton onClick={() => handleDelUser()}>
                  회원 탈퇴
                </ProfileButton>
              </ButtonBox>
            ) : (
              <EditForm onSubmit={handleSubmit(onSubmit)}>
                <DelText>INHA 이메일로 전송된 인증코드를 입력하세요.</DelText>
                <DelUserInput>
                  <EditProfileInput
                    {...register("AuthNum")}
                    type="text"
                    placeholder="인증코드 입력"
                    maxLength="6"
                    hasError={Boolean(formState.errors?.AuthNum?.message)}
                  />
                  <ButtonBox>
                    <SubmitButton type="submit" value="회원 탈퇴" />
                  </ButtonBox>
                </DelUserInput>
                <FormError>{hasError}</FormError>
              </EditForm>
            )}
          </ContentBox>
        </DetailBox>
      </InfoBox>
    </>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
