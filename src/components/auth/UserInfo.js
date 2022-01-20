import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {};
const mapDispatchToProps = (dispatch) => {};

const UserInfo = async ({ ACCESS_TOKEN }) => {
  const [user_id, setUserId] = useState();
  const [userEmail, setUserEmail] = useState();
  const [profileImage, setProfileImage] = useState();

  axios
    .get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: ACCESS_TOKEN,
      },
    })
    .then((res) => console.log(res.data));
};
export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
