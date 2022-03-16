import {OptionSection,OptionBtn,ClickSection,ClickBtn} from "./ButtonElement"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCog} from "@fortawesome/free-solid-svg-icons"
import * as React from "react"
import Modal from "./ModalSelectionLeader";
import axios from "axios";



function OptionButton(props){
    const {id, show, setShow, data} = props;
    
    const [showModal, setShowModal] = React.useState(false);
    const [modalOption, setModalOption] = React.useState(false); // option이 무엇인지
    const [modalInfor, setModalInfor] = React.useState(data); // 그룹 정보
    const [groupInfor, setGroupInfor] = React.useState(false); // 그룹 정보

    const showSection = () => {
        if(id === show){
            setShow(-1);
            showModal(false)
        }
        else{
            setShow(id);
            showModal(true)
        }
       
    }

    const getGroupList = () => {
        axios
        .get(`/members/groups`)
        .catch(function (error) {
            console.log(error);
        })
        .then(function (res) {
            console.log(res);
            setGroupInfor(res.data.data)
        });
    }

    React.useEffect(()=>{
        getGroupList();
    },[])


    return (
        <>
            <OptionSection>
                <OptionBtn onClick={showSection}><FontAwesomeIcon icon={faCog}/></OptionBtn>
                {((show === id) && (showModal==true))?
                <Modal showModal={showModal} setShowModal={setShowModal} setShow={setShow} modalOption={modalOption} modalInfor={modalInfor} groupInfor={groupInfor}/>
                :
                null}
            </OptionSection>
        </>
    )
}
export default OptionButton;