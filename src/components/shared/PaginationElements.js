import styled from "styled-components";

export const PaginationSection = styled.nav`
  width: max-content;
  margin: auto;
  margin-top: 34px;
`;
export const Pagebtn = styled.button`
  width: 20px;
  border: none;
  background-color: white;
  &:hover {
    font-weight: 700;
    cursor: pointer;
  }
  &[aria-current] {
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;
export const BtnSpan = styled.span`
  position: relative;
`;

export const BtnBox = styled.div`
  position: absolute;
  width: 120px;
  height: 30px;
  bottom: 17px;
  left: 0px;
  display: none;
  font-size: 14px;
  border: 1px solid;
  border-color: #ccc #c6c6c6 #c3c3c3 #ccc;
  border-radius: 10px;
`;

export const MovePageInput = styled.input`
  margin-top: 4px;
  margin-left: 9px;
  display: inline-block;
  width: 40px;
  border: 1px solid;
  border-color: #ccc #c6c6c6 #c3c3c3 #ccc;
`;
export const MovePageSubmit = styled.button`
  display: inline-block;
  width: 44px;
  padding: 0px;
  margin-left: 8px;
  border-radius: 3px;
  font-size: 13px;
  background: linear-gradient(to bottom, #fff 0, #f3f3f3 100%);
  border-color: #ccc #c6c6c6 #c3c3c3 #ccc;
`;
