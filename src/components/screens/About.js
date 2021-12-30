import * as React from "react";
import { Outlet, Link } from "react-router-dom";

import NaviBar from "../navibar/NaviBar";

function About() {
  return (
    <div>
      <NaviBar />
      {/* <h1>Bookkeeper</h1>
      <div style={{ borderBottom: "solid 1px", paddingBottom: "1rem" }}>
        <Link to="/login">login</Link> | <Link to="/signup">signup</Link>|{" "}
      </div>
      <nav style={{ borderBottom: "solid 1px", paddingBottom: "1rem" }}>
        <Link to="/">about</Link>| <Link to="/announce">announce</Link>|{" "}
        <Link to="/group">group</Link>| <Link to="/study">study</Link>|{" "}
        <Link to="/board">board</Link>
      </nav> */}
      <Outlet />
    </div>
  );
}
export default About;