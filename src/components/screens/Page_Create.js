import * as React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";

function Page(props) {
    const t = useParams();
    console.log(t);
    return (
      <div>
        <h1>Create Page User id is {t.userid}</h1>
        <Link to="/">welcome</Link>
        <nav style={{ borderBottom: 'solid 1px', paddingBottom: '1rem' }}>
            <div style={{border: '1px solid black'}}>제목</div>
            <div style={{border: '1px solid black'}}>본문</div>
          </nav>
      </div>
    );
  }
  export default Page;