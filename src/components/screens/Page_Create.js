import * as React from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import styled from "styled-components";
import { Editor } from '@toast-ui/react-editor';
import { useLocation } from 'react-router-dom'
import Checkbox from './../shared/Checkbox'
import react from 'react';

const Background = styled.div`
  width: 1240px;
  height: 1240px;          
  background-color: white;
`;

const Content = styled.div`
width: 924px;
margin: auto;
display: flex;
flex-direction: column;
`;

const Category = styled.div`
font-size: 18px;
font-weight: 700;
color: #0B665C;
margin-top: 38px;
margin-bottom: 16px;

`;

const Header = styled.div`
padding-bottom: 16px;
border-bottom: 2px solid #0B665C;
margin-bottom: 42px;
`

const Title = styled.input`
width: 924px;
height: 21px;
font-size: 18px;
font-weight: 700;
border: none;
margin-bottom: 10px;
`

const OtherDetail = styled.div`

`

const DescriptionStyle = `
background-color: wheat;
width: 924px;
height: 300px;
margin: auto;
`

const BtnSection = styled.div`
margin-top: 71px;
border-top: 2px solid #0B665C;
padding-top: 12.5px;
`

const GoToList = styled.button`
width: 127px;
height: 32px;
border: none;
border-radius: 15px;
color: white;
background-color: #6CD2D7;
font-size: 14px;
`

const Right = styled.div`
float: right;
`

const SetSecret = styled.div`
display: inline-flex;
flex-direction: row;
align-items: center;
width:134px;
height: 32px;
background-color: #6CD2D7;
border: none;
border-radius: 16px;
`
const Text = styled.div`
display: inline-block;
height: 16px;
font-size: 14px;
line-height: 16px;
color: white;
padding-left:4px;
`

const CheckBox = styled.input`
margin: 8px 11px 8px 8px;
width: 16px;
height: 16px;
`

const Write = styled.button`
width: 53px;
height: 32px;
border: none;
border-radius: 15px;
color: white;
background-color: #6CD2D7;
font-size: 14px;
margin-left: 9px;
`

function Page(props) {
  const editorRef = React.createRef();
  const state = useLocation().state;

  const [checked,setState] = react.useState( { checked: false })

  const handleCheckboxChange = event => {
    setState({ checked: event.target.checked })
  }

  function check(e){
    // const deitorInstance = editorRef.current.getInstance();
    // const getContent_md = deitorInstance.getMarkdown();
    // console.log("마크다운");
    // console.log(getContent_md);
    // const getContent_html = deitorInstance.getHTML();
    // console.log("html");
    // console.log(getContent_html);
  }



    return (
      <div>
        <Background>
          <Content>
            <Category>{state.category}|{state.subCategory.target}</Category>
            <Header>
              <Title type="text" placeholder="제목"></Title>
              <OtherDetail>{"이름 들어가야 함."}</OtherDetail>
            </Header>
            <Editor
              initialValue="본문을 적어주세요."
              previewStyle="vertical"
              height="600px"
              initialEditType="wysiwyg"
              useCommandShortcut={true}
              onFocus={check}
              ref={editorRef}
            />
            <BtnSection>
              <GoToList>목록으로</GoToList>
              <Right>
                <SetSecret>
                  <label>
                    <Text><span style={{ marginRight: 8 }}>비밀글 설정하기</span></Text>
                    <Checkbox
                      checked={checked.checked}
                      onChange={handleCheckboxChange}
                    />
                  </label>
                </SetSecret>
                <Write>작성</Write>
              </Right>
            </BtnSection>
        
            


          </Content>
        </Background>
      </div>
    );
  }
  export default Page;