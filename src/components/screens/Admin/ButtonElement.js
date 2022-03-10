import styled from "styled-components";

export const OptionSection = styled.div`
position: relative;
`

export const OptionBtn = styled.button`
margin-left: 30px;
width: 30px;
height: 16px;
background-color: #6CD2D7;
border: none;
border-radius: 15px;
cursor: pointer;
`

export const ClickSection = styled.ul`
position: absolute;      
top: -15px;
left: 66px;
width: 117px;

`

export const ClickBtn = styled.li`
cursor: pointer;
border: 1px solid black;
border-bottom: none;
list-style: none;
background-color: #FFFAFA;
font-weight: bold;
&:nth-child(4){
    border-bottom: 1px solid black;
}
`

