import * as React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom'
import styled from "styled-components";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import Checkbox from './../shared/Checkbox'
import react from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import {Background,Content,Category,Header,Title,OtherDetail,BtnSection,GoToList,Right,SetOption,Text,Write} from "./../shared/PageElements"


function mapStateToProps(state) {
  return state;
}

function Page(props) {
  const location = useLocation().state;
  const [secret,setSecret] = React.useState( false)
  const [notice, setNotice] = React.useState(false)
  const [title,setTitle] = React.useState("");
  const [test, setTest] = React.useState(false) // file이 올라오는 지 아닌지 확인
  const [url, setURL] = React.useState("") // download할 url link
  const editorRef = React.createRef();
  const downRef = React.createRef();
  const Navigate = useNavigate();
  let aBlob;

  const handleSecretOptionChange = event => {
    setSecret(!secret)
  }

  const isNotice = () => {
    if(notice === false){
      return "NORMAL"
    }
    else{
      return "NOTICE"
    }
  }

  const handleNoticeOptionChange = event => {
    setNotice(!notice)
  }

  function printTextBody(){
    const deitorInstance = editorRef.current.getInstance();

    console.log(deitorInstance);
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
    // console.log(data);
    // console.log(data.text);

    axios.post(`/posts`,{
      "boardName": location.subCategory,
      "content": printTextBody(),
      "secretFlag": secret,
      "title": title,
      "type": isNotice()
    },{
      headers: {'Authorization': `Bearer ${props.tokenReducer}`}
    })
    .catch(function (error) {
      console.log(error.toJSON());
    })
    .then(function(res){
      console.log(res);
      Navigate("/board", {state:{category:location.subCategory, page:1}});
    });
  
  }

  function backToList(){

  }

  const handleTest = (e) => {
    console.log(e.target.files[0]);
    //console.log(e.target.files);

    // const formData = new FormData();
    // formData.append('file',e.target.files[0]);

    aBlob = new Blob(e.target.files,{type : e.target.files[0].type})
    setURL(URL.createObjectURL(aBlob));
    console.log(url);
    setTest(true)
  }


  setTimeout(function() {
    URL.revokeObjectURL(url);
   }, 1000);

  const handleDownload = (e) => {
    setTimeout();
    console.log("지워짐!");
  }
  

  return (
    <div>
      <Background>
        <Content>
          <Category>{location.category}|{location.subCategory}</Category>
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
          <input type="file" id="docpicker" onChange={handleTest}></input>
          {(test)?
            <a href={url} download onClick={handleDownload} ref={downRef}>download</a>
          :null}
          <BtnSection>
            <Link to="/board"
                  state={
                    {category:location.subCategory}
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
                  checked={secret}
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