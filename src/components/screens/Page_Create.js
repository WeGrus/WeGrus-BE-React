import * as React from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import styled from "styled-components";
import { Editor } from '@toast-ui/react-editor';
import { useLocation } from 'react-router-dom'

const Content = styled.div`
  width: 1240px;
  height: 877px;
  background-color: white;
`;

const DescriptionBox = styled.div`
  width: 924px;
  margin: auto
`;
const Category = styled.div`
  
  width: 924px;
  margin: auto

  
`;

function Page(props) {
  const editorRef = React.createRef();
  const state = useLocation().state;
  console.log(state.subCategory.target);

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
        <Content>
          <Category>
              {state.category}|{state.subCategory.target}
          </Category>

          <DescriptionBox>
            <Editor
              initialValue="본문을 적어주세요."
              previewStyle="vertical"
              height="600px"
              initialEditType="wysiwyg"
              useCommandShortcut={true}
              onFocus={check}
              ref={editorRef}
            />
          </DescriptionBox>
        </Content>
      </div>

      
    );
  }
  export default Page;