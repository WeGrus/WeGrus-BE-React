import axios from "axios";
import * as React from "react"
import {useLocation,useParams } from "react-router-dom";
import Pagination from "./Pagination";
import ProfilePostBar from "./ProfilePostBar";
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
  
function UserScrape(){
    const location = useLocation();
    const param = useParams();
    const userId = param.userid
    const page = param.pagenum

    const [currentPage, setCurrentPage] = React.useState(0);
    const [posts, setPosts] = React.useState(null);
    const [totalPage, setTotalPage] = React.useState(0); // 총 페이지.
    const [load, setLoad] = React.useState(false)

    const loadScrapeList = (userId, page) => {
        axios
          .get(`/members/bookmarks?memberId=${userId}&page=${page}&size=10`)
          .then(function (res) {
            console.log("loadCommentList 동작!");
            console.log(res);        
            console.log(res);
            const datas = res.data.data.content;
            const DATAS = datas.map((data) => data.post);
            setPosts(DATAS)
            console.log(res?.data?.data?.content);
            setTotalPage(res?.data?.data?.totalPages)
            console.log(res?.data?.data?.totalPages);
            setCurrentPage(parseInt(page));
            console.log(page);
            setLoad(true)
          })
          .catch(function (error) {
            console.log(error);
          });
      };

    React.useEffect(()=>{
      loadScrapeList(userId,page)
    },[location])


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


        {((load === true) && (posts !== null)) ?
          <ProfilePostBar data={posts} />
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

export default UserScrape;