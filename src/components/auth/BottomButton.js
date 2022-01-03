import { Link } from "react-router-dom";
import styled from "styled-components";

const BottomButton = styled(Link)`
  width: 292px;
  padding: 10px;
  border-radius: 18px;
  color: ${(props) => props.ftcolor};
  font-weight: bold;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
`;

export default BottomButton;
