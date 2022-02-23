import * as React from "react";
import { Outlet, useLocation, useParams,useSearchParams,useNavigate } from "react-router-dom";
import { Content } from "../shared/Content";
import PageTitle from "../shared/PageTitle";
import ScreenTitle from "../shared/ScreenTitle";
import SideBar from "../shared/SideBarNew";
import { useForm } from "react-hook-form";
import Pagination from "../shared/PaginationNew";
import PostBar from "../shared/PostBarNew";
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
  ViewSearchBarSubmit
} from "./../shared/BoardElement";
import { actionCreators } from "../../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons"
const boardCategory = "소모임";

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


function Group(props) {
    const location = useLocation();
    const { pathname } = location
    const param = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    
    const [target, setTarget] = React.useState(null); // subCategory중 지금 선택한 부분.
    const [subCategory, setSubCategory] = React.useState(undefined);
    const [page, setPage] = React.useState(0);
    const [selected, setSelected] = React.useState(""); // 필터값
    const [load, setLoad] = React.useState(false); // load유무로 location의 값이 바뀐 뒤에 렌더
    const [posts, setPosts] = React.useState(null); // API로 받은 값
    const [totalPage, settotalPage] = React.useState(0); // 총 페이지.
    const [permissionCreateBtn,SetPermissionCreateBtn] = React.useState(false);

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    if(searchParams.get("isSearch") !== null){
        console.log(searchParams.get("isSearch"));
        console.log(searchParams.get("option"));
        console.log(searchParams.get("keyword"));
    }



    const createChecker = (boardTarget) => {
      props.userReducer.group.forEach(item => {
        if(item.name === boardTarget){
          return true;
        }
      })
      return false
    }

    const handleSearchFunction = (option,keyword,currentBoardType,page,currentType) => {
        // 검색일 경우 실행
        console.log(option);
        if (option === "제목+내용") {
          axios.get(`/search/all/${currentBoardType}?keyword=${keyword}&page=${page - 1}&pageSize=19&type=${currentType}`)
            .catch(function (error) {
              console.log(error.toJSON());
            })
            .then(function (res) {
              //console.log(res);
              settotalPage(res.data.data.posts.totalPages);
              setPosts(res.data.data.posts.content);
              console.log("제목+내용검색");
            });
        } 
        else if (option === "제목") {
            axios.get(`/search/title/${currentBoardType}?keyword=${keyword}&page=${page - 1}&pageSize=19&type=${currentType}`,
              {
              }
            )
            .catch(function (error) {
              console.log(error.toJSON());
            })
            .then(function (res) {
              //console.log(res);
              settotalPage(res.data.data.posts.totalPages);
              setPosts(res.data.data.posts.content);
              console.log("제목검색");
            });
        } 
        else {
          axios.get(`/search/writer/${currentBoardType}?keyword=${keyword}&page=${page - 1}&pageSize=19&type=${currentType}`,
              {
              }
            )
            .catch(function (error) {
              console.log(error.toJSON());
            })
            .then(function (res) {
              console.log(res);
              settotalPage(res.data.data.posts.totalPages);
              setPosts(res.data.data.posts.content);
              console.log("글쓴이검색");
            });
        }
      };
    
      const loadPageList = (boardId, page, type) => {
        axios.get(`/boards/${boardId}?page=${page - 1}&pageSize=19&type=${type}`, {
          })
          .catch(function (error) {
            console.log(error.toJSON());
          })
          .then(function (res) {
            console.log("loadPageList 동작!");
            settotalPage(res.data.data.posts.totalPages);
            setPosts(res.data.data.posts.content);
          });
      };

    React.useEffect(()=>{
        console.log("useEffect호출!");
        if(subCategory === undefined){
            axios.get(`/boards/categories`, {
            })
            .catch(function (error) {
              console.log(error.toJSON());
            })
            .then(function (res) {
                console.log(res);
              const category = [...res.data.data.boards.filter((element) => element.boardCategoryName === boardCategory)];
              const categoryTarget = category.find((item)=>item.boardId === parseInt(param.boardId)).boardName 
              console.log(category);
              setSubCategory((previous) => category);
              console.log(categoryTarget);
              setTarget((current) => categoryTarget);
              console.log("param.page "+parseInt(param.page));
              setPage(parseInt(param.page))
              console.log("param.sorted "+param.sorted);
              setSelected(param.sorted)
              const checkCreateBtn = createChecker(categoryTarget)
              SetPermissionCreateBtn(checkCreateBtn)
              setLoad(true)
            });

            if(param.isSearch === "false"){
                console.log("param.isSearch가 false");
                loadPageList(param.boardId,parseInt(param.page),param.sorted); // boardId,page,selected

            }
            else if(param.isSearch === "true"){
                console.log("param.isSearch가 true");
                const option = searchParams.get("option")
                const keyword = searchParams.get("keyword")
                handleSearchFunction(option,keyword,param.boardId,parseInt(param.page),param.sorted);
                // option, keyword, boardId, page, seleted
            }
        }
        else{
            console.log("subCategory가 undifined가 아님!!!");
            const categoryTarget = subCategory.find((item)=>item.boardId === parseInt(param.boardId)).boardName 
            setTarget((current) => categoryTarget);
            console.log( "page변경!!!");
            setPage((current) =>parseInt(param.page))
            const checkCreateBtn = createChecker(categoryTarget)
            SetPermissionCreateBtn(checkCreateBtn)


            if (param.isSearch === "false") {
                console.log("검색한 것 없음!");
                loadPageList(param.boardId,parseInt(param.page),param.sorted);
              } 
              else if(param.isSearch === "true") {
                console.log("검색한거 많음!");
                const option = searchParams.get("option")
                const keyword = searchParams.get("keyword")
                console.log(option);
                console.log(keyword);
                handleSearchFunction(option,keyword,param.boardId,parseInt(param.page),param.sorted);
              }
        }
    },[location])

    React.useEffect(()=>{
        if (subCategory !== undefined) {
            setSelected("최신순");
          }
    },[target])

    const handleSearching = (data, e) => {
        // 사용자가 검색을 했을때
        console.log(data);
        let url = `/group/${param.boardId}/1/LASTEST/true?option=${data.option}&keyword=${data.keyword}`
        url= url.replace(/\+/g,"%2B");
        console.log(url);
        navigate(url);
        setSelected("최신순");
    };

    const OnError = (error, e) => {
        console.log(error);
        console.log("error");
    };

    const handleSearchBarFilter = (e) => {
        //사용자가 검색바 필터를 바꾸었을 때.
        console.log(e.target.value);
        const type = e.target.value;
        setSelected(e.target.value);
        if(param.isSearch === "false"){
            navigate(`/group/${param.boardId}/${page}/${type}/false`);
        }
        else if(param.isSearch === "true"){
            let url = `/group/${param.boardId}/${page}/${type}/true?option=${searchParams.get("option")}&keyword=${searchParams.get("keyword")}`
            url= url.replace(/\+/g,"%2B");
            navigate(url);
        }
    };
    
  return (
    <>
      {(load) ?
        <>
          <PageTitle title="소모임" />
          <SideBar posts={subCategory} getFilter={setTarget} target={target} linkHeader={"group"} ></SideBar>
          <Content>
            <ScreenTitle>{`소모임 | ${target}`}</ScreenTitle>

            <SearchBarSection>
              <SearchBarForm onSubmit={handleSubmit(handleSearching, OnError)}>
                <SearchBarSelect {...register("option")}>
                  <option>제목+내용</option>
                  <option>제목</option>
                  <option>작성자</option>
                </SearchBarSelect>
                <SearchBar>
                  <SearchBarInput {...register("keyword", { required: true })} />
                  <SearchBarSubmit type="submit" value="" />
                  <ViewSearchBarSubmit><FontAwesomeIcon icon={faSearch} /></ViewSearchBarSubmit>
                </SearchBar>
              </SearchBarForm>

              <SearchBarFilter onChange={handleSearchBarFilter} value={selected}>
                {selectDate.map((value) => (
                  <option value={value.value} key={value.viewValue}>
                    {value.viewValue}
                  </option>
                ))}
              </SearchBarFilter>

              {(permissionCreateBtn) === true ?
                <CreateBtnLink
                  to={`/group/write/${props.userReducer.id}`}
                  state={{ category: "소모임", subCategory: target, boardId: param.boardId }}
                >
                  create
                </CreateBtnLink>
                :
                null
              }

            </SearchBarSection>

            <InforBar>
              <InforContents>
                <Number>번호</Number>
                <Title>제목</Title>
                <Writer>작성자</Writer>
                <Date>작성일자</Date>
                <Recommendation>추천</Recommendation>
                <Hits>조회</Hits>
              </InforContents>
            </InforBar>

            {posts !== null ? (
              <PostBar page={page} data={posts} userReducer={props.userReducer} linkHeader={"group"} category={"소모임"} />
            )
              :
              null
            }

            <Pagination
              total={totalPage}
              limit={19}
              page={page}
              setPage={setPage}
              linkHeader={"group"}
              param={param}
              searchParams={searchParams}
            />
          </Content>
        </>
        :
        null
      }

    </>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Group);
