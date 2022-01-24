import * as React from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
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

function Signup() {
  const location = useLocation();

  const { register, formState } = useForm({
    mode: "onChange",
  });

  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <HeaderContainer>
        <span>
          Wegrus는 인하대학교 최대 컴퓨터 동아리 Igrus의 웹사이트입니다.
        </span>
        <span>회원 가입하여 다양한 활동과 커뮤니티를 만나보세요.</span>
      </HeaderContainer>

      <FormBox>
        <Input
          {...register("email", {
            required: "email is required.",
          })}
          type="email"
          placeholder="Inha email"
          hasError={Boolean(formState.errors?.email?.message)}
        />
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
        <Input
          {...register("password", {
            required: "Password is required.",
          })}
          type="password"
          placeholder="password 확인"
          hasError={Boolean(formState.errors?.password?.message)}
        />
        <Button
          type="submit"
          value={"Sign up"}
          color="#6cd2d7"
          ftcolor="white"
        />
      </FormBox>
    </AuthLayout>
  );
}
export default Signup;
