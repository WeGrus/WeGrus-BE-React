import * as React from "react";
import AuthLayout from "../auth/AuthLayout";
import Button from "../auth/Button";
import HeaderContainer from "../auth/HeaderContainer";
import PageTitle from "../shared/PageTitle";
import Input from "../auth/Input";
import FormBox from "../auth/FormBox";
import axios from "axios";
import { connect } from "react-redux";
import styled from "styled-components";
import { useForm } from "react-hook-form";

const InhaEmail = styled.div`
  width: 292px;
  padding: 10px;
  border-radius: 18px;
  background-color: #f5f5f5;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  span {
    color: gray;
  }
`;

const LoginForm = styled.form`
  margin-bottom: 60px;
`;

function EmailAuth() {
  const { handleSubmit, register } = useForm();

  const onSubmit = (data) => {
    const Id = data.schoolId;
    console.log(Id);
    axios
      .post(
        `http://ec2-3-35-129-82.ap-northeast-2.compute.amazonaws.com:8080/signup/check/email?email=${Id}%40inha.edu`
      )
      .then((res) => console.log(res))
      .catch((res) => console.log(res));
  };
  function onSubmitInvalid(data) {
    console.log("hi");
  }
  return (
    <AuthLayout>
      <PageTitle title="이메일 인증" />
      <HeaderContainer>
        <span>인하대학교 학생 이메일을 통해 인증을 완료해 주세요.</span>
      </HeaderContainer>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <InhaEmail>
          <input
            {...register("schoolId", {
              required: "학번을 입력하세요.",
            })}
            placeholder="학번 입력"
            type="text"
          />
          <span>@inha.edu</span>
        </InhaEmail>

        <Button color="#106557" ftcolor="white" type="submit" />
      </LoginForm>
    </AuthLayout>
  );
}

export default EmailAuth;
