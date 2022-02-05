import React, { useEffect, useState } from "react";
import AuthLayout from "../auth/AuthLayout";
import Button from "../auth/Button";
import HeaderContainer from "../auth/HeaderContainer";
import PageTitle from "../shared/PageTitle";
import axios from "axios";
import { connect } from "react-redux";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { actionCreators, logInUser, setEmail } from "../../store";

function mapStateToProps(state) {
  console.log(state);
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    setEmail: (text) => dispatch(actionCreators.setEmail(text)),
  };
}

const NextButton = styled(Link)`
  width: 292px;
  span {
    padding: 10px;
  }

  border-radius: 18px;
  color: ${(props) => props.ftcolor};
  font-weight: bold;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
`;

const InhaEmail = styled.div`
  width: 292px;
  padding: 10px;
  border-radius: 18px;
  background-color: #f5f5f5;
  margin-bottom: 8px;
  display: flex;
  align-items: center;

  span {
    color: gray;
  }
`;

const LoginForm = styled.form`
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
`;

function EmailAuth(props) {
  let navigate = useNavigate();

  const { handleSubmit, register, formState } = useForm();
  const [emailAuth, setEmailAuth] = useState(false);
  //const [message, setMessage] = useState("");

  const onSubmit = (data) => {
    data.email = `${data.email}@inha.edu`;
    const EMAIL = data.email;

    axios.post(`/signup/check/email?email=${EMAIL}`).then((res) => {
      const STATUS = res.data.data.status;
      if (STATUS === "success") {
        props.setEmail(data.email);
        window.open("https://mail.google.com/mail/u/1/#inbox", "_blank");
        setEmailAuth(true);
        console.log(res.data.message);
        //setMessage(res.data);
      } else {
        console.log(res);
      }
    });
  };
  function onSubmitInvalid(data) {
    console.log("error");
  }

  useEffect(() => {
    /*  if (!props.userReducer.userId) {
      //window.alert(message);
      navigate("/");
    }*/

    let params = new URL(document.location.toString()).searchParams;
    let verificationKey = params.get("verificationKey");

    if (verificationKey) {
      axios
        .post(`/signup/verify?verificationKey=${verificationKey}`)
        .then((res) => {
          const CERTIFIED = res.data.data.certified;
          console.log(res);
          if (CERTIFIED) {
            console.log(
              "진행하던 회원 가입 브라우저로 이동하여 다음 버튼을 눌러주세요."
            );
          } else {
            console.log("Authentication expired");
          }
        });
    }
  }, []);

  return (
    <AuthLayout>
      <PageTitle title="이메일 인증" />
      <HeaderContainer>
        <span>인하대학교 학생 이메일을 통해 인증을 완료해 주세요.</span>
      </HeaderContainer>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <InhaEmail>
          <input
            {...register("email", {
              required: "학번을 입력하세요.",
            })}
            placeholder="*학번 입력"
            type="text"
          />
          <span>@inha.edu</span>
        </InhaEmail>

        {emailAuth ? (
          <NextButton to="/signup" color="#30B0B0" ftcolor="white">
            <span>다음 단계</span>
          </NextButton>
        ) : (
          <Button color="#106557" ftcolor="white" type="submit" />
        )}
      </LoginForm>
    </AuthLayout>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailAuth);
