import React from "react";
import styled from "styled-components";


const PaginationSection = styled.nav`
width:max-content;
margin: auto;
margin-top: 34px;
`
const Pagebtn = styled.button`
width: 20px;
border: none;
background-color: white;

&:hover{
  font-weight: 700;
  cursor: pointer;
  transform: translateY(-2px);
}

&[aria-current] {
  background: deeppink;
  font-weight: bold;
  cursor: revert;
  transform: revert;
}
`


function Pagination({ total, limit, page, setPage }) {
    const totalNumPages = Math.ceil(total / limit);
    const numPages = (totalNumPages>4)?5:totalNumPages
    const [current, setCurrent] = React.useState(page)

    return (
      <>
      {page<5?
              <PaginationSection>
              <Pagebtn onClick={()=>setPage(page-1)} disabled={page===1}> {"<"} </Pagebtn>
              {
              Array(numPages).fill().map((a,i) => 
              <Pagebtn key={i+1} onClick={()=>setPage(i+1)} aria-current={page === i+1 ? "page":null}>
                {i+1}
                </Pagebtn>
              )
              }
              <Pagebtn  onClick={()=>setPage(page+1)} disabled={page===totalNumPages}>{">"}</Pagebtn>
            </PaginationSection>
      :
          <PaginationSection>
            <Pagebtn onClick={() => setPage(page - 1)} disabled={page === 1}> {"<"} </Pagebtn>
            <Pagebtn onClick={() => setPage(page - 1)} disabled={page === 1}> {"..."} </Pagebtn>

            <Pagebtn onClick={() => setPage(page -2 )}>{page -2 }</Pagebtn>
            <Pagebtn onClick={() => setPage(page -1 )}>{page -1 }</Pagebtn>
            <Pagebtn onClick={() => setPage(page)} aria-current={page? "page" : null}>{page}</Pagebtn>
            {(page +1<= totalNumPages)?
            <Pagebtn onClick={() => setPage(page +1 )}>{page +1 }</Pagebtn>
            :
            null
            }
            {(page +2<= totalNumPages)?
            <Pagebtn onClick={() => setPage(page +2 )} aria-current={page === page -2  ? "page" : null}>{page +2}</Pagebtn>
            :
            null
            }
            <Pagebtn onClick={() => setPage(page + 1)} disabled={page === totalNumPages}>{"..."}</Pagebtn>
            <Pagebtn onClick={() => setPage(page + 1)} disabled={page === totalNumPages}>{">"}</Pagebtn>
          </PaginationSection>
      }

      </>
    );
  }

export default Pagination;