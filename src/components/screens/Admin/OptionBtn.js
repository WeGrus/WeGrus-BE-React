import {OptionSection,OptionBtn,ClickSection,ClickBtn} from "./ButtonElement"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCog} from "@fortawesome/free-solid-svg-icons"
import * as React from "react"
import Modal from "./Modal.js";

function OptionButton(props){
    const {id, show, setShow} = props;
    
    const [showModal, setShowModal] = React.useState(false);

    const showSection = () => {
        if(id === show){
            setShow(-1);
        }
        else{
            setShow(id);
        }
       
    }

    const showSectionModal = () => {
        
    }

    return (
        <>
            <OptionSection>
                <OptionBtn onClick={showSection}><FontAwesomeIcon icon={faCog}/></OptionBtn>
                {(show === id) ?
                    <>
                        <ClickSection>
                            <ClickBtn onClick={() => {setShowModal(current => !current) }}>권한 부여</ClickBtn>
                            <ClickBtn>권한 해제</ClickBtn>
                            <ClickBtn>강제 탈퇴</ClickBtn>
                            <ClickBtn>회장 위임</ClickBtn>
                        </ClickSection>
                        {(showModal==true)?
                        <Modal showModal={showModal} setShowModal={setShowModal} setShow={setShow}/>
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