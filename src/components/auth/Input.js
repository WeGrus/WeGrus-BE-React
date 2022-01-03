import styled from "styled-components";

const Input = styled.input`
  width: 272px;
  padding: 10px;
  border-radius: 18px;
  background-color: #f5f5f5;
  margin-bottom: 8px;
  &::placeholder {
    font-size: 14px;
  }
  &:focus {
    border-color: gray;
  }
`;

export default Input;
