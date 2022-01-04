import * as React from 'react';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import { useParams } from "react-router-dom";

function Page(props) {
    const t = useParams();
    const test = `# markdown`;


    
    return (
      <div>
        <Viewer
          initialValue={test}
        />
      </div>
    );
  }
  export default Page;