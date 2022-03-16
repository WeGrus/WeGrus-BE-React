import {OptionSection,OptionBtn,ClickSection,ClickBtn} from "./ButtonElement"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCog} from "@fortawesome/free-solid-svg-icons"
import * as React from "react"
import Modal from "./Modal.js";

const Empower = "권한 부여"
const Revoke = "권한 해제"
const Delegate = "회장 위임"
const Expulsion = "강제 탈퇴"

const test = {
    id: 1,
    name: "김승태",
    studentId: 12171595,
    role: "ROLE_CLUB_PRESIDENT",
    academicStatus: "재학"
}



function OptionButton(props){
    const {id, show, setShow, data} = props;
    
    const [showModal, setShowModal] = React.useState(false);
    const [modalOption, setModalOption] = React.useState(false); // option이 무엇인지
    const [modalInfor, setModalInfor] = React.useState(data); // 회원 정보

    const showSection = () => {
        if(id === show){
            setShow(-1);
        }
        else{
            setShow(id);
        }
       
    }

    const setModal = (option) => {
        console.log(option);

        switch(option){
            case Empower:{
                console.log(Empower);
                setModalOption(Empower)
                setShowModal(true)
                break;
            }
            case Revoke:{
                console.log(Revoke);
                setModalOption(Revoke)
                setShowModal(true)
                break;
            }
            case Delegate:{
                console.log(Delegate);
                setModalOption(Delegate)
                setShowModal(true)
                break;
            }
            case Expulsion:{
                console.log(Expulsion);
                setModalOption(Expulsion)
                setShowModal(true)
                break;
            }
        }
    }

    return (
        <>
            <OptionSection>
                <OptionBtn onClick={showSection}><FontAwesomeIcon icon={faCog}/></OptionBtn>
                {(show === id) ?
                    <>
                        <ClickSection>
                            <ClickBtn onClick={() => {setModal(Empower) }}>권한 부여</ClickBtn>
                            <ClickBtn onClick={() => {setModal(Revoke) }}>권한 해제</ClickBtn>
                            <ClickBtn onClick={() => {setModal(Expulsion) }}>강제 탈퇴</ClickBtn>
                            <ClickBtn onClick={() => {setModal(Delegate) }}>회장 위임</ClickBtn>
                        </ClickSection>
                        {(showModal==true)?
                        <Modal showModal={showModal} setShowModal={setShowModal} setShow={setShow} modalOption={modalOption} modalInfor={modalInfor}/>
                        :
                        null
                        }
                    </>
                    :
                    null
                }

            </OptionSection>
        </>
    )
}
export default OptionButton;