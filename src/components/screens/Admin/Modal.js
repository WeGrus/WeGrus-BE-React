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

const Empower = "권한 부여"
const Revoke = "권한 해제"
const Delegate = "회장 위임"
const Expulsion = "강제 탈퇴"

const ClubExecutive = "동아리 운영진"
const ClubMember = "동아리 회원"


function Modal(props){
    const {showModal, setShowModal,setShow,modalOption, modalInfor} = props;
    const id = modalInfor.id;
    console.log(props);

    const [select,setSelect] = React.useState(ClubMember);
    const [confirm,setConfirm] = React.useState(false);
    const [text, setText] = React.useState("");

    const showText = (option, name = "", select = "") => {
        let text = "";
    
        switch(option){
            case (Empower):{
                text = `정말 ${name}님에게 [${select}] 권한을 부여하시겠습니까?`
                break;
            }
            case Revoke:{
                text = `정말 ${name}님의 [${select}] 권한을 해제하시겠습니까?`
                break;
            }
            case Delegate:{
                text = `정말 ${name}님에게 회장 권한을 위임하시겠습니까?`
                break;
            }
            case Expulsion:{
                text = `정말 ${name}님을 강제로 탈퇴시키겠습니까?
                한번 탈퇴시키면 다시 회원 활동을 하지 못합니다.`
                break;
            }
        }

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
        setText(showText(modalOption,modalInfor.name,select));
    }

    const empowerClub = (memberId,type) => { // 회원 권한 부여
        axios.post(`/club/president/empower?memberId=${memberId}&type=${type}`,{},{
        })
        .then(function(res){
            const PageReducer = props.PageReducer
            console.log(res);
            closeModal();
            props.setAll(PageReducer.boardId,PageReducer.page,PageReducer.isSearching,PageReducer.selected,!(PageReducer.boardCategoryName))
        })
    }

    const revokePermissionClub = (memberId,type) => { //회원 권한 해제
        axios.delete(`/club/president/authority?memberId=${memberId}&type=${type}`,{},{
        })
        .then(function(res){
            const PageReducer = props.PageReducer
            console.log(res);
            closeModal();
            props.setAll(PageReducer.boardId,PageReducer.page,PageReducer.isSearching,PageReducer.selected,!(PageReducer.boardCategoryName))
        })
    }

    const delegateClub = (memberId) => { //회장 위임
        axios.patch(`/club/president/delegate?memberId=${memberId}`, {}, {
        })
            .catch(function (error) {
                console.log(error);
            })
            .then(function (res) {
                console.log(res);
                closeModal();
                const PageReducer = props.PageReducer
                props.setAll(PageReducer.boardId, PageReducer.page, PageReducer.isSearching, PageReducer.selected, !(PageReducer.boardCategoryName))
            });
    }

    const expulsionMember = (memberId) => {
        axios.patch(`/club/president/ban?memberId=${memberId}`,{},{
        })
        .catch(function (error) {
            console.log(error);
          })
        .then(function (res) {
            console.log(res);
            closeModal();
            const PageReducer = props.PageReducer
            props.setAll(PageReducer.boardId,PageReducer.page,PageReducer.isSearching,PageReducer.selected,!(PageReducer.boardCategoryName))
        });
    }

    const submit = () => {
        let type = "";
        switch(modalOption){
            case (Empower):{
                if(select === ClubExecutive){
                    type = "ROLE_CLUB_EXECUTIVE"
                }
                else{
                    type = "ROLE_MEMBER"
                }
                empowerClub(id, type)
                break;
            }
            case Revoke:{
                
                if(select === ClubExecutive){
                    type = "ROLE_CLUB_EXECUTIVE"
                }
                else{
                    type = "ROLE_MEMBER"
                }
                revokePermissionClub(id,type)
                break;
            }
            case Delegate:{
                delegateClub(id);
                break;
            }
            case Expulsion:{
                expulsionMember(id)
                break;
            }
        }
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
                    <Title>{modalOption}</Title>
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
                    {((modalOption === Empower)||(modalOption === Revoke))?
                        <Select onChange={handleSelect} value={select}>
                            <option>동아리 회원</option>
                            <option>동아리 운영진</option>
                        </Select>
                    :
                    null
                    }
        
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