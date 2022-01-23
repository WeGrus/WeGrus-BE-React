import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return state;
};
const mapDispatchToProps = (dispatch) => {
  return dispatch;
};

function UserInfo(props) {
  console.log(props);

  return <div></div>;
}
export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
