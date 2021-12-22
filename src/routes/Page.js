import * as React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useParams } from "react-router-dom";

function Page(props) {
    const t = useParams();

    return (
      <div>
        <h1>Page{t.pagenum}</h1>
        <Link to="/">welcome</Link>
        <nav style={{ borderBottom: 'solid 1px', paddingBottom: '1rem' }}>
            <Link to={`/study/update/${t.pagenum}/1234`}>update</Link>
            
          </nav>
      </div>
    );
  }
  export default Page;