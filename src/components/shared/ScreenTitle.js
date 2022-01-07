import styled from "styled-components";

const SScreenTitle = styled.div`
  width: 100%;
  h1 {
    width: 100%;
    font-size: 16px;
    color: #0b665c;
    margin: 30px 0 30px 25px;
    font-weight: bold;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    width: 96%;
    height: 2px;
    background-color: #0b665c;
  }
`;

function ScreenTitle({ children }) {
  return (
    <SScreenTitle>
      <h1>{children}</h1>
      <div></div>
    </SScreenTitle>
  );
}
export default ScreenTitle;
