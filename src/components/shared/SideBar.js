import { SideBox, SideContent,SideBoldContent } from "./SideBarElements";
import * as React from "react";


function SideBar({ posts=[], getFilter=()=>{}, target }) {
  const boldEl = React.useRef(null);
  const [boldTarget,setBoldTarget] = React.useState(0);

  function handleOnClick(e) {
    // setBoldTarget(e.target.dataset.index)
    // for (let i = 0; i < printData.length; i++) {
    //   e.target.parentNode.childNodes[i].style.fontWeight = "";
    // }
    getFilter(e.target.id);
  }

  // if(boldEl.current){
  //   boldEl.current.childNodes[boldTarget].style.fontWeight="bold";
  // }

  const printData = posts.map((content) => (
    (content.filter.toString() === target)?
    <SideBoldContent  id={content.filter.toString()} key={content.filter.toString()} onClick={handleOnClick} data-index = {posts.indexOf(content)}>
    {content.filter}
    </SideBoldContent>
    :
    <SideContent  id={content.filter.toString()} key={content.filter.toString()} onClick={handleOnClick} data-index = {posts.indexOf(content)}>
      {content.filter}
    </SideContent>
  ));

 




  return (
    <>
      <SideBox ref={boldEl}>{printData}</SideBox>
    </>
  );
}
export default SideBar;

