import * as React from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import AuthLayout from "../auth/AuthLayout";
import PageTitle from "../shared/PageTitle";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  img {
    width: 100px;
    height: 100px;
  }
`;

const Subtitle = styled.span`
  font-size: 14px;
  margin-bottom: 10px;
`;

const FormBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Input = styled.input`
  width: 282px;
  padding: 10px;
  border-radius: 18px;
  background-color: #f5f5f5;
  margin-bottom: 8px;
  &::placeholder {
    font-size: 14px;
  }
  &:focus {
    border-color: #a8a8a8;
  }
`;

const Button = styled.input`
  width: 282px;
  padding: 10px;
  border-radius: 18px;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6cd2d7;
`;

function Login() {
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });
  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <HeaderContainer>
        <img src={require("../../images/logo2.png")} alt="logo" />
        <Subtitle>
          Wegrus는 인하대학교 최대 컴퓨터 동아리 Igrus의 웹사이트입니다.
        </Subtitle>
        <Subtitle>로그인하여 다양한 활동과 커뮤니티를 만나보세요.</Subtitle>
      </HeaderContainer>
      <FormBox>
        <Input
          {...register("id", {
            required: "ID is required.",
          })}
          type="text"
          placeholder="id"
          hasError={Boolean(formState.errors?.id?.message)}
        />
        <Input
          {...register("password", {
            required: "Password is required.",
          })}
          type="password"
          placeholder="password"
          hasError={Boolean(formState.errors?.password?.message)}
        />
        <Button type="submit" value={"Log in"} />
        <input></input>
        <button />
      </FormBox>
      <seperator />
    </AuthLayout>
  );
}
export default Login;
