import * as React from 'react';
import { useLocation } from 'react-router-dom'
import { useParams } from "react-router-dom";

function Page(props) {
    const t = useParams();
    const data = useLocation().state;
    console.log(data);
    return (
      <div>
        <h1>Update Page {t.pagenum} and Id is {t.userid}</h1>

      </div>
    );
  }
  export default Page;