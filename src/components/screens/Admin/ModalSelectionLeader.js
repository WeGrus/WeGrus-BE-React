import {Background,ModalContainer,Title,Infor,InforTitle,Table,Index,Value,Select,BtnSection,BtnBox,Btn,ModalCotent,AlertBlock} from "./ModalElement"
import * as React from "react"
import { connect } from "react-redux";
import { actionCreators } from "../../../store";
import axios from "axios";

const printRole = (value) => {
    if(value.includes("ROLE_CLUB_PRESIDENT")){
        return "회장"
    }
    else if(value.includes("ROLE_GROUP_PRESIDENT")){
        return "소모임장"
    }
    else if(value.includes("ROLE_CLUB_EXECUTIVE")){
        return "동아리 운영진"
    }
    else if(value.includes("ROLE_GROUP_EXECUTIVE")){
        return "소모임 운영진"
    }
    else if(value.includes("ROLE_MEMBER")){
        return "일반"
    }
    else if(value.includes("ROLE_GUEST")){
        return "게스트"
    }
    else if(value.includes("ROLE_BAN")){
        return "밴"
    }
    else if(value.includes("ROLE_RESIGN")){
        return "사직"
    }
}

function mapDispatchToProps(dispatch){
    return{
      setAll: (boardId,page,isSearching,selected,boardCategoryName) => dispatch(actionCreators.setAll(boardId,page,isSearching,selected,boardCategoryName)),
    }
  }

  function mapStateToProps(state) {
    return state;
  }

function Modal(props){
    const {showModal, setShowModal,setShow, modalInfor, groupInfor} = props;

    console.log(props);
    console.log(modalInfor.roles);
    const [select,setSelect] = React.useState(groupInfor[0].id);
    const [confirm,setConfirm] = React.useState(false);
    const [text, setText] = React.useState("");

    const showText = ( name = "", select = "") => {
        const groupName = groupInfor.find((item) => Number(item.id) === Number(select)).name;
        console.log(groupName);
        const text = `정말 ${name}님에게 [${groupName}] 소모임장 권한을 부여하시겠습니까?`
        return text;
    }

    const closeModal = () => {
        setShowModal(false);
        setShow(-1);
    }

    const closeConfirm = () => {
        setConfirm(false)
    }

    const handleConfirm = () => {
        setConfirm(true);
        setText(showText(modalInfor.name,select));
    }

    const empowerGroupLeader = (memberId,groupId) => { // 소모임장 권한 부여
        axios.post(`/club/executives/groups?groupId=${groupId}&memberId=${memberId}`,{},{
        })
        .then(function(res){
            const PageReducer = props.PageReducer
            console.log(res);
            closeModal();
            props.setAll(PageReducer.boardId,PageReducer.page,PageReducer.isSearching,PageReducer.selected,!(PageReducer.boardCategoryName))
        })
    }

    const submit = () => {
        empowerGroupLeader(modalInfor.id, select)
    }

    const handleSelect = (e) => {
        console.log(e.target.value);
        setSelect(e.target.value)
    }

    return(
    <>
    {(showModal === true)?
        <Background>
        <ModalContainer>
        {(confirm === false)?
                    <ModalCotent>
                    <Title>소모임 회장 권한 부여</Title>
                    <Infor>
                    <InforTitle>회원 정보</InforTitle>
                    <Table>
                        <thead>
                            <tr>
                                <Index>이름</Index>
                                <Value>{modalInfor.name}</Value>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <Index>학번</Index>
                                <Value>{modalInfor.studentId}</Value>
                            </tr>
                            <tr>
                                <Index>학적</Index>
                                <Value>{modalInfor.academicStatus}</Value>
                            </tr>
                            <tr>
                                <Index>회원직책</Index>
                                <Value>{printRole(modalInfor.roles)}</Value>
                            </tr>
                        </tbody>
                    </Table>
                    </Infor>
                        <Select onChange={handleSelect} value={select}>
                                    {groupInfor.map((value) => (
                                        <option value={value.id} key={value.id}>
                                            {value.name}
                                        </option>
                                    ))}
                        </Select>
         
        
                    <BtnSection>
                        <BtnBox>
                            <Btn checked onClick={handleConfirm}>확인</Btn>
                            <Btn  onClick={closeModal}>취소</Btn>
                        </BtnBox>
                    </BtnSection>
                    </ModalCotent>
            :
            <ModalCotent>
                <AlertBlock>
                    <div>
                    {text}
                    </div>
                    
                </AlertBlock>
                <BtnSection>
                        <BtnBox>
                            <Btn checked onClick={submit}>확인</Btn>
                            <Btn  onClick={closeConfirm}>취소</Btn>
                        </BtnBox>
                </BtnSection>
            </ModalCotent>
            }

            
        </ModalContainer>
        </Background>
    :
    null
    }
    </>)
}

export default (connect(mapStateToProps,mapDispatchToProps)(Modal));