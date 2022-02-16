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
import { current } from '@reduxjs/toolkit';


function mapStateToProps(state) {
  return state;
}

let aaaa;

function Page(props) {
  const location = useLocation().state;
  const [secret,setSecret] = React.useState( false)
  const [notice, setNotice] = React.useState(false)
  const [title,setTitle] = React.useState("");
  const [test, setTest] = React.useState(false) // file이 올라오는 지 아닌지 확인
  const [url, setURL] = React.useState("") // download할 url link
  const [postImageIds, setPostImageIds] = React.useState([]);
  

  const editorRef = React.useRef();
  const downRef = React.createRef();
  const Navigate = useNavigate(); 
  const isClubExecutives =   props.userReducer.roles.some(i => ["ROLE_CLUB_EXECUTIVE","ROLE_CLUB_PRESIDENT"].includes(i))
  const isGroupExecutives =   props.userReducer.roles.some(i => ["ROLE_GROUP_EXECUTIVE","ROLE_GROUP_PRESIDENT"].includes(i))
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

    //console.log(deitorInstance);
    // const getContent_md = deitorInstance.getMarkdown();
    // console.log("마크다운");
    // console.log(getContent_md);
    const getContent_html = deitorInstance.getHTML();
    return getContent_html;
  }

  function submit(){
    const data = {
      "boardId": props.PageReducer.boardId,
      "content": printTextBody(),
      "postImage":postImageIds,
      "secretFlag": secret,
      "title": title,
      "type": isNotice()
    }

    //console.log(aaaa);

     let postCreateRequest  = new FormData();
     postCreateRequest.append("postCreateRequest", new Blob([JSON.stringify(data)], {type : 'application/json'}))

     
    axios.post(`/posts`,postCreateRequest,{
      headers: {
        'Authorization': `Bearer ${props.userReducer.token}`,
        "content-type": "multipart/form-data"
      }
    })
      .catch(function (error) {
        console.log(error.toJSON());
      })
      .then(function (res) {
        console.log(res);
        //console.log(props.PageReducer.boardCategoryName);
        Navigate(props.PageReducer.boardCategoryName);
      });


  }

  React.useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().removeHook("addImageBlobHook");
      editorRef.current
        .getInstance()
        .addHook("addImageBlobHook", (blob, callback) => {
          (async () => {
            let formData = new FormData();
            formData.append("image", blob);
            let imageUrl;
            axios.post(`/posts/image`,formData,{
              headers:{
                'Authorization': `Bearer ${props.userReducer.token}`,
                "content-type": "multipart/form-data"
              }
            })
            .then(function (res) {
              console.log(res);
              imageUrl = res.data.data.imageUrl
              const postImageId = res.data.data.postImageId
              setPostImageIds((current) => [...current,postImageId])
              callback(imageUrl, "iamge");
            });
          })();
          return false;
        });
    }

    return () => {};
  }, [editorRef]);

  const handleTest = (e) => {
    console.log(e.target.files[0]);
    const formData = new FormData()
    formData.append('file',e.target.files[0])
    console.log(formData);
    aaaa = formData
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

  }
  console.log();
  

  return (
    <div>
      <Background>
        <Content>
          <Category>{location.category}|{location.subCategory}</Category>
          <Header>
            <Title type="text" placeholder="제목" value={title} onChange={(e)=>setTitle(e.target.value)}></Title>
            <OtherDetail>{props.userReducer.name}</OtherDetail>
          </Header>
          <Editor
            placeholder="본문을 적어주세요."
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            ref={editorRef}
          />
          <input type="file" id="docpicker" onChange={handleTest}></input>
          {(test)?
            <a href={url} download ref={downRef}>download</a>
          :null}
          <BtnSection>
            <Link to={`${props.PageReducer.boardCategoryName}`}><GoToList >목록으로</GoToList></Link>
            <Right>
              {(isClubExecutives === true && props.PageReducer.viewCategoryName !== "소모임")?
                          <SetOption>
                          <Text><span style={{ marginRight: 8 }}>공지글 설정하기</span></Text>
                          <Checkbox checked={notice} onChange={handleNoticeOptionChange}/>
                        </SetOption>
              :
              null}
              {(isGroupExecutives === true && props.PageReducer.viewCategoryName === "소모임") ?
                <SetOption>
                  <Text><span style={{ marginRight: 8 }}>공지글 설정하기</span></Text>
                  <Checkbox checked={notice} onChange={handleNoticeOptionChange} />
                </SetOption>
                :
                null}

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