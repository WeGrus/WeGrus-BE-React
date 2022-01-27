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
const BtnSpan = styled.span`
  position:relative;
  
`

const BtnBox = styled.div`
position:absolute;
width: 120px;
height: 30px;
bottom: 17px;
left: 0px;
display: none;
font-size: 14px;
border: 1px solid;
border-color: #ccc #c6c6c6 #c3c3c3 #ccc;
border-radius: 10px
`

const MovePageInput = styled.input`
margin-top: 4px;
margin-left: 9px;
display: inline-block;
width: 40px;
border: 1px solid;
border-color: #ccc #c6c6c6 #c3c3c3 #ccc;
`
const MovePageSubmit = styled.button`
display: inline-block;
width: 44px;
padding: 0px;
margin-left: 8px;
border-radius: 3px;
font-size: 13px;
background: linear-gradient(to bottom,#fff 0,#f3f3f3 100%);
border-color: #ccc #c6c6c6 #c3c3c3 #ccc;
`




function Pagination({ total, limit, page, setPage }) {
    const totalNumPages = Math.ceil(total / limit);
    const numPages = (totalNumPages>4)?5:totalNumPages
    const [current, setCurrent] = React.useState(page)
    const displayRightEl = React.useRef(null)
    const displayLeftEl = React.useRef(null)

    const showBtnBox = (e) => {
      if(e.target.dataset.direction == "right"){
        if(displayRightEl.current.style.display ===  "block"){
          displayRightEl.current.style.display = "none"
        }
        else{
          displayRightEl.current.style.display = "block"
        }
      }
      else{
        if(displayLeftEl.current.style.display === "block"){
          displayLeftEl.current.style.display = "none"
        }
        else{
          displayLeftEl.current.style.display = "block"
        }
      }
      setCurrent(page)
      setCurrent(page)
    }

    const movePage = () => {
      if(current>0){ // 최대 페이지를 초과한다면?
        displayLeftEl.current.style.display = "none"
        displayRightEl.current.style.display = "none"
        setPage(current);
      }
      else{
        //경고를 넣을 것인지 추후에
      }
    }

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

            <BtnSpan>
            <Pagebtn onClick={showBtnBox} disabled={page === totalNumPages} data-direction={"left"}>{"..."}</Pagebtn>
            <BtnBox ref={displayLeftEl}>
              <MovePageInput type={"number"} value={current} onChange={(e)=>setCurrent(e.target.value)}></MovePageInput>
              <MovePageSubmit onClick={movePage}>페이지</MovePageSubmit>
            </BtnBox>
            </BtnSpan>

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
            <BtnSpan>
            <Pagebtn onClick={showBtnBox} disabled={page === totalNumPages} data-direction={"right"}>{"..."}</Pagebtn>
            <BtnBox ref={displayRightEl}>
              <MovePageInput type={"number"} value={current} onChange={(e)=>setCurrent(e.target.value)} ></MovePageInput>
              <MovePageSubmit onClick={movePage} >페이지</MovePageSubmit>
            </BtnBox>
            </BtnSpan>
            <Pagebtn onClick={() => setPage(page + 1)} disabled={page === totalNumPages}>{">"}</Pagebtn>
          </PaginationSection>
      }

      </>
    );
  }

export default Pagination;