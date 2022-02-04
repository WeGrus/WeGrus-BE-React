import {
  faFonticons,
  faInstagram,
  faInstagramSquare,
  faNode,
} from "@fortawesome/free-brands-svg-icons";
import { faBook, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Title } from "../shared/PageElements";

import PageTitle from "../shared/PageTitle";

const AboutContentBox = styled.div`
  width: 1240px;
  height: max-content;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 40px 160px 40px 160px;
`;
const WelcomeTitle = styled.div`
  width: 100%;
  font-size: 24px;
  font-weight: 600;
  margin: 40px 0 40px 0;
  display: flex;
  justify-content: center;
`;
const AboutTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 40px 0 40px 0;
`;

const Emoji = styled.span`
  font-size: 45px;
`;

const IGImage = styled.div`
  width: 922px;
  height: 450px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  img {
    opacity: 90%;
    width: 100%;
    object-fit: cover;
  }
`;

const DescriptionBox = styled.div`
  width: 922px;
  height: max-content;
  background-color: #f5f5f5;
  overflow: hidden;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SmallDescriptionBox = styled.div`
  width: 456px;
  height: max-content;
  background-color: #f5f5f5;
  overflow: hidden;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Paragraph = styled.p`
  font-size: 16px;
  line-height: 24px;
  margin: 12px 0 12px 0;
  font-weight: ${(props) => props.weight};
  opacity: 80%;
`;

const BtnLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6cd2d7;
  width: 160px;
  height: 40px;
  border-radius: 20px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #6cd2d7;
  }
`;

const LinkBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const SNSLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 2px solid #808080;
  color: #808080;
  width: 290px;
  height: 50px;
  border-radius: 25px;
  font-size: 17px;
  margin: 24px 0 24px 0;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  span {
    margin-right: 5px;
    font-size: 15px;
  }

  &:hover {
    transition: all 0.2s ease-in-out;
    color: black;
    border-color: black;
  }
`;

const TextBox = styled.div`
  width: 100%;
  padding: 30px;
`;

function About() {
  return (
    <>
      <PageTitle title="About" />
      <AboutContentBox>
        <TitleBox>
          <AboutTitle>| IGRUS는 어떤 동아리인가요?</AboutTitle>
          <BtnLink to="/login">동아리 가입 신청</BtnLink>
        </TitleBox>
        <DescriptionBox>
          <IGImage>
            <img
              src={require("../../images/아이그루스.png")}
              alt="아이그루스 이미지"
            />
          </IGImage>
          <TextBox>
            <AboutTitle>
              IT 관련 ‘스펙’, ‘학술’, ‘친목’, ‘협업’ 모든 것이 준비되어 있는
              인천 최고/최대 규모의 컴퓨터 동아리
            </AboutTitle>
            <Paragraph weight="500">
              - IGRUS(아이그루스)는 Inha Group of Research for Unix Security의
              약자로서 2000년부터 시작된 정통처 산하 컴퓨터 학술 자치회입니다.
              보안동아리로써는 국내 대학교들 중 2번째로 오랜 역사를 지니고
              있으며, 인하대에서 가장 많은 회원을 보유한 동아리입니다.
            </Paragraph>

            <Paragraph weight="500">
              - 현재 컴퓨터공학과, 정보통신공학과의 많은 학생과 더불어 경영학과,
              문화콘텐츠학과, 디자인학과, 기계공학과, 전기과, 의학과 등 다양한
              학과의 학생들이 활동하고 있으며 이를 토대로 높은 실적 및 인적
              커뮤니티를 쌓아가고 있습니다.
            </Paragraph>
            <Paragraph weight="700">📍위치 : 인하대학교 5동 003호</Paragraph>
          </TextBox>
        </DescriptionBox>
        <LinkBox>
          <SNSLink href="http://pf.kakao.com/_BfRNs">
            <span>카카오톡 채널</span>
            <FontAwesomeIcon icon={faComment} />
          </SNSLink>
          <SNSLink href="https://www.instagram.com/igrus_inha/">
            <span>IGRUS 인스타그램</span>
            <FontAwesomeIcon icon={faInstagramSquare} />
          </SNSLink>
          <SNSLink href="https://classic-domain-27e.notion.site/2021-2-IGRUS-4e8434cdd25841dfa3b16b7291923964">
            <span>IGRUS Notion</span> <FontAwesomeIcon icon={faBook} />
          </SNSLink>
        </LinkBox>
        <TitleBox>
          <AboutTitle>| 어떤 활동들이 있나요?</AboutTitle>
        </TitleBox>
        <SmallDescriptionBox>sfsfs</SmallDescriptionBox>
        <SmallDescriptionBox>sfsfs</SmallDescriptionBox>
        <SmallDescriptionBox>sfsfs</SmallDescriptionBox>
        <SmallDescriptionBox>sfsfs</SmallDescriptionBox>
      </AboutContentBox>
    </>
  );
}
export default About;
