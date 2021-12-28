import * as React from "react";

import { Outlet, Link } from "react-router-dom";

function Board() {
  return (
    <div>
      <h1>Board</h1>
      <Link to="write/1234">create</Link>
      <h2>list</h2>
      <nav style={{ borderBottom: "solid 1px", paddingBottom: "1rem" }}>
        <Link to="1">page1</Link> | <Link to="2">page2</Link> |{" "}
        <Link to="3">page3</Link> |{" "}
      </nav>
      <Outlet />
    </div>
  );
}
export default Board;
