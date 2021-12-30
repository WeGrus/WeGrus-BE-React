import * as React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import NaviBar from "../navibar/NaviBar";

const Box = styled.div`
  width: 1240px;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function Layout() {
  return (
    <>
      <NaviBar />
      <Box>
        <Outlet />
      </Box>
    </>
  );
}

export default Layout;
