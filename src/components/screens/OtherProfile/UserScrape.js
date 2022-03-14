import axios from "axios";
import * as React from "react"
import {useLocation,useParams } from "react-router-dom";

function UserScrape(){
    const location = useLocation();
    const param = useParams();
    const userId = param.userid
    const page = param.pagenum

    const loadPosts = (userId, page) => {
        axios
            .get(`/members/bookmarks?memberId=${userId}&page=${page}&size=${19}`)
            .catch(function (error) {
                console.log(error.toJSON());
            })
            .then(function (res) {
                console.log("loadPageList 동작!");
                console.log(res);
            });
    }

    React.useEffect(()=>{
        loadPosts(userId,page)
    },[location])

    return (
        <>
        
        </>
    )
}

export default UserScrape;