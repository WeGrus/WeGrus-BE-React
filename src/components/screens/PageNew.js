import * as React from "react";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import { useLocation, Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { connect } from "react-redux";
import CommentSection from "./../shared/Comment";
import {
  Background,
  Content,
  Category,
  OtherDetail,
  Description,
  Recommand,
  GoToList,
  Correction,
  Delete,
  PostInfor,
  PostBtnSection,
  PostRecommand,
  PostScrape,
  HeaderContent,
  PageImage,
  DownloadBtn,
} from "./../shared/PageElements";
import { actionCreators } from "../../store";

const Title = styled.div`
  width: 924px;
  height: 21px;
  font-size: 18px;
  font-weight: 700;
  border: none;
  margin-bottom: 4px;
`;

const Right = styled.span`
  float: right;
`;

const BtnSection = styled.div`
  margin-top: 12.5px;
  padding-bottom: 12.5px;
`;

export const Header = styled.div`
  padding-bottom: 16px;
  border-bottom: 2px solid #0b665c;
  margin-bottom: 42px;
  width: 924px;
  padding-top: 16px;
  margin: auto;
  display: flex;
  flex-direction: row;
`;

const checkRecommend = (isRecommend) => {
  if (isRecommend) {
    return "추천취소";
  } else {
    return "추천";
  }
};

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    setAll: (boardId, page, isSearching, seleted) =>
      dispatch(actionCreators.setAll(boardId, page, isSearching, seleted)),
  };
}

const checkLinkHeader = (value) => {
  switch (value) {
    case "공지사항": {
      return "announce";
    }
    case "소모임": {
      return "group";
    }
    case "스터디": {
      return "study";
    }
    case "게시판": {
      return "board";
    }
  }
};
// 새로 고침시에도 데이터를 받은 뒤 수정을 할때의 경로를 얻기위해 만든 함수입니다.

function Page(props) {
  //const params = useParams();
  //const location = useLocation().state;
  const param = useParams();
  const postId = param?.pagenum;

  const [pageDate, setPageData] = React.useState(null);
  const [commentData, setCommentData] = React.useState(null);
  const [countOfRecommend, setCountOfRecommend] = React.useState(0); // 게시글 추천수
  const [countOfScrape, setCountOfScrape] = React.useState(0); // 게시글 스크랩수
  const [countOfComment, setCountOfComment] = React.useState(0); // 게시글 댓글수
  const [isRecommend, setIsRecommend] = React.useState(checkRecommend(false)); // 게시글 추천 유무 확인에 따라 값 변경.
  const [isScraped, setIsScraped] = React.useState(false);
  const [trigger, setTrigger] = React.useState(true);
  const [load, setLoad] = React.useState(false);
  const Navigate = useNavigate();
  const isAuthority = props.userReducer.roles.some((i) =>
    [
      "ROLE_GROUP_EXECUTIVE",
      "ROLE_GROUP_PRESIDENT",
      "ROLE_CLUB_EXECUTIVE",
      "ROLE_CLUB_PRESIDENT",
    ].includes(i)
  );

  const downRef = React.useRef();

  React.useEffect(() => {
    axios
      .get(`/posts/${postId}`)
      .catch(function (error) {
        console.log(error.toJSON());
        window.alert(
          "GUEST 권한입니다. 동아리 가입 및 승인 후 MEMBER 권한을 획득하면 열람 가능합니다."
        );
        Navigate("/");
      })
      .then(function (res) {
        setPageData(res?.data?.data?.board);
        setCommentData((current) => res?.data?.data?.replies);
        setCountOfRecommend(res?.data?.data?.board?.postLike);
        setCountOfScrape(res?.data?.data?.board?.postBookmarks); // 스크랩 이후 수정
        setCountOfComment(res?.data?.data?.board?.postReplies);
      });
  }, [param, trigger]);

  React.useEffect(() => {
    if (pageDate !== null) {
      setLoad(true);
      setIsScraped(pageDate.userPostBookmarked);
      setIsRecommend(pageDate.userPostLiked);
      console.log(pageDate);
      console.log(props);
      console.log();
    }
  }, [pageDate]);

  const postRecommand = () => {
    // 게시글 추천하는 함수
    if (isRecommend === true) {
      axios
        .delete(`/posts/like?postId=${pageDate.postId}`, {})
        .catch(function (error) {
          console.log(error.toJSON());
        })
        .then(function (res) {
          console.log(res);
        });
      setCountOfRecommend((count) => count - 1);
      setIsRecommend(false);
    } else {
      axios
        .post(`/posts/like?postId=${pageDate.postId}`, {}, {})
        .catch(function (error) {
          console.log(error.toJSON());
        })
        .then(function (res) {
          console.log(res);
        });
      setCountOfRecommend((count) => count + 1);
      setIsRecommend(true);
    }
  };

  const handlePostScrape = () => {
    if (isScraped === true) {
      // 이미 추가했다면 북마크 해제
      console.log("북마크 해제");

      axios
        .delete(`/members/bookmarks?postId=${pageDate.postId}`, {})
        .catch(function (error) {
          console.log(error.toJSON());
        })
        .then(function (res) {
          console.log(res);
        });
      setIsScraped(false);
      setCountOfScrape((count) => count - 1);
    } else {
      console.log("북마크 성공");
      setIsScraped(true);
      axios
        .post(`/members/bookmarks?postId=${pageDate.postId}`, {}, {})
        .catch(function (error) {
          console.log(error.toJSON());
        })
        .then(function (res) {
          console.log(res);
        });
      setCountOfScrape((count) => count + 1);
    }
  };

  const handleDeleteClick = () => {
    // 게시글 삭제하는 함수
    //axios로 delete하고 다시 보드 보여주기.
    let value = window.confirm("해당 게시물을 삭제하겠습니까?");
    if (value === true) {
      axios
        .delete(`/posts?postId=${pageDate.postId}`, {})
        .catch(function (error) {
          console.log(error.toJSON());
        })
        .then(function (res) {
          console.log(res);
          Navigate(-1);
        });
    }
  };

  const splitDate = (data) => {
    const date = data.split("|");
    const ymd = date[0];
    const time = date[1].substr(0, 5);
    // console.log(date);
    // console.log(ymd);
    // console.log(time);

    const result = `${ymd} | ${time}`;
    //console.log(result);
    //createTime()

    return result;
  };

  return (
    <div>
      {load !== false ? (
        <Background>
          <Content>
            <Category>
              {pageDate.boardCategory}|{pageDate.board}
            </Category>

            <Header>
              {(props.userReducer.id === pageDate.memberId)?
               <Link to={`/profile`}><PageImage src={`${pageDate.image.url}`}></PageImage></Link>
              :
              <Link to={`/profile/infor/0/${pageDate.memberId}`}><PageImage src={`${pageDate.image.url}`}></PageImage></Link>
              }
              <HeaderContent>
                <Title>{pageDate.title}</Title>
                <OtherDetail>
                  {(props.userReducer.id === pageDate.memberId) ?
                    <><Link to={`/profile`}>{pageDate.memberName}</Link> | {splitDate(pageDate.updatedDate)}</>
                    :
                    <><Link to={`/profile/infor/0/${pageDate.memberId}`}>{pageDate.memberName}</Link> | {splitDate(pageDate.updatedDate)}</>
                  }
                  <Right>
                    조회 {pageDate.postView} | 추천 {countOfRecommend} | 댓글{" "}
                    {countOfComment}
                  </Right>
                </OtherDetail>
              </HeaderContent>
            </Header>

            <Description>
              <Viewer initialValue={pageDate.content} />
              <PostInfor>
                <span>댓글 {countOfComment}</span> |{" "}
                <span>추천 {countOfRecommend}</span> |{" "}
                <span>스크랩 {countOfScrape}</span>
              </PostInfor>
              <PostBtnSection>
                {isRecommend === true ? (
                  <PostRecommand value="추천" onClick={postRecommand} checked>
                    {"추천"}
                  </PostRecommand>
                ) : (
                  <PostRecommand value="추천" onClick={postRecommand}>
                    {"추천"}
                  </PostRecommand>
                )}

                {isScraped === true ? (
                  <PostScrape onClick={handlePostScrape} checked>
                    스크랩
                  </PostScrape>
                ) : (
                  <PostScrape onClick={handlePostScrape}>스크랩</PostScrape>
                )}

                {pageDate.postFileUrls[0] !== undefined ? (
                  <DownloadBtn
                    ref={downRef}
                    href={pageDate.postFileUrls[0]}
                    download
                  >
                    첨부파일
                  </DownloadBtn>
                ) : null}
              </PostBtnSection>
            </Description>

            <CommentSection
              pageData={pageDate}
              commentData={commentData}
              trigger={setTrigger}
              test={trigger}
            />

            <BtnSection>
              <GoToList
                onClick={() => {
                  Navigate(-1);
                }}
              >
                목록으로
              </GoToList>
              {props.userReducer.id === pageDate.memberId ||
              isAuthority === true ? ( // user의 이름과 게시글 작성자가 같다면 보여주고 아니라면 편집기능 구현 x
                <div style={{ float: "right" }}>
                  <Link
                    to={`/${checkLinkHeader(pageDate.boardCategory)}/update/${
                      props.userReducer.id
                    }/${props.userReducer.name}`}
                    state={{
                      category: pageDate.boardCategory,
                      subCategory: pageDate.board,
                      postId: pageDate.postId,
                      pageData: pageDate,
                    }}
                  >
                    <Correction>수정</Correction>
                  </Link>
                  <Delete onClick={handleDeleteClick}>삭제</Delete>
                </div>
              ) : null}
            </BtnSection>
          </Content>
        </Background>
      ) : null}
    </div>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Page);
