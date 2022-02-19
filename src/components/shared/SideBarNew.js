import { SideBox, SideContent, SideBoldContent } from "./SideBarElements";
import * as React from "react";

function SideBar(props) {
    const {posts = [], getFilter = () => {}, target} = props

  
    function handleOnClick(e) {
      getFilter(e.target.id);
    }
  
    const printData = posts.map((content) =>
        content.boardName.toString() === target ? (
            <SideBoldContent id={content.boardName} key={content.boardName} onClick={handleOnClick} data-index={posts.indexOf(content)}>
                {content.boardName}
            </SideBoldContent>
        ) : (
            <SideContent id={content.boardName} key={content.boardName} onClick={handleOnClick} data-index={posts.indexOf(content)}>
                {content.boardName}
            </SideContent>
        )
    );
  
    return (
      <>
        <SideBox>{printData}</SideBox>
      </>
    );
  }
  export default SideBar;