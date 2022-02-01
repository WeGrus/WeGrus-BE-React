import axios from "axios";
import { connect } from "react-redux";
import { actionCreators } from "../../store";

function mapStateToProps(state) {
  console.log(state);
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    getUserInfo: (
      id,
      email,
      name,
      studentId,
      department,
      grade,
      phone,
      createdDate,
      introduce,
      imageUrl,
      academicStatus,
      roles
    ) =>
      actionCreators.getUserInfo(
        id,
        email,
        name,
        studentId,
        department,
        grade,
        phone,
        createdDate,
        introduce,
        imageUrl,
        academicStatus,
        roles
      ),
  };
}

function getUserInfoFn(USER_ID, ACCESS_TOKEN) {
  console.log("hi");
  axios
    .get(`/members/info/${USER_ID}`, {
      Headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    })
    .then((res) => {
      console.log(res);
    });
  return null;
}

export default connect(mapStateToProps, mapDispatchToProps)(getUserInfoFn);
