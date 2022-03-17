import axios from "axios";
import * as React from "react"
import {useLocation,useParams, useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import {
   InforBar,
    InforContents,
    Number,
    Title,
    Writer,
    Date,
    Hits,
    Recommendation,
    BoardName,
  } from "./../Profile/ProfilePostBarElements";
import ProfilePostBar from "./ProfilePostBar"

//<Route path="/profile/:category/:pagenum/:userid" element={<OtherProfile />} />

function UserPosts(){
    const location = useLocation();
    const navigate = useNavigate();
    const param = useParams();
    const userId = param.userid
    const page = param.pagenum
    //console.log(param);

    const [currentPage, setCurrentPage] = React.useState(0);
    const [posts, setPosts] = React.useState(null);
    const [totalPage, setTotalPage] = React.useState(0); // 총 페이지.
    const [load, setLoad] = React.useState(false)

    const loadPosts = (userId, page) => {
        axios
            .get(`/members/posts?memberId=${userId}&page=${page}&size=${10}`)
            .catch(function (error) {
                console.log(error.toJSON());
            })
            .then(function (res) {
                console.log("loadPageList 동작!");
                console.log(res);
                setPosts(res?.data?.data?.content)
                console.log(res?.data?.data?.content);
                setTotalPage(res?.data?.data?.totalPages)
                console.log(res?.data?.data?.totalPages);
                setCurrentPage(Number(page));
                console.log(page);
                setLoad(true)
            });
    }

    React.useEffect(()=>{
        console.log("location 동작!");
        loadPosts(userId,page)
    },[location])

    // React.useEffect(() => {
    //     console.log("페이지 변경!");
    //     navigate(`/profile/posts/${currentPage}/${userId}`)
    //   }, [currentPage]);

    return (
        <>
            <InforBar>
                <InforContents>
                    <BoardName>게시판</BoardName>
                    <Title>제목</Title>
                    <Writer>작성자</Writer>
                    <Date>작성일자</Date>
                    <Recommendation>추천</Recommendation>
                    <Hits>조회</Hits>
                </InforContents>
            </InforBar>
            {((load=== true)&&(posts!==null)) ?
             <ProfilePostBar data={posts}/>
            :
            null
            }
           

           <Pagination
              total={totalPage}
              limit={10}
              page={currentPage}
              setPage={setCurrentPage}
              linkHeader={"profile"}
              param={param}
              searchParams={""}
            />
        </>
    )
}

export default UserPosts;