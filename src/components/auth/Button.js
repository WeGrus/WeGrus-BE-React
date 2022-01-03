import styled from "styled-components";

const Button = styled.input`
  width: 272px;
  padding: 10px;
  border-radius: 18px;
  color: ${(props) => props.ftcolor};
  font-weight: bold;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => props.color};
`;

export default Button;
