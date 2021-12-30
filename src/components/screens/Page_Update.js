import * as React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";

function Page(props) {
    const t = useParams();

    return (
      <div>
        <h1>Update Page {t.pagenum} and Id is {t.userid}</h1>

      </div>
    );
  }
  export default Page;