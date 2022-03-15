import {Background,ModalContainer,Title,Infor,InforTitle,Table,Index,Value,Select,BtnSection,BtnBox,Btn,ModalCotent} from "./ModalElement"

function Modal(props){
    const {showModal, setShowModal,setShow} = props;
    console.log(props);

    const closeModal = () => {
        setShowModal(false);
        setShow(-1);
    }

    return(
    <>
    {(showModal === true)?
        <Background>
        <ModalContainer>
            <ModalCotent>
            <Title>메뉴</Title>
            <Infor>
            <InforTitle>회원 정보</InforTitle>
            <Table>
                <thead>
                    <tr>
                        <Index>이름</Index>
                        <Value>김승태</Value>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <Index>학번</Index>
                        <Value>12171595</Value>
                    </tr>
                    <tr>
                        <Index>학적</Index>
                        <Value>재학</Value>
                    </tr>
                    <tr>
                        <Index>회원직책</Index>
                        <Value>운영진</Value>
                    </tr>
                </tbody>
            </Table>
            </Infor>
            <Select>
                <option value="">--     --</option>
                <option>동아리 임원</option>
            </Select>
            <BtnSection>
                <BtnBox>
                    <Btn checked>확인</Btn>
                    <Btn  onClick={closeModal}>취소</Btn>
                </BtnBox>
            </BtnSection>
            </ModalCotent>
            
        </ModalContainer>
    </Background>
    :
    null
    }
    </>)
}

export default Modal;