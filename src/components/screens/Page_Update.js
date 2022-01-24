import * as React from 'react';
import { useLocation, Link } from 'react-router-dom'
import { useParams } from "react-router-dom";
import {Background,Content,Category,Header,Title,OtherDetail,BtnSection,GoToList,Right,SetOption,Text,Write} from "./../shared/PageElements"
import { Editor } from '@toast-ui/react-editor';
import Checkbox from './../shared/Checkbox'

function Page(props) {
    const t = useParams();
    const data = useLocation().state;
    const editorRef = React.createRef();
    const [notice, setNotice] = React.useState(data.isSecret)
    const [checked,setState] = React.useState(false)
    const [title,setTitle] = React.useState(data.title);


    React.useEffect(()=>{
      const inputText = editorRef.current.getInstance();
      inputText.setHTML(data.text)
      console.log(data);
    },[])

    const handleNoticeOptionChange = event => {
      setNotice(!notice)
    }
    const handleSecretOptionChange = event => {
      setState(!checked)
    }


    function printTextBody(){
      const editorInstance = editorRef.current.getInstance();
      const getContent_html = editorInstance.getHTML();
      return getContent_html;
    }

    function submit(){
      const submitData = {
        title: title,
        text: printTextBody(),
        isSecret: checked,
        isNotice: notice,
        boardType:data.boardType,
        subCategory:data.subCategory
       }
   
       console.log(submitData);
     }



    return (
      <div>
      <Background>
        <Content>
          <Category>{data.boardType}|{data.subCategory}</Category>
          <Header>
          <Title type="text" placeholder="제목" value={title} onChange={(e)=>setTitle(e.target.value)}></Title>
            <OtherDetail>{"이름 들어가야 함."}</OtherDetail>
          </Header>
          <Editor
            initialValue={data.title}
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            ref={editorRef}
          />
          <BtnSection>
            <Link to="/board"
                  state={
                    {}
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
  export default Page;