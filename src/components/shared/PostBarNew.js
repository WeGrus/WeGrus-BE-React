import * as React from "react";
import {
  PostInforBar,
} from "./BoardElement";
import { actionCreators } from "../../store";
import { connect } from "react-redux";
import PostBarContent from "./PostBarContent";


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

function PostBar(props) {
  const { page, data, userReducer, linkHeader} = props
  const number = (page - 1) * 16;
  console.log("새로운 포스트바!");
  console.log(props);

  const isAuthority = userReducer?.roles?.some((i) =>
    [
      "ROLE_GROUP_EXECUTIVE",
      "ROLE_GROUP_PRESIDENT",
      "ROLE_CLUB_EXECUTIVE",
      "ROLE_CLUB_PRESIDENT",
    ].includes(i)
  );
  console.log("isAuthority"+isAuthority);
  const isMember = userReducer.roles.some((i) =>["ROLE_MEMBER"].includes(i));
  console.log("isMember"+isMember);
  const postdata = data?.map((data, i) => (
    <>
      {(isMember === true) ? // 멤버 권한이 있다면
        <>
          {data.secretFlag === true ? ( // 비밀글일때,
            <>
              {isAuthority === true || data.memberId === userReducer?.id ? (
                <PostInforBar key={i + 1}>
                  <PostBarContent number={i + 1 + number} hasLink={true} link={`/${linkHeader}/${data.postId}`} data={data} title={"비밀글 " + data.title} writer={data.memberName} isBold={""} id={data.memberId} />
                </PostInforBar>
                
              )
                :
                ( // 비밀글이고 권한이 없을 때.
                  <PostInforBar key={i + 1}>
                  <PostBarContent number={i + 1 + number} hasLink={false} link={`/${linkHeader}/${data.postId}`} data={data} title={"비밀글 입니다."} writer={"작성자"} isBold={""} id={0}/>
                  </PostInforBar>
                )}
            </>
          )
            :
            (
              <>
                {data.type === "NORMAL" ? ( // 일반 게시글일때
                  <PostInforBar key={i + 1}>
                  <PostBarContent number={i + 1 + number} hasLink={true} link={`/${linkHeader}/${data.postId}`} data={data} title={data.title} writer={data.memberName} isBold={""} id={data.memberId}/>
                  </PostInforBar>
                )
                  :
                  (
                    <PostInforBar key={i + 1} notice>
                    <PostBarContent number={"NOTICE"} hasLink={true} link={`/${linkHeader}/${data.postId}`} data={data} title={data.title} writer={data.memberName} isBold={"bold"} id={data.memberId}/>
                    </PostInforBar>
                  )}
              </>
            )}
        </>
        :
        <> 
          {data.secretFlag === true ? ( // 멤버 권한이 없고 비밀글일때,
            <>
              (
                <PostInforBar key={i + 1}>
              <PostBarContent number={i + 1 + number} hasLink={false} link={`/`} data={data} title={"비밀글 입니다."} writer={"작성자"} isBold={""} id={0}/>
              </PostInforBar>
              )
            </>
          )
            :
            (
              <>
                {data.type === "NORMAL" ? ( // 멤버 권한이 없고 일반 게시글일때.
                   <PostInforBar key={i + 1}>
                  <PostBarContent number={i + 1 + number} hasLink={true} link={`/`} data={data} title={data.title} writer={data.memberName} isBold={""} id={0}/>
                  </PostInforBar>
                )
                  :
                  (
                    <PostInforBar key={i + 1} notice>
                    <PostBarContent number={"NOTICE"} hasLink={true} link={`/`} data={data} title={data.title} writer={data.memberName} isBold={"bold"} id={0}/>
                    </PostInforBar>
                  )}
              </>
            )}
        </>
      }
    </>
  ));

  return <>{postdata}</>;
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PostBar));