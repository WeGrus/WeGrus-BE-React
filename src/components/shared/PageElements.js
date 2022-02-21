import styled from "styled-components";

export const Background = styled.div`
  width: 1240px;
  background-color: white;
`;
export const Content = styled.div`
  width: 924px;
  margin: auto;
  display: flex;
  flex-direction: column;
`;
export const Category = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #0b665c;
  margin-top: 38px;
  margin-bottom: 16px;
`;
export const Header = styled.div`
  padding-bottom: 16px;
  border-bottom: 2px solid #0b665c;
  margin-bottom: 42px;
  width: 924px;
  padding-top: 16px;
  margin: auto;
`;

export const Title = styled.input`
  width: 924px;
  height: 21px;
  font-size: 18px;
  font-weight: 700;
  border: none;
  margin-bottom: 10px;
`;
export const OtherDetail = styled.div`
  padding-bottom: 16px;
  height: 16px;
  font-size: 14px;

  word-spacing: -3px;
`;
export const DescriptionStyle = `
background-color: wheat;
width: 924px;
height: 300px;
margin: auto;
`;
export const BtnSection = styled.div`
  margin-top: 71px;
  border-top: 2px solid #0b665c;
  padding-top: 12.5px;
`;
export const GoToList = styled.button`
  width: 127px;
  height: 32px;
  border: none;
  border-radius: 15px;
  color: white;
  background-color: #6cd2d7;
  font-size: 14px;
  cursor: pointer;
`;
export const Right = styled.div`
  float: right;
`;
export const SetOption = styled.label`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  width: 134px;
  height: 32px;
  background-color: #6cd2d7;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  margin-right: 8px;
`;
export const Text = styled.div`
  display: inline-block;
  height: 16px;
  font-size: 14px;
  line-height: 16px;
  color: white;
  padding-left: 4px;
`;
export const CheckBox = styled.input`
  margin: 8px 11px 8px 8px;
  width: 16px;
  height: 16px;
`;
export const Write = styled.button`
  width: 53px;
  height: 32px;
  border: none;
  border-radius: 15px;
  color: white;
  background-color: #6cd2d7;
  font-size: 14px;
  margin-left: 9px;
  cursor: pointer;
`;
export const CommentInfor = styled.div`
  word-spacing: -3px;
`;

export const Description = styled.div`
  width: 924px;
  margin: auto;
  border-bottom: 2px solid #0b665c;
  padding-top: 10px;
  position: relative;
`;

export const Recommand = styled.button`
  width: 88px;
  height: 32px;
  font-size: 14px;
  color: white;
  background-color: #6cd2d7;
  border: none;
  border-radius: 15px;
  position: absolute;
  right: 0px;
  bottom: 6px;
  cursor: pointer;
`;

export const Comments = styled.div`
  height: max-content;
`;

export const Comment = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 8px;
  font-size: 14px;
  line-height: 16px;
  position: relative;
  width: 924px;
`;

export const CommentRecommand = styled.span`
  color: #0b665c;
  opacity: 1;
  font-weight: bold;
  padding-left: 5px;
`;
export const CommentContent = styled.div`
  padding-top: 10px;
  margin-left: 20px;
  max-width: 608px;
  min-height: 96.22px;
  white-space: pre-wrap;
  word-break: break-all;
`;

export const Recode = styled.div`
  position: absolute;
  top: 10px;
  right: 0;
`;

export const CommentDelete = styled.button`
  margin-right: 2.98px;
  background-color: white;
  border: 1px solid black;
  border-radius: 15px;
  width: 49.02px;
  height: 29.22;
  cursor: pointer;
`;

export const CommentWriteSection = styled.div`
  display: flex;
  flex-direction: row;
  height: 62px;
  margin-top: 9px;
  padding-bottom: 13px;
  border-bottom: 2px solid #0b665c;
`;

export const CommentWrite = styled.textarea`
  width: 832px;
  border-radius: 15px;
  padding-left: 20px;
  padding-right: 20px;
  height: content-max;
  resize: none;
`;

export const CommentSubmit = styled.button`
  width: 78.39px;
  color: white;
  background-color: #0b665c;
  border: none;
  border-radius: 15px;
  margin-left: 14px;
  font-size: 13px;
  word-spacing: -3px;
  cursor: pointer;
`;

export const Correction = styled.button`
  width: 53px;
  height: 32px;
  border: none;
  border-radius: 15px;
  color: white;
  background-color: #6cd2d7;
  font-size: 14px;
  cursor: pointer;
`;

export const Delete = styled.button`
  width: 53px;
  height: 32px;
  border: none;
  border-radius: 15px;
  color: white;
  background-color: #6cd2d7;
  font-size: 14px;
  margin-left: 9px;
  cursor: pointer;
`;

export const CommentName = styled.div`
  width: 109px;
`;

export const CommentLeft = styled.div`
  min-width: 109px;
  display: flex;
`;

export const CommentNameBox = styled.div`
  min-width: 109px;
  position: relative;
  margin-bottom: 2px;
`;

export const ReCommentName = styled.div`
  width: 20px;
  font-size: 14px;
`;
export const CommentOwnerBtn = styled.div`
  position: absolute;
  bottom: 7.78px;
`;

export const CommentUpdate = styled.button`
  margin-right: 2.98px;
  background-color: white;
  border: 1px solid black;
  border-radius: 15px;
  width: 49.02px;
  height: 29.22;
  cursor: pointer;
`;

export const CommentBtnSection = styled.div`
  position: absolute;
  bottom: 7.78px;
  right: 0px;
`;
export const ReCommentWrite = styled.button`
  margin-left: 7px;
  background-color: white;
  border: 1px solid black;
  border-radius: 15px;
  width: 62px;
  height: 29.22;
  cursor: pointer;
`;

export const PostInfor = styled.div`
  font-weight: 700;
  font-size: 14px;
  margin-top: 3px;
  width: 158px;
  line-height: 16px;
  word-spacing: -3px;
`;

export const PostBtnSection = styled.div`
  margin-top: 9px;
  margin-bottom: 8px;
`;

export const PostRecommand = styled.button`
  width: 59.14px;
  height: 27px;
  font-size: 14px;
  color: white;
  background-color: ${(props) => (props.checked ? "#0B665C" : "#6CD2D7")};
  border: none;
  border-radius: 15px;
  cursor: pointer;
`;

export const PostScrape = styled.button`
  width: 59.14px;
  height: 27px;
  font-size: 14px;
  color: white;
  background-color: ${(props) => (props.checked ? "#0B665C" : "#6CD2D7")};
  border: none;
  border-radius: 15px;
  margin-left: 6.72px;
  cursor: pointer;
`;

export const CommentBox = styled.div`
  border-bottom: 1px solid #555555;
`;

export const Date = styled.span`
  opacity: 0.5;
`;

export const BtnBar = styled.div`
  position: absolute;
  top: 10px;
  right: 3px;
  font-size: 14px;
  opacity: 50%;
  word-spacing: -3px;
`;

export const ReComment = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 8px;
  font-size: 14px;
  line-height: 16px;
  border: 1px solid #ebebeb;
  border-bottom: none;
  position: relative;
  width: 880px;
  margin: 0 auto;
  background-color: #f9f9f9;
`;

export const CommentSpan = styled.span`
  cursor: pointer;
`;

export const HeaderContent = styled.div`
  min-width: 870px;
  margin-left: 12px;
`;

export const PageImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export const CommentImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ReCommentImage = styled.img`
  margin-left: 5px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export const CommentLeftContent = styled.div`
margin-left: 11px;
`
export const DownloadBtn = styled.a`
display: inline-block;
width: 70px;
height: 27px;
line-height: 27px;
margin-left: 6.72px;
background-color: #6CD2D7;
color: white;
border-radius: 20px;
text-align: center;



`

