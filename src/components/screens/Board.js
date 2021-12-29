import * as React from "react";
import { Outlet, Link } from "react-router-dom";
import SideBar from '../sidebar/SideBar';
import styles from "./Board.module.css";

function Board() {
  const arr = ["전체","정보 공유","프로젝트 모집","취미 톡방","질문/답변","자유게시판","건의사항"];
  return (
    <div className={styles.container}>
      <div className={styles.aside}>
        <SideBar arr={arr}/>
      </div>
      <div className={styles.content}>
        <h1>Board</h1>
        <h2>list</h2>
        <nav style={{ borderBottom: "solid 1px", paddingBottom: "1rem" }}>
          <Link to="1">page1</Link> | <Link to="2">page2</Link> |{" "}
          <Link to="3">page3</Link> |{" "}
        </nav>
        <Outlet />
        <Link to="write/1234">create</Link>
      </div>

      
      
      
      
    </div>
  );
}
export default Board;
