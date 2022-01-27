import * as React from 'react';
import { useLocation, Link } from 'react-router-dom'
import styled from "styled-components";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import Checkbox from './../shared/Checkbox'
import react from 'react';
import axios from "axios";
import { connect } from 'react-redux';

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
cursor: pointer;
`
const Right = styled.div`
float: right;
`
const SetOption = styled.label`
display: inline-flex;
flex-direction: row;
align-items: center;
width:134px;
height: 32px;
background-color: #6CD2D7;
border: none;
border-radius: 16px;
cursor: pointer;
margin-right: 8px;
`
const Text = styled.div`
display: inline-block;
height: 16px;
font-size: 14px;
line-height: 16px;
color: white;
padding-left:4px;
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
cursor: pointer;
`


function mapStateToProps(state) {
  return state;
}

function Page(props) {
  const filter = useLocation().state;
  const [checked,setState] = React.useState( false)
  const [notice, setNotice] = React.useState(false)
  const [title,setTitle] = React.useState("");
  const editorRef = React.createRef();

  const handleSecretOptionChange = event => {
    setState(!checked)
  }

  const handleNoticeOptionChange = event => {
    setNotice(!notice)
  }

  function printTextBody(){
    const deitorInstance = editorRef.current.getInstance();
    // const getContent_md = deitorInstance.getMarkdown();
    // console.log("마크다운");
    // console.log(getContent_md);
    const getContent_html = deitorInstance.getHTML();
    return getContent_html;
  }

  function submit(){
  //  const data = {
  //    title: title,
  //    text: printTextBody(),
  //    isSecret: checked,
  //    isNotice: notice,
  //    boardType:filter.category,
  //    subCategory:filter.subCategory
  //   }
    //console.log(data);

    axios.post(`/posts`,{
      "boardCategory": "BOARD",
      "boardType": "FREE",
      "content": printTextBody(),
      "secretFlag": checked,
      "title": title
    },{
      headers: {'Authorization': `Bearer ${props.tokenReducer}`}
    })
    .catch(function (error) {
      console.log(error.toJSON());
    })
    .then(function(res){
      console.log(res);
    });
    
  }

  function backToList(){

  }
  

  return (
    <div>
      <Background>
        <Content>
          <Category>{filter.category}|{filter.subCategory}</Category>
          <Header>
            <Title type="text" placeholder="제목" value={title} onChange={(e)=>setTitle(e.target.value)}></Title>
            <OtherDetail>{"이름 들어가야 함."}</OtherDetail>
          </Header>
          <Editor
            initialValue="본문을 적어주세요."
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            ref={editorRef}
          />
          <BtnSection>
            <Link to="/board"
                  state={
                    {category:filter.subCategory}
                  }
            ><GoToList >목록으로</GoToList></Link>
            <Right>
            <SetOption>
                <Text><span style={{ marginRight: 8 }}>공지글 설정하기</span></Text>
                <Checkbox
                  checked={notice}
                  onChange={handleNoticeOptionChange}
                />
              </SetOption>
              <SetOption>
                <Text><span style={{ marginRight: 8 }}>비밀글 설정하기</span></Text>
                <Checkbox
                  checked={checked}
                  onChange={handleSecretOptionChange}
                />
              </SetOption>
              <Write onClick={submit}>작성</Write>
            </Right>
          </BtnSection>
        </Content>
      </Background>
    </div>
  );
}
export default connect(mapStateToProps)(Page);