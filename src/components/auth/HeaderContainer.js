import { Link } from "react-router-dom";
import styled from "styled-components";

const SHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0 40px 0;
  img {
    width: 150px;
    height: 150px;
  }
  span {
    font-size: 14px;
    margin-bottom: 10px;
  }
`;

function HeaderContainer({ children }) {
  return (
    <SHeaderContainer>
      <Link to={"/"}>
        <img src={require("../../images/logo2.png")} alt="logo" />
      </Link>

      {children}
    </SHeaderContainer>
  );
}

export default HeaderContainer;
