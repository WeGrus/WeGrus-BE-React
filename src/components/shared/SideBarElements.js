import styled from "styled-components";

export const SideBox = styled.div`
  width: 292px;
  height: min-content;
  margin-right: 24px;
  padding: 12px 0 12px 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export const SideContent = styled.button`
  margin: 12px;
  background-color: white;
  border: none;
  width: 100px;
  font-size: 14px;
  cursor: pointer;
`;

export const SideBoldContent = styled.button`
  margin: 12px;
  background-color: white;
  border: none;
  width: 100px;
  font-size: 14px;
  cursor: pointer;
  font-weight:bold;
`;
