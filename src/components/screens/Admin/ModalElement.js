import styled from "styled-components";

export const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.50);
    z-index: 1;
`;

export const ModalContainer = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-height: 500px;
    min-height: 400px;
    width: 80%;
    max-width: 800px;
    min-width: 600px;
    height: 80%;
    padding: 16px;
    background: #FFFFFF;
    border-radius: 10px;
    text-align: center;
`;

export const ModalCotent = styled.div`

`;

export const Title = styled.div`
width: 200px;
text-align: center;
margin: auto;
padding-top: 50px;
font-size: 30px;
font-weight: 700;
`

export const Infor = styled.div`
margin: auto;
margin-top: 30px;
width: 400px;
border: 1px solid black;
`

export const InforTitle = styled.div`
text-align: center;
font-weight: bold;
margin-top: 10px;
`

export const Table = styled.table`
margin: auto;
margin-top: 20px;
border: none;
font-weight: bold;
th{
    font-size:14px;
    font-weight:normal;
    overflow:hidden;
    padding:10px 5px;
    word-break:normal;
}
td{
    font-size:14px;
    overflow:hidden;
    padding:10px 5px;
    word-break:normal;
}
`
export const Index = styled.td`
text-align:center;
`
export const Value = styled.td`
text-align:left;
`

export const Select = styled.select`
display: block;
margin: auto;
margin-top: 20px;
width: 200px;
`

export const BtnSection = styled.div`
width: 300px;
margin: auto;
margin-top: 20px;
`

export const BtnBox = styled.div`
width: fit-content;
margin: auto;
`

export const Btn = styled.button`
width: 100px;
margin-left: ${(props) => (props.checked ? "0" : "10px")};
`