import styled from "styled-components";
import * as React from "react"
import axios from "axios";
import { connect } from "react-redux";
import { actionCreators } from "../../../store";

const ResetBtn = styled.button`
margin-top: 30px;
width: 800px;
height: 300px;
background-color:#AB2C49;
font-size: 100px;
color:white;
cursor: pointer;

&:hover{
    font-weight: 700
}
`

function mapDispatchToProps(dispatch){
    return{
      setAll: (boardId,page,isSearching,selected,boardCategoryName) => dispatch(actionCreators.setAll(boardId,page,isSearching,selected,boardCategoryName)),
    }
  }

function mapStateToProps(state) {
    return state;
  }

function ResetAllMember(props){

    const resetMember = () => {
        axios.patch(`/club/president/reset`,{
        })
        .catch(function (error) {
            console.log(error.toJSON());
          })
          .then(function (res) {
           console.log(res);
          });
    }

    const handleReset = () => {

        const check = window.confirm(`정말 모든 동아리원의 권한을 초기화하시겠습니까?`)
        if (check) {
            const lastcheck = window.confirm(`이제는 다시 되돌릴 수 없습니다. 정말 모든 동아리원의 권한을 초기화하시겠습니까?`)
            if(lastcheck){
                resetMember()
            }
        }
    }


    return (
        <>
           <ResetBtn onClick={handleReset}>초기화</ResetBtn>
        </>
    );
}

export default connect(mapStateToProps,mapDispatchToProps)(ResetAllMember);