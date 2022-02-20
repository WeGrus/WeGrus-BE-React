import styled from "styled-components";
import img from "./../../images/Polygon.jpg";
import { Link } from "react-router-dom";

export const SearchBarSection = styled.div`
  width: 910.07px;
  margin: 0 auto;
  min-height: 64px;
  border-bottom: 2px solid #0b665c;
  font-size: 14px;
  display: flex;
  flex-direction: row;
`;
export const SearchBarForm = styled.form`
  display: flex;
  flex-direction: row;
  margin-left: 20px;
  margin-top: 16px;
`;
export const SearchBarSelect = styled.select`
  width: 117px;
  height: 32px;
  padding-left: 8px;
  border-radius: 50px;
  line-height: 16.41px;
  color: black;
  border: 1px solid black;

  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background: url(${img});
  background-repeat: no-repeat;
  background-size: 17px 17px;
  background-position: bottom 8px right 11px;
`;
export const SearchBar = styled.div`
  margin-left: 9px;
  position: relative;
`;
export const SearchBarInput = styled.input`
  min-width: 331.48px;
  height: 31.59px;
  border: 1px solid black;
  border-radius: 50px;
  padding-left: 19.87px;
`;
export const SearchBarSubmit = styled.input`
  position: absolute;
  right: 3.71px;
  top: 4.25px;
  width: 28.9px;
  height: 25.27px;
  border: none;
  border-radius: 50px;
  border-color: #c4c4c4;
  background-color: #c4c4c4;
  cursor: pointer;
`;

export const SearchBarFilter = styled.select`
  width: 60.52px;
  height: 16.59px;
  line-height: 16.41px;
  margin-top: 24px;
  margin-left: 100.52px;
  border: 1px solid black;

  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;

  background: url(${img});
  background-repeat: no-repeat;
  background-size: 12.35px 10.43px;
  background-position: right 2px bottom 2px;
`;

export const CreateBtnLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0b665c;
  width: 110px;
  height: 33px;
  border-radius: 16.5px;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-left: 100.32px;
  margin-top: 15.85px;
`;

export const InforBar = styled.div`
  font-size: 14px;
  font-weight: 700;
  line-height: 16.41px;
  width: 909.07px;
  margin: 0 auto;
  min-height: 34px;
  border-bottom: 2px solid #0b665c;
`;
export const InforContents = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: row;
  text-align: center;
`;
export const Number = styled.div`
  min-width: 65px;
  text-align: center;
  margin-left: 23px;
`;

export const Categorization = styled.div`
  width: 90px;
  text-align: center;
  margin-left: 4px;
`;
export const Title = styled.div`
  width: 373px;
  margin-left: 62px;
`;

export const Writer = styled.div`
  width: 77px;
  text-align: center;
  margin-left: 62px;
  word-spacing: -3px;
`;
export const BoardName = styled.div`
  width: 130px;
  text-align: center;
  margin-left: 45px;
  word-spacing: -3px;
`;

export const Date = styled.div`
  width: 63px;
  text-align: center;
  margin-left: 16px;
`;

export const Hits = styled.div`
  width: 40px;
  text-align: center;
  margin-left: 10px;
`;

export const Recommendation = styled.div`
  width: 40px;
  text-align: center;
  margin-left: 9px;
`;

export const Comment = styled.div`
  width: 40px;
  text-align: center;
  margin-left: 7px;
`;

export const Grade = styled.div`
  width: 40px;
  text-align: ${(props) => (props.post ? "center" : "left")};
  margin-left: 45px;
  position: relative;
  word-spacing: -3px;
  cursor: ${(props) => (props.post ? "default" : "pointer")};
`;
export const StudentId = styled.div`
  width: 63px;
  text-align: center;
  margin-left: 45px;
  position: relative;
  word-spacing: -3px;
  cursor: ${(props) => (props.post ? "none" : "pointer")};
`;

export const Major = styled.div`
  width: 100px;
  margin-left: 25px;
`;
export const Apply = styled.div`
  width: 83px;
  margin-left: 25px;
  text-align: center;
`;
export const Name = styled.div`
  width: 80px;
  text-align: center;
  margin-left: 45px;
  position: relative;
  cursor: ${(props) => (props.post ? "none" : "pointer")};
`;
export const Role = styled.div`
  width: 68px;
  text-align: left;
  margin-left: 45px;
  word-spacing: -3px;
  position: relative;
  cursor: ${(props) => (props.post ? "none" : "pointer")};
`;
export const Attendance = styled.div`
  width: 42px;
  text-align: left;
  margin-left: 45px;
  word-spacing: -3px;
  position: relative;
  cursor: ${(props) => (props.post ? "none" : "pointer")};
`;

export const Age = styled.div`
  width: 28px;
  text-align: center;
  margin-left: 25px;
`;
export const Permission = styled.div`
  width: 28px;
  text-align: center;
  margin-left: 25px;
  height: 16px;
`;

export const PhoneNumber = styled.div`
  width: 100px;
  position: relative;
  text-align: ${(props) => (props.post ? "center" : "")};
  margin-left: 45px;
  word-spacing: -10px;
  cursor: ${(props) => (props.post ? "pointer" : "auto")};
`;

export const Gender = styled.div`
  width: 42px;
  margin-left: 45px;
  position: relative;
  word-spacing: -3px;
  text-align: left;
  cursor: ${(props) => (props.post ? "none" : "pointer")};
`;

export const Check = styled.div`
  margin-left: 30px;
  width: 30px;
`;

export const CheckBtn = styled.div`
  margin-left: 35px;
  width: 30px;
  height: 16px;
  background-color: ${(props) => (props.red ? "red" : "#6CD2D7")};
  border: none;
  border-radius: 15px;
  cursor: pointer;
`;

export const Withdraw = styled.div`
  width: 28px;
  text-align: center;
  margin-left: 25px;
  height: 16px;
`;
export const PostInforBar = styled.div`
  width: 909.07px;
  height: 31px;
  margin: 0 auto;
  font-size: 14px;
  line-height: 16.41px;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;
export const PostCotent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  :hover {
    font-weight: 700;
  }
`;

export const PostRole = styled.div`
  width: 64px;
  text-align: center;
  margin-left: 45px;
  word-spacing: -3px;
  position: relative;
`;

export const PostAttendance = styled.div`
  width: 42px;
  text-align: center;
  margin-left: 45px;
  word-spacing: -3px;
  position: relative;
`;

export const PostGender = styled.div`
  width: 42px;
  margin-left: 45px;
  position: relative;
  word-spacing: -3px;
  text-align: center;
`;

export const InforSelection = styled.img`
  width: 8px;
  position: absolute;
  right: 0px;
  top: 3px;
  transform: ${(props) => (props.desc ? "rotate( 180deg )" : "none")};
`;

export const Bold = styled.div`
  font-weight: bold;
`;

export const PostNumber = styled.div`

width: 40px;
text-align: center;
margin-left: 44px;
position: relative;
word-spacing: -3px;
`

export const SmallCheckBtn = styled.div`
margin-left: ${(props) => (props.red ? "10px" : "28px")};
width: 15px;
height: 15px;
background-color: ${(props) => (props.red ? "red" : "#6CD2D7")};
border: none;
border-radius: 15px;
cursor: pointer;
`

export const ViewSearchBarSubmit = styled.div`
display: block;
position: absolute;
right: 3.71px;
top: 4.25px;
width: 28.9px;
height: 20.27px;
line-height: 25.27px;
border:none;
border-radius: 50px;
text-align: center;
padding-top: 5px;  
`
