import * as React from "react";
import AuthLayout from "../auth/AuthLayout";
import Button from "../auth/Button";
import HeaderContainer from "../auth/HeaderContainer";
import PageTitle from "../shared/PageTitle";
import Input from "../auth/Input";
import FormBox from "../auth/FormBox";
function EmailAuth() {
  return (
    <AuthLayout>
      <PageTitle title="이메일 인증" />
      <HeaderContainer>
        <span>인하대학교 학생 이메일을 통해 인증을 완료해 주세요.</span>
      </HeaderContainer>
      <FormBox>
        <Input placeholder="Inha Email" type="email" />
        <Button color="#106557" ftcolor="white" type="submit" />
      </FormBox>
    </AuthLayout>
  );
}

export default EmailAuth;
