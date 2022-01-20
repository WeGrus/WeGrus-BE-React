import axios from "axios";
import React, { useEffect, useState } from "react";

const UserInfo = async ({ ACCESS_TOKEN }) => {
  const [user_id, setUserId] = useState();
  const [userEmail, setUserEmail] = useState();
  const [profileImage, setProfileImage] = useState();
  useEffect(() => {
    axios
      .get("https://kapi.kakao.com/v2/user/me", {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          Authorization: ACCESS_TOKEN,
        },
      })
      .then((res) => console.log(res.data));
  }, []);

  return <div>hi</div>;
};
export default UserInfo;
