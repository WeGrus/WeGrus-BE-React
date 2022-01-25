<div align="center">
  <a href="https://github.com/WeGrus">
    <img src="https://user-images.githubusercontent.com/68049320/148059706-59c1967d-d035-49e1-9557-2149640a8d2a.png" alt="Logo" width="130" height="130">
  </a>
  <h3 align="center">WeGrus-FE-React</h3>

  <p align="center">
    인하대학교 SW 프로그래밍 동아리 <b>IGRUS</b> 웹사이트 제작 프로젝트
    <br />
    <a href="https://github.com/WeGrus"><strong>Explore the Organization</strong></a>
    <br /><br />
    <a href="https://github.com/WeGrus/WeGrus-FE-React/issues/new?assignees=imgzon3%2C+seonpilKim&labels=bug&template=bug_report.md&title=">Report Bug</a>
    ·
    <a href="https://github.com/WeGrus/WeGrus-FE-React/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=">Request Feature</a>
    <br /><br />
    <a href="https://www.facebook.com/IGRUS-445343065594761/">
      <img src="https://img.shields.io/badge/Facebook-1877F2?style=flat-square&logo=Facebook&logoColor=white"/>
    </a>
    <a href="https://www.instagram.com/igrus_inha/">
      <img src="https://img.shields.io/badge/Instagram-E4405F?style=flat-square&logo=Instagram&logoColor=white"/>
    </a>
    <a href="http://pf.kakao.com/_BfRNs/chat">
      <img src="https://img.shields.io/badge/KakaoTalk-FFCD00?style=flat-square&logo=KakaoTalk&logoColor=white"/>
    </a>
  </p>
</div>

# About

## Commit convention

```javascript
Type: Subject
ex) Feat: 회원가입 API 추가

Description

Footer
ex) Resolves: #1, #2
```

### Types

- Feat: 기능 추가, 삭제, 변경
- Fix: 버그 수정
- Refactor: 코드 리팩토링
- Style: 코드 형식, 정렬 등의 변경. 동작에 영향 x
- Test: 테스트 코드 추가, 삭제 변경
- Docs: 문서 추가 삭제 변경. 코드 수정 x
- Etc: 위에 해당하지 않는 모든 변경

## Authors

- [@biinggala](https://www.github.com/biinggala)
- [@dmdfpdi](https://www.github.com/dmdfpdi)

1. 처음에 유저가 카카오 로그인해서 얻은 코드를 가지고, [로그인 API] 호출 O
2. 로그인 실패 시, "kakao\_회원번호"를 응답 -> userId로 사용. 변수에 저장해두셨다가 [회원가입 API] 요청 시 전달해주셔야 합니다. O
3. 이메일 인증 페이지로 이동해서, 사용자가 학번 입력 O
4. unfocus, 버튼 등의 이벤트가 발생하면 [이메일 검증 API]호출 O
5. 검증(중복 체크, 정규식 검증)에 성공하면, 해당 이메일로 인증 메일 전송 O
6. 사용자가 새 브라우저로 메일에 들어가서 메일 인증 버튼 클릭 -> http://localhost:3000/login/email-auth?verificationKey={key} 으로 redirect O
7. 해당 페이지에서 [이메일 인증 API] 호출 -> 성공/실패에 따라 결과 페이지 응답. O
8. 메일 인증에 성공하면 해당 브라우저에 "진행하던 회원 가입 브라우저로 이동하여 다음 버튼을 눌러주세요" 메시지 출력(예시입니다)
9. 사용자는 새로 열었던 브라우저(메일 인증했던 브라우저)를 닫고, 기존의 회원가입을 진행하던 브라우저로 이동해서 "다음" 버튼 클릭 -> [이메일 인증 여부 확인 API] 호출
10. 이메일 인증 유효 시간은 30분으로, 30분이 지나면 다시 이메일 인증을 해야 합니다. -> 성공 시 email을 따로 변수에 저장하고, 회원 정보 입력 폼으로 전환
11. userId, email은 따로 입력x -> 나머지 정보를 입력받은 후, 변수에 저장해 두었던 userId, email과 함께 [회원 가입 API] 호출

- 이메일 입력 페이지, 회원 정보 입력 페이지에서 새로고침하면 다시 카카오 로그인 페이지로 이동 -> userId, email state가 사라지므로 처음부터 다시 진행 -> 인스타그램 회원가입 방식과 동일

- 이메일 인증 여부 확인 API를 추가한 이유는, 예를 들어 제 이메일을 인증한 이후 더 이상 회원가입을 진행하지 않고 다른 용무를 보던 중, 다른 유저가 제 이메일을 이용하여 회원가입을 진행하는 것을 방지하기 위함입니다.
