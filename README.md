<div align="center">

<h1>FlowCatcher</h1>

<img width="400" src="https://github.com/originchoi/FlowCatcher-client/blob/main/public/assets/FlowCatcher_logo.png?raw=true" alt="FlowCatcher 로고">

<h3> "내 웹사이트 사용자들의 흐름을 살펴보세요" </h3>

웹사이트 사용자 행동 데이터를 기반으로 페이지 이동 흐름을 시각화 해주는 서비스

<br />

내 웹사이트를 통해 어떤 사용자 행동이 일어나고 있는지,

그리고 이러한 행동이 전환율에 어떤 영향을 미치는지

시각적으로 확인해보세요✨

</br>

[🔗 FlowCatcher 사용해보기](https://web.flow-catcher.com/)
<br/>
[Client Repository](https://github.com/originchoi/FlowCatcher-client)
<br/>
[Server Repository](https://github.com/originchoi/FlowCatcher-server)

</div>

<br />

# 목차

### [1. 🙋🏻 프로젝트 소개](#-프로젝트-소개)

- [FlowCatcher를 만들게 된 계기](#flowcatcher를-만들게-된-계기)
- [주요 기능 설명](#주요-기능-설명)

### [2. ⚒ 기술 스택](#-기술-스택)

### [3. 💪🏻 기술적 경험](#-기술적-경험)

- ## [FE](#FE)

### [4. 내 소개](#🏃‍♂️-내-소개)

- [최기원(Origin Choi)](<#🐣-최기원-(origin-choi)>)

### [5. 회고](#📋-회고)

<br />
<br />

# 🙋🏻 프로젝트 소개

## FlowCatcher를 만들게 된 계기

비즈니스 웹사이트 사용자들은 모두 제각기 다른 흐름으로 페이지를 탐색합니다.

그 흐름들을 눈으로 볼 수 있다면 얼마나 좋을까요?

기업과 개인 사업자 모두 자신의 서비스와 제품을 온라인으로 홍보하고 판매하는데 의존하고 있고

이러한 환경에서 웹사이트의 사용자 경험과 전환율은 비즈니스 성공의 핵심 요소가 되었습니다.

그러나 많은 비즈니스가 자신의 웹사이트를 통해 어떤 사용자 행동이 일어나고 있는지

파악하지 못하고 있습니다.

저는 **웹페이지 사용자의 페이지 이동 흐름을 시각화할 수 있는 서비스**를 만들고 싶었습니다.

그래서 **웹사이트 내 사용자 흐름을 시각화 해주는 서비스 FlowCatcher** 를 만들게 되었습니다.

<br />
<br />

## 주요 기능 설명
### [ 프로젝트 생성 및 추적 서비스 코드 발급 및 적용 ]
![servicecode_issued](https://github.com/originchoi/FlowCatcher-client/assets/116258834/e5f47d98-3842-464c-8786-5606cb3c4a7e)
- 본인의 웹사이트에 사용할 서비스 코드를 발급받기 위해 사용자는 프로젝트를 만들 수 있습니다.
- 프로젝트별로 서비스 코드를 발급 받을 수 있고, copy 버튼으로 복사할 수 있습니다.

![servicecode_apply](https://github.com/originchoi/FlowCatcher-client/assets/116258834/031924a5-8a35-47a7-b412-4c691a7965f5)
- 발급받은 서비스 코드(스크립트 코드)를 사용자의 비즈니스 웹사이트에 붙여넣기 하여 사용합니다.

<br />
<br />

### [ 웹사이트 사용자 행동 데이터를 기반으로 페이지 이동 흐름을 시각화 (행동 흐름 분석) ]
![analytics_behavior](https://github.com/originchoi/FlowCatcher-client/assets/116258834/04a68277-2059-4002-9c68-cb64b8982db5)
- 행동 흐름 분석 탭에서 서비스 코드를 적용한 웹 사이트 내 방문자들의 페이지 이동 흐름을 볼 수 있습니다.
- 가장 많이 방문한 페이지 5개가 메인페이지 주소 이하 url로 나열되어 그래프와 함께 나타냅니다.
- 총 세션 수(방문자 수), 총 방문 횟수, 총 새로 고침 횟수, 총 이탈 횟수를 수치로 나타냅니다.
- 가장 하단에 방문자들의 페이지 흐름을 시각화 하여 나타냅니다.
  -  사용자는 각 url 별로 분류된 방문 페이지 노드를 드래그 할 수 있습니다.
  -  각 노드(방문 페이지)는 이탈 횟수와 방문 횟수 수치를 나타냅니다.
  -  이탈 횟수는 30분 이상 활동이 없는 방문자를 이탈로 간주하여, 마지막 방문페이지를 확인하여 나타냅니다.
  -  노드와 노드 사이 화살표로 링크로 페이지 간 이동 관계를 나타냅니다.
  -  화살표 링크에 호버 시, 어느 source(이동 전 페이지)에서 어느 target(이동 후 페이지)를 나타냅니다.
  -  새로고침의 경우 이동 전, 후 페이지가 같기 때문에 자기 자신에게 링크가 연결되어집니다. 마찬가지로 호버 시, source와 target을 볼 수 있습니다.

<br />
<br />

# ⚒️ 기술 스택

### **FrontEnd**
<div style="display:flex;">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
  <img src="https://img.shields.io/badge/D3.js-F9A03C?style=for-the-badge&logo=D3.js&logoColor=white">
  <img src="https://img.shields.io/badge/tailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
  <img src="https://img.shields.io/badge/zustand-%2320232a.svg?style=for-the-badge&logo=react&logoColor=white">
  <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
</div>

### **BackEnd**
<div style="display:flex;">
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB">
  <img src="https://img.shields.io/badge/MongoDB%20&%20Mongoose-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white">
</div>

### **Deployment**
<div style="display:flex;">
  <img src="https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7">
  <img src="https://img.shields.io/badge/AWS%20Elastic%20Beanstalk-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white">
</div>

### **Test**
<div style="display:flex;">
  <img src="https://img.shields.io/badge/React%20Dom%20Testing-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB">
  <img src="https://img.shields.io/badge/Vitest-%2344A833.svg?style=for-the-badge&logoColor=white">
</div>

<br />
<br />

# 💪🏻 기술적 경험

## 어떻게 웹사이트 방문자의 페이지 이동 흐름을 추적할 수 있을까?
- **History API** 란?

<img width="773" alt="image" src="https://github.com/originchoi/FlowCatcher-client/assets/116258834/6940c2ba-f4c6-4ec8-8d56-f1675fd1689e">

<br />
<br />

- 메서드 오버라이딩
  
<img width="402" alt="image" src="https://github.com/originchoi/FlowCatcher-client/assets/116258834/4542f4d1-37dd-4119-a7b2-b43e29e0a679">
 
<br />
<br />

## 세션 종료를 어떻게 판단할 수 있을까?
- **Google Analytics** 에서의 세션 종료 판단기준
  
<img width="489" alt="image" src="https://github.com/originchoi/FlowCatcher-client/assets/116258834/3115d106-1390-4209-bb87-d273fdd46c5e">

<br />
<br />

- **AWS Lambda**
  
<img width="669" alt="image" src="https://github.com/originchoi/FlowCatcher-client/assets/116258834/a9b9e773-973c-49e3-aea2-1853208ef8d5">

<br />
<br />

## 데이터를 어떻게 시각화 할 것인가?
<img width="783" alt="image" src="https://github.com/originchoi/FlowCatcher-client/assets/116258834/8b3dba0f-da5c-4501-885d-8784ad9cfb80">

- **D3.js**
  

<br />

###

#### 개발 기록

- [노션 정리, 프로젝트 시작부터 마무리까지..](https://fanatical-medicine-ad9.notion.site/FlowCatcher-69b4ed4ef38f4bf59392b156d2d70980?pvs=74)

<br />

### 배포 및 자동화

-

<br />
<br />

# 🏃‍♂️ 내 소개
<div style="display:flex;">
  <table >
    <tr height="130px">
      <td align="center" width="130px">
        <a href="https://github.com/originchoi"><img src="https://avatars.githubusercontent.com/u/116258834?v=4" style="border-radius:50%"/></a>
      </td>
    </tr>
    <tr height="50px">
      <td align="center" width="130px">
        <a href="https://github.com/originchoi">최기원 (Origin Choi)</a>
      </td>
    </tr>
  </table>
</div>


<br />

## 🐣 최기원 (Origin Choi)

- 지메일: kyun4525@gmail.com
- 깃허브: https://github.com/originchoi
- Hi, I am trying to become a nice developer ☺️

<br />

# 📋 회고

-
