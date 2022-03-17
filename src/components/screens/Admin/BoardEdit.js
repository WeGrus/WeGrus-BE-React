import { useForm } from "react-hook-form";
import * as React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { actionCreators } from "../../../store";
import styled from "styled-components";
import img from "./../../../images/Polygon.jpg";

const Btn = styled.button`
width: 200px;
background-color: ${(props) => (props.red ? "red" : "#6CD2D7")};
border: none;
border-radius: 20px;
height: 50px;
background-color: ${(props) => (props.red ? "red" : "#6CD2D7")};
margin-right: ${(props) => (props.red ? "0px" : "350px")};
font-size: 30px;
color: white;
cursor: pointer;
`
const BtnSection = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
`
export const Category = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #0b665c;
  margin-top: 38px;
  margin-bottom: 16px;
  margin-left: 15px;
  width: 910.07px;
`;
export const SearchBarSection = styled.div`
  width: 910.07px;
  margin: 0 auto;
  min-height: 64px;

  font-size: 14px;
  display: flex;
  flex-direction: row;
`;
export const SearchBarForm = styled.form`
  display: flex;
  flex-direction: row;
  margin: 0px auto;
  margin-top: 16px;
`;
export const SearchBarSelect = styled.select`
  width: 117px;
  height: 32px;
  padding-left: 8px;
  border-radius: 50px;
  line-height: 16.41px;
  border: 1px solid #c4c4c4;

  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background: url(${img});
  background-repeat: no-repeat;
  background-size: 17px 17px;
  background-position: bottom 8px right 11px;
`;
export const SearchBar = styled.div`
  margin-left: 9px;
  position: relative;
`;
export const SearchBarInput = styled.input`
  min-width: 331.48px;
  height: 31.59px;
  border: 1px solid #c4c4c4;
  border-radius: 50px;
  padding-left: 19.87px;
`;
export const SearchBarSubmit = styled.input`
  position: absolute;
  right: 3.71px;
  top: 4.25px;
  width: 28.9px;
  height: 25.27px;
  border: none;
  border-radius: 50px;
  border-color: #c4c4c4;
  background-color: #c4c4c4;
  cursor: pointer;
`;
export const SearchBarFilter = styled.select`
min-width:479.328px;
height: 31.59px;
border: 1px solid #c4c4c4;
border-radius: 50px;
padding-left: 19.87px;
`;



function mapStateToProps(state) {
    return state;
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      setAll: (boardId, page, isSearching, selected, boardCategoryName) =>
        dispatch(
          actionCreators.setAll(
            boardId,
            page,
            isSearching,
            selected,
            boardCategoryName
          )
        ),
    };
  }

function BoardEdit(props){
   // const [addBoard,setAddBoard] = React.useState(false);
   // const [delBoard,setDelBoard] = React.useState(false);
    const [category,setCategory] = React.useState(false);
    const [load,setLoad] = React.useState(false);
    const [trigger,setTrigger] = React.useState(false);
    const groupList = props.groupList
    console.log(groupList);
    console.log(category);
    const { register, handleSubmit } = useForm();
    const useForm2 = useForm();

    const addBoard = (boardCategoryId,boardName) => {
        axios.post(`/club/executives/boards`, {
            "boardCategoryId": boardCategoryId,
            "boardName": boardName
        }, {
            headers: { Authorization: `Bearer ${props.userReducer.token}` },
        })
            .catch(function (error) {
                console.log(error.toJSON());
            })
            .then(function (res) {
                console.log(res);
                setTrigger((current) => !current)
                setLoad(false)
            });
    }

    const delBoard = (boardId) => {
        axios.delete(`/club/executives/boards/${boardId}`,{
            headers: { Authorization: `Bearer ${props.userReducer.token}` },
        })
            .catch(function (error) {
                console.log(error.toJSON());
            })
            .then(function (res) {
                console.log(res);
                setTrigger((current) => !current)
                setLoad(false)
            });
    }


    const handleAddBoard = (data) => {
        console.log(data);
        let value = window.confirm(`${data.option}에 ${data.keyword}를 추가하시겠습니까?`)
        if(value){
            if(data.option === "공지사항"){
                addBoard(1,data.keyword)
            }
            else if(data.option === "소모임"){
                addBoard(2,data.keyword)
            }
            else if(data.option === "스터디"){
                addBoard(3,data.keyword)
            }
            else if(data.option === "커뮤니티"){
                addBoard(4,data.keyword)
            }
        }

    }
    const handleDelBoard = (data) => {
        console.log(data);
        let value = window.confirm(`정말 삭제하시겠습니까?`)
        if(value){
            delBoard(data.target)
        }
        
    }

    const OnError = (error, e) => {
        console.log(error);
        console.log("error");
      };


    React.useEffect(()=>{
        axios
        .get(`/boards/categories`, {
          headers: { Authorization: `Bearer ${props.userReducer.token}` },
        })
        .catch(function (error) {
          console.log(error.toJSON());
        })
        .then(function (res) {
          const category = [
            ...res.data.data.boards]; 
          setCategory((previous) => category);
          setLoad(true)
        });
    },[trigger])

    return (
        <>
        {load === true?
                <>
                <>
                <Category>게시판 추가</Category>
                <SearchBarSection>
                    <SearchBarForm onSubmit={useForm2.handleSubmit(handleAddBoard, OnError)}>
                        <SearchBarSelect {...useForm2.register("option")}>
                            <option>공지사항</option>
                            <option>소모임</option>
                            <option>스터디</option>
                            <option>커뮤니티</option>
                        </SearchBarSelect>
    
                        <SearchBar>
                            <SearchBarInput {...useForm2.register("keyword", { required: true })} />
                            <SearchBarSubmit type="submit" value="" />
                        </SearchBar>
                    </SearchBarForm>
                </SearchBarSection>
                </>

    
    
                <>
                <Category>게시판 삭제</Category>
                    <SearchBarSection>
                        <SearchBarForm onSubmit={handleSubmit(handleDelBoard, OnError)}>
                            <SearchBar>
                                <SearchBarFilter {...register("target") }>
                                    {category.map((value) => (
                                        <option value={value.boardId} key={value.boardId}>
                                            {value.boardName}
                                        </option>
                                    ))}
                                </SearchBarFilter>
                                <SearchBarSubmit type="submit" value="" />
                            </SearchBar>
                        </SearchBarForm>
                    </SearchBarSection>
                </>

                </>
        :
        null
        }


            



            

        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardEdit);