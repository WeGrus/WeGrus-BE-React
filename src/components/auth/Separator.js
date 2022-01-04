import styled from "styled-components";

const SSeparator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 292px;
  margin: 12px 0 20px 0;
  span {
    font-size: 12px;
    color: black;
    margin: 0 20px;
    font-weight: 600;
  }
  div {
    width: 100%;
    height: 0.5px;
    background-color: black;
  }
`;

function Separator() {
  return (
    <SSeparator>
      <div></div>
      <span>OR</span>
      <div></div>
    </SSeparator>
  );
}
export default Separator;
