import * as React from 'react';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import { useParams } from "react-router-dom";

function Page(props) {
    const t = useParams();
    const test = ` <p>본문을 적어주세요.fsdfdsfsdfdsf</p>
    <p>fdsfsfsdf</p><p>fwefwef</p><p>fsfsdfsdf</p><ul>
      <li class="task-list-item" data-task="true"><p>1초라도 안걸리면</p></li>
      <li class="task-list-item" data-task="true"><p>2렇게 초조한데</p></li>
      <li class="task-list-item" data-task="true"><p><br class="ProseMirror-trailingBreak"></p></li></ul> `;

    return (
      <div>
        <Viewer
          initialValue={test}
        />
      </div>
    );
  }
  export default Page;