import styled from "styled-components";

const SBottomBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 60px;
`;

function BottomBox({ children }) {
  return <SBottomBox>{children}</SBottomBox>;
}

export default BottomBox;
