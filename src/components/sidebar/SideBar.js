import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";
import React from "react";
import {SideBox,SideContent} from "./SideBarElements"

const SideBar = ({arr}) => {
  const printData =  arr.map((data) => (
    <SideContent onClick={handleOnClick} key={data.toString()}>{data}</SideContent>
  ));
  const [datas, setData] = React.useState(printData);

    function handleOnClick(e){
      for(let i=0; i<printData.length; i++){
        e.target.parentNode.childNodes[i].style.fontWeight="";
       }
      e.target.style.fontWeight = "bold";
  }
    

    return (
      <>
        <SideBox>
          {datas}
        </SideBox>
      </>
    );
  };
  
  export default SideBar;