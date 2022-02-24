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
    <PostInforBar key={i + 1}>
      {(isMember === true) ? // 멤버 권한이 있다면
        <>
          {data.secretFlag === true ? ( // 비밀글일때,
            <>
              {isAuthority === true || data.memberId === userReducer.id ? (
                <PostBarContent number={i + 1 + number} hasLink={true} link={`/${linkHeader}/${data.postId}`} data={data} title={"비밀글 " + data.title} writer={data.memberName} isBold={""} />
              )
                :
                (
                  <PostBarContent number={i + 1 + number} hasLink={false} link={`/${linkHeader}/${data.postId}`} data={data} title={"비밀글 입니다."} writer={"작성자"} isBold={""} />
                )}
            </>
          )
            :
            (
              <>
                {data.type === "NORMAL" ? ( // 공지글이 아닐때.
                  <PostBarContent number={i + 1 + number} hasLink={true} link={`/${linkHeader}/${data.postId}`} data={data} title={data.title} writer={data.memberName} isBold={""} />
                )
                  :
                  (
                    <PostBarContent number={"NOTICE"} hasLink={true} link={`/${linkHeader}/${data.postId}`} data={data} title={data.title} writer={data.memberName} isBold={"bold"} />
                  )}
              </>
            )}
        </>
        :
        <>
          {data.secretFlag === true ? ( // 비밀글일때,
            <>
              (
              <PostBarContent number={i + 1 + number} hasLink={false} link={`/`} data={data} title={"비밀글 입니다."} writer={"작성자"} isBold={""} />
              )
            </>
          )
            :
            (
              <>
                {data.type === "NORMAL" ? ( // 공지글이 아닐때.
                  <PostBarContent number={i + 1 + number} hasLink={true} link={`/`} data={data} title={data.title} writer={data.memberName} isBold={""} />
                )
                  :
                  (
                    <PostBarContent number={"NOTICE"} hasLink={true} link={`/`} data={data} title={data.title} writer={data.memberName} isBold={"bold"} />
                  )}
              </>
            )}
        </>
      }

    </PostInforBar>
  ));

  return <>{postdata}</>;
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PostBar));