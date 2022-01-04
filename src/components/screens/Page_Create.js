import * as React from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/react-editor';

function Page(props) {
  const editorRef = React.createRef();

  function check(e){
    const deitorInstance = editorRef.current.getInstance();
    const getContent_md = deitorInstance.getMarkdown();
    console.log("마크다운");
    console.log(getContent_md);
    const getContent_html = deitorInstance.getHTML();
    console.log("html");
    console.log(getContent_html);
  }

{/* <p>본문을 적어주세요.fsdfdsfsdfdsf</p>
<p>fdsfsfsdf</p><p>fwefwef</p><p>fsfsdfsdf</p><ul>
  <li class="task-list-item" data-task="true"><p>1초라도 안걸리면</p></li>
  <li class="task-list-item" data-task="true"><p>2렇게 초조한데</p></li>
  <li class="task-list-item" data-task="true"><p><br class="ProseMirror-trailingBreak"></p></li></ul> */}

    return (
      <div>
        <Editor
          initialValue="본문을 적어주세요."
          previewStyle="vertical"
          height="600px"
          initialEditType="wysiwyg"
          useCommandShortcut={true}
          onFocus={check}
          ref={editorRef}
         
        />

        <div>

        </div>
      </div>

      
    );
  }
  export default Page;