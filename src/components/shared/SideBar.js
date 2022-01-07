import { SideBox, SideContent } from "./SideBarElements";



function SideBar({ posts=[], getFilter=()=>{} }) {
  function handleOnClick(e) {
    for (let i = 0; i < printData.length; i++) {
      e.target.parentNode.childNodes[i].style.fontWeight = "";
    }
    e.target.style.fontWeight = "bold";
    getFilter(e.target.id);
  }

  const printData = posts.map((content) => (
    <SideContent  id={content.filter.toString()} key={content.filter.toString()} onClick={handleOnClick} data-index = {posts.indexOf(content)}>
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

