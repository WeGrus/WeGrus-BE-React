import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyles = createGlobalStyle`
${reset}
* {
    box-sizing: border-box;
    text-decoration: none;
}
input {
    all: unset;
}
body{
    background-color: #f5f5f5;
    font-size: 14px;
    font-family:'Open Sans', sans-serif;

}
`;
