import * as React from "react";
import { Outlet, useLocation, useParams,useSearchParams,Link } from "react-router-dom";
import { Content } from "../shared/Content";
import PageTitle from "../shared/PageTitle";
import ScreenTitle from "../shared/ScreenTitle";
import SideBar from "../shared/SideBar";
import { useForm } from "react-hook-form";
import Pagination from "../shared/Pagination";
import PostBar from "../shared/PostBar";
import { connect } from "react-redux";
import axios from "axios";
import {
  SearchBarSection,
  SearchBarForm,
  SearchBarSelect,
  SearchBar,
  SearchBarInput,
  SearchBarSubmit,
  SearchBarFilter,
  CreateBtnLink,
  InforBar,
  InforContents,
  Number,
  Title,
  Writer,
  Date,
  Hits,
  Recommendation,
} from "./../shared/BoardElement";
import { actionCreators } from "../../store";

const boardCategory = "BOARD";

const selectDate = [
  // 게시물 나열할 때, 어떤 순으로 나열할지.
  { viewValue: "최신순", value: "LASTEST" },
  { viewValue: "추천순", value: "LIKEEST" },
  { viewValue: "댓글순", value: "REPLYEST" },
];


function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    setAll: (boardId, page, isSearching, selected, boardCategoryName) =>
      dispatch(
        actionCreators.setAll(
          boardId,
          page,
          isSearching,
          selected,
          boardCategoryName
        )
      ),
  };
}

const callSideBar = (token) => {
    axios.get(`/boards/categories`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch(function (error) {
      console.log(error.toJSON());
    })
    .then(function (res) {
        return res
    });
}

const testFunction = async (token) => {
    const res = await callSideBar(token)
    console.log(res);
    return res
}

function Board(props) {

    const { pathname } = useLocation();
    const param = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const [target, setTarget] = React.useState(null); // subCategory중 지금 선택한 부분.
    const [subCategory, setSubCategory] = React.useState(undefined);
    const [page, setPage] = React.useState(0);
    const [selected, setSelected] = React.useState(""); // 필터값
    const [load, setLoad] = React.useState(false); // load유무로 location의 값이 바뀐 뒤에 렌더
    const [posts, setPosts] = React.useState(null); // API로 받은 값
    const [totalPage, settotalPage] = React.useState(0); // 총 페이지.



    console.log(pathname);
    console.log(param);
    //console.log(location);
    //console.log(location.search);
    if(searchParams.get("isSearch") !== null){
        console.log(searchParams.get("isSearch"));
        console.log(searchParams.get("option"));
        console.log(searchParams.get("keyword"));
    }

    React.useEffect(()=>{
        console.log("useEffect호출!");
        let category
        const response = testFunction(props.userReducer.token)
        console.log("response");
        console.log(response);
        // axios.get(`/boards/categories`, {
        //   headers: { Authorization: `Bearer ${props.userReducer.token}` }, 
        // })
        // .catch(function (error) {
        //   console.log(error.toJSON());
        // })
        // .then(function (res) {
        //   category = [...res.data.data.boards.filter((element) => element.boardCategoryName === boardCategory),];
        //   const categoryTarget = category.find((element) => element.boardId === PageReducer.boardId)
        //   let boardTarget;
        //   if (categoryTarget === undefined) {
        //     boardTarget = category[0].boardName
        //   }
        //   else {
        //     boardTarget = categoryTarget.boardName;
        //   }

        //   console.log(res);
        //   setTarget((current) => boardTarget);
        //   setPage(PageReducer.page);
        //   setSubCategory((previous) => category);
        //   console.log(PageReducer.selected);
        //   setSelected(PageReducer.selected);
        //   setLoad(true)
        // });
    },[])

    //setSearchParams({isSearch:false,option:"제목"})
    return (
        <>
            {(load) ?
                <>
                    <Link to="/board/8/2/selected/false">
                        About
                    </Link>
                    <Link to="/board/8/1/selected/false">
                        About
                    </Link>
                    <Link to="/board/8/3/selected/false">
                        About
                    </Link>
                </>

                :
                null
            }

        </>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(Board);