import * as React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import AuthLayout from "../auth/AuthLayout";
import BottomBox from "../auth/BottomBox";
import BottomButton from "../auth/BottomButton";
import Button from "../auth/Button";
import FindLink from "../auth/FindLink";
import FormBox from "../auth/FormBox";
import HeaderContainer from "../auth/HeaderContainer";
import Input from "../auth/Input";
import Separator from "../auth/Separator";
import PageTitle from "../shared/PageTitle";

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
      <HeaderContainer />

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
        <Button
          type="submit"
          value={"Log in"}
          color="#6cd2d7"
          ftcolor="white"
        />
      </FormBox>
      <BottomBox>
        <Separator />
        <BottomButton to="/signup" color="#0D655C" ftcolor="white">
          Sign up
        </BottomButton>
        <BottomButton to="/" color="#FAE100" ftcolor="black">
          Kakao Log in
        </BottomButton>
        <FindLink />
      </BottomBox>
    </AuthLayout>
  );
}
export default Login;
