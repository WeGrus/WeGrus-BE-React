import styled from "styled-components";

export const Content = styled.div`
  width: 924px;
  background-color: white;
`;

export const InfoBox = styled.div`
  width: 100%;
  height: 360px;
  display: flex;
`;

export const SDetailBox = styled.div`
  width: 50%;
  height: 100%;
  padding: 24px;

  justify-content: center;
  align-items: center;
  span {
    font-weight: 600;
    font-size: 14px;
  }
`;

export const ProfileContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 24px;
`;

export const ProfilePhoto = styled.div`
  height: 134px;
  width: 134px;
  background-color: #f4f4f4;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

export const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-weight: 400;
    margin-bottom: 16px;
  }
`;
export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const EditButton = styled.button`
  width: 63px;
  height: 33px;
  background-color: #0b665c;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 20px;
  color: white;
  font-weight: 500;
  cursor: pointer;
`;
export const EditPhoto = styled.div`
  width: 63px;
  height: 33px;
  background-color: #0b665c;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 20px;
  color: white;
  font-weight: 500;
  cursor: pointer;
  input {
    display: none;
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  margin: 30px;
  width: 134px;
  justify-content: space-between;
`;

function DetailBox({ title, children }) {
  return (
    <SDetailBox>
      <span>{title}</span>
      <ProfileContent>{children}</ProfileContent>
    </SDetailBox>
  );
}

export default DetailBox;
