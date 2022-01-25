import React, { useEffect } from "react";
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
import { API_HOST } from "../../App";
import { Link, Navigate, useNavigate } from "react-router-dom";
import BottomButton from "../auth/BottomButton";
import { Simulate } from "react-dom/cjs/react-dom-test-utils.production.min";

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

function EmailAuth() {
  const { handleSubmit, register, formState } = useForm();
  let navigate = useNavigate();

  const onSubmit = (data) => {
    data.email = `${data.email}@inha.edu`;
    const EMAIL = data.email;

    axios
      .post(`${API_HOST}signup/check/email?email=${EMAIL}`)
      .then((res) => {
        const STATUS = res.data.data.status;
        if (STATUS === "success") {
          window.open("https://mail.google.com/mail/u/1/#inbox", "_blank");
        }
      })
      .catch((res) => console.log(res));
  };
  function onSubmitInvalid(data) {
    console.log("hi");
  }
  useEffect(() => {
    let params = new URL(document.location.toString()).searchParams;
    let verificationKey = params.get("verificationKey");

    if (verificationKey) {
      axios
        .post(`${API_HOST}signup/verify?verificationKey=${verificationKey}`)
        .then((res) => {
          const CERTIFIED = res.data.data.certified;
          console.log(CERTIFIED);
          if (CERTIFIED) {
            navigate("/signup");
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

        <Button color="#106557" ftcolor="white" type="submit" />
      </LoginForm>
    </AuthLayout>
  );
}

export default EmailAuth;
