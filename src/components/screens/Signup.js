import React, { forwardRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import AuthLayout from "../auth/AuthLayout";
import Button from "../auth/Button";
import HeaderContainer from "../auth/HeaderContainer";
import Input from "../auth/Input";
import PageTitle from "../shared/PageTitle";
import { API_HOST } from "../../App";
import styled from "styled-components";
import axios from "axios";
import { connect } from "react-redux";
import { actionCreators, logUserIn } from "../../store";

/*function Signupo() {
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
}*/

const DEPARTMENTS = [
  "기계공학과",
  "항공우주공학과",
  "조선해양공학과",
  "산업경영공학과",
  "화학공학과",
  "생명공학과",
  "고분자공학과",
  "신소재공학과",
  "사회인프라공학과",
  "환경공학과",
  "공간정보공학과",
  "건축학부",
  "에너지자원공학과",
  "전기공학과",
  "전자공학과",
  "정보통신공학과",
  "수학과",
  "통계학과",
  "물리학과",
  "화학과",
  "생명과학과",
  "해양과학과",
  "식품영양학과",
  "경영학과",
  "글로벌금융학과",
  "아태물류학부",
  "국제통상학과",
  "국어교육과",
  "영어교육과",
  "사회교육과",
  "체육교육과",
  "교육학과",
  "수학교육과",
  "행정학과",
  "정치외교학과",
  "경제학과",
  "소비자학과",
  "아동심리학과",
  "사회복지학과",
  "미디어커뮤니케이션학과",
  "한국어문학과",
  "사학과",
  "철학과",
  "중국학과",
  "일본언어문화학과",
  "영어영문학과",
  "프랑스언어문화학과",
  "문화콘텐츠문화경영학과",
  "의예과",
  "간호학과",
  "의학과",
  "소프트웨어융합공학과",
  "산업경영학과",
  "메카트로닉스공학과",
  "금융투자학과",
  "IBT학과",
  "ISE학과",
  "KLC학과",
  "컴퓨터공학과",
  "인공지능공학과",
  "데이터사이언스학과",
  "스마트모빌리티공학과",
  "디자인테크놀로지학과",
  "소프트웨어융합대학(SCSC)",
  "조형예술학과",
  "디자인융합학과",
  "연극영화학과",
  "의류디자인학과",
];

const GRADE = ["FRESHMAN", "SOPHOMORE", "JUNIOR", "SENIOR"];

const STATUS = ["ATTENDING", "ABSENCE", "GRADUATED"];

function mapStateToProps(state) {
  console.log(state);
  return state;
}
function mapDispatchToProps(dispatch) {
  return {
    logUserIn: (academicStatus, department, grade, name, phone) =>
      dispatch(
        actionCreators.logUserIn(academicStatus, department, grade, name, phone)
      ),
  };
}

const LoginForm = styled.form`
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
`;

const SSelect = styled.select`
  width: 292px;
  padding: 10px;
  border-radius: 18px;
  background-color: #f5f5f5;
  margin-bottom: 8px;
  border: none;
`;

const Select = forwardRef(({ onChange, name, options, placeholder }, ref) => (
  <>
    <SSelect name={name} ref={ref} onChange={onChange}>
      <option value="hide">*-- {placeholder} --</option>
      {options.map((value, dataName) => (
        <option key={value} value={dataName}>
          {value}
        </option>
      ))}
    </SSelect>
  </>
));

function Signup(props) {
  const { handleSubmit, register, formState } = useForm();
  const [emailAuth, setEmailAuth] = useState();

  useEffect(() => {
    axios
      .get(`${API_HOST}signup/validate/email?email=${props.email}`)
      .then((res) => {
        const result = res.data.data.status;
        console.log(result);
        setEmailAuth(result);
      });
  }, []);

  const onSubmit = ({ academicStatus, department, grade, name, phone }) => {
    phone = phone
      .replace(/[^0-9]/, "")
      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);

    const body = {
      academicStatus: STATUS[academicStatus],
      department: DEPARTMENTS[department],
      email: props.email,
      grade: GRADE[grade],
      name,
      phone,
      userId: props.userId,
    };

    console.log(JSON.stringify(body));

    axios
      .post(
        `${API_HOST}signup`,
        JSON.stringify({
          academicStatus: STATUS[academicStatus],
          department: DEPARTMENTS[department],
          email: props.email,
          grade: GRADE[grade],
          name: name,
          phone: phone,
          userId: props.userId,
        }),

        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        logUserIn(body);
        console.log(res);
      })
      .catch((res) => console.log(res));
  };
  function onSubmitInvalid(data) {
    console.log("hi");
  }
  return (
    <AuthLayout>
      <PageTitle title="이메일 인증" />
      <HeaderContainer>
        <span>
          Wegrus는 인하대학교 최대 컴퓨터 동아리 Igrus의 웹사이트입니다.
        </span>
        <span>회원 가입하여 다양한 활동과 커뮤니티를 만나보세요.</span>
      </HeaderContainer>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("name", {
            required: "name is required.",
          })}
          type="text"
          placeholder="*이름"
          hasError={Boolean(formState.errors?.name?.message)}
        />

        <Select
          {...register("department", { required: "department is required." })}
          placeholder="학과"
          options={DEPARTMENTS}
        />
        <Select
          {...register("grade", { required: "grade is required." })}
          placeholder="학년"
          options={["1학년", "2학년", "3학년", "4학년"]}
        />
        <Select
          {...register("academicStatus", {
            required: "academicStatus is required.",
          })}
          placeholder="재학 여부"
          options={["재학", "휴학", "졸업"]}
        />

        <Input
          {...register("phone", { required: "academicStatus is required." })}
          type="tel"
          placeholder="*전화번호"
          hasError={Boolean(formState.errors?.password?.message)}
        />

        <Button color="#106557" ftcolor="white" type="submit" />
      </LoginForm>
    </AuthLayout>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
