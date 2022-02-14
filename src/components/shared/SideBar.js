import { SideBox, SideContent, SideBoldContent } from "./SideBarElements";
import * as React from "react";

function SideBar({ posts = [], getFilter = () => {}, target }) {
  const boldEl = React.useRef(null);
  const [boldTarget, setBoldTarget] = React.useState(0);

  function handleOnClick(e) {
    getFilter(e.target.id);
  }

  // 기존의 content.filter 에서 boardName으로 바꾸었습니다. 혹시 버그가 생기신다면 한번 확인해주세요.
  const printData = posts.map((content) =>
    content.boardName.toString() === target ? (
      <SideBoldContent
        id={content.boardName}
        key={content.boardName}
        onClick={handleOnClick}
        data-index={posts.indexOf(content)}
      >
        {content.boardName}
      </SideBoldContent>
    ) : (
      <SideContent
        id={content.boardName}
        key={content.boardName}
        onClick={handleOnClick}
        data-index={posts.indexOf(content)}
      >
        {content.boardName}
      </SideContent>
    )
  );

  return (
    <>
      <SideBox ref={boldEl}>{printData}</SideBox>
    </>
  );
}
export default SideBar;
