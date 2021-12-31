import React from "react";
import { SideBox, SideContent } from "./SideBarElements";
function SideBar({ arr }) {
  const printData = arr.map((data) => (
    <SideContent  key={data.content.toString()}>
      {data.content}
    </SideContent>
  ));

  const [datas, setData] = React.useState(0);

  function handleOnClick(e) {
    for (let i = 0; i < printData.length; i++) {
      e.target.parentNode.childNodes[i].style.fontWeight = "";
    }
    e.target.style.fontWeight = "bold";
  }

  return (
    <>
      <SideBox>{printData}</SideBox>
    </>
  );
}
export default SideBar;
