import * as React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import Checkbox from "./../shared/Checkbox";
import react from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  Background,
  Content,
  Category,
  Header,
  Title,
  OtherDetail,
  BtnSection,
  GoToList,
  Right,
  SetOption,
  Text,
  Write,
} from "./../shared/PageElements";
import { current } from "@reduxjs/toolkit";

function mapStateToProps(state) {
  return state;
}

let file;
let filecheck = false

function Page(props) {
  const location = useLocation().state;
  const [secret, setSecret] = React.useState(false);
  const [notice, setNotice] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [postImageIds, setPostImageIds] = React.useState([]);
  

  const editorRef = React.useRef();

  const Navigate = useNavigate(); 
  const isClubExecutives =   props.userReducer.roles.some(i => ["ROLE_CLUB_EXECUTIVE","ROLE_CLUB_PRESIDENT"].includes(i))
  const isGroupExecutives =   props.userReducer.roles.some(i => ["ROLE_GROUP_EXECUTIVE","ROLE_GROUP_PRESIDENT"].includes(i))


  const handleSecretOptionChange = (event) => {
    setSecret(!secret);
  };

  const isNotice = () => {
    if (notice === false) {
      return "NORMAL";
    } else {
      return "NOTICE";
    }
  };

  const handleNoticeOptionChange = (event) => {
    setNotice(!notice);
  };

  function printTextBody() {
    const deitorInstance = editorRef.current.getInstance();
    const getContent_html = deitorInstance.getHTML();
    return getContent_html;
  }


  function submit(){
    const data = {
      "boardId": location.boardId,
      "content": printTextBody(),
      "postImage":postImageIds,
      "secretFlag": secret,
      "title": title,
      "type": isNotice()
    }

     let postCreateRequest  = new FormData();
     postCreateRequest.append("postCreateRequest", new Blob([JSON.stringify(data)], {type : 'application/json'}))

     console.log("ddasdasdasadad");

     if(filecheck){
      postCreateRequest.append('file',file);
    }

    axios.post(`/posts`,postCreateRequest,{
      headers: {
        'Authorization': `Bearer ${props.userReducer.token}`,
        "content-type": "multipart/mixed"
        
      }
    })
    .catch(function (error) {
      console.log(error.toJSON());
      //console.log("코드가 반복인가? 2");
    })
    .then(function (res) {
      //"content-type": "multipart/form-data"
      console.log(res);
      console.log("깃허브도 새롭게 업데이트 되었다!1");
      Navigate(-1);
    })


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
            axios
              .post(`/posts/image`, formData, {
                headers: {
                  "content-type": "multipart/form-data",
                },
              })
              .then(function (res) {
                console.log(res);
                imageUrl = res.data.data.imageUrl;
                const postImageId = res.data.data.postImageId;
                setPostImageIds((current) => [...current, postImageId]);
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
    file = e.target.files[0]
    console.log(e.target.files);
    filecheck = true;
  };


  const handleDownload = (e) => {};
  console.log();

  window.addEventListener('beforeunload', (event) => {
    event.preventDefault();
  });

  return (
    <div>
      <Background>
        <Content>
          <Category>
            {location.category}|{location.subCategory}
          </Category>
          <Header>
            <Title
              type="text"
              placeholder="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Title>
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

          <BtnSection>

            <GoToList onClick={()=>{Navigate(-1);}}>목록으로</GoToList>
            <Right>
              {(isClubExecutives === true && location.category !== "소모임")?
                          <SetOption>
                          <Text><span style={{ marginRight: 8 }}>공지글 설정하기</span></Text>
                          <Checkbox checked={notice} onChange={handleNoticeOptionChange}/>
                        </SetOption>
              :
              null}
              {(isGroupExecutives === true && location.category === "소모임") ?
                <SetOption>
                  <Text><span style={{ marginRight: 8 }}>공지글 설정하기</span></Text>
                  <Checkbox checked={notice} onChange={handleNoticeOptionChange} />
                </SetOption>
                :
                null}


              <SetOption>
                <Text>
                  <span style={{ marginRight: 8 }}>비밀글 설정하기</span>
                </Text>
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
