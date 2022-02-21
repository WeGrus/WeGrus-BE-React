import * as React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import NaviBar from "./navibar/NaviBar";

const Box = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 24px;
`;

function Layout(props) {
  const {load} = props
  return (
    <>
      <NaviBar />
      {load?
            <Box>
            <Outlet />
          </Box>
      :
      null
      }

    </>
  );
}

export default Layout;
