import React, { useState } from "react";
import { SideBox, SideContent } from "./SideBarElements";

const bold = {
  fontweight:"bold"
}

function SideBar({ contents=[], getFilter=()=>{} }) {
  const[bold,setBold] = useState(0);
  function handleOnClick(e) {
    for (let i = 0; i < printData.length; i++) {
      e.target.parentNode.childNodes[i].style.fontWeight = "";
    }
    e.target.style.fontWeight = "bold";
    getFilter(e.target.id);
  }

  const printData = contents.map((content) => (
    <SideContent  id={content.filter.toString()} key={content.filter.toString()} onClick={handleOnClick}>
      {content.content}
    </SideContent>
  ));

  return (
    <>
      <SideBox>{printData}</SideBox>
    </>
  );
}
export default SideBar;
