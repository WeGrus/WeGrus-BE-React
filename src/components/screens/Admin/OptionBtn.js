import {OptionSection,OptionBtn,ClickSection,ClickBtn} from "./ButtonElement"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp  } from "@fortawesome/free-regular-svg-icons";
import {faThumbsUp as solidFaThumbsUp} from "@fortawesome/free-solid-svg-icons"

function OptionButton(){
    return (
        <>
                            <OptionSection>
                        <OptionBtn>ddd</OptionBtn>
                        <ClickSection>
                            <ClickBtn>1</ClickBtn>
                            <ClickBtn>2</ClickBtn>
                            <ClickBtn>3</ClickBtn>
                            <ClickBtn>4</ClickBtn>
                        </ClickSection>
                    </OptionSection>
        </>
    )
}
export default (OptionButton);