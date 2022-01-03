import styled from "styled-components";

const SHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0 10px 0;
  img {
    width: 100px;
    height: 100px;
  }
  span {
    font-size: 14px;
    margin-bottom: 10px;
  }
`;

function HeaderContainer({ children }) {
  return (
    <SHeaderContainer>
      <img src={require("../../images/logo2.png")} alt="logo" />
      {children}
    </SHeaderContainer>
  );
}

export default HeaderContainer;
