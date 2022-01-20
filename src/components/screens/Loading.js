import { Link } from "react-router-dom";
import styled from "styled-components";

const SFindLink = styled.div`
  margin: 10px 0 10px 0;
  a {
    color: black;
    font-size: 12px;
    padding: 5px;
  }
`;

function Loading() {
  return (
    <SFindLink>
      <Link to="/">아이디 찾기</Link>|<Link to="/">비밀번호 찾기</Link>
    </SFindLink>
  );
}
export default Loading;
