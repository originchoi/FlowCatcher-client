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
<br />

# 목차

- [🛠 기술 스택](#-기술-스택)
- [🙋🏻 프로젝트 소개](#-프로젝트-소개)
  - [FlowCatcher를 만들게 된 계기](#flowcatcher를-만들게-된-계기)
  - [주요 기능 설명](#주요-기능-설명)
- [💪🏻 기술적 경험](#-기술적-경험)
  - [1. 어떻게 웹사이트 방문자의 페이지 이동 흐름을 추적할 수 있을까](#1-어떻게-웹사이트-방문자의-페이지-이동-흐름을-추적할-수-있을까)
    - [1-1. History API를 활용한 페이지 이동 추적](#1-1-history-api를-활용한-페이지-이동-추적)
    - [1-2. 메서드 오버라이딩을 통한 추적코드 작성](#1-2-메서드-오버라이딩을-통한-추적코드-작성)
  - [2. 세션 종료를 어떻게 판단할 수 있을까](#2-세션-종료를-어떻게-판단할-수-있을까)
    - [2-1. Google Analytics 에서의 세션 종료 판단기준](#2-1-google-analytics-에서의-세션-종료-판단기준)
    - [2-2. AWS Lambda 의 EventBridge 를 이용한 세션 종료 판단](#2-2-aws-lambda의-eventbridge-를-이용한-세션-종료-판단)
  - [3. 데이터를 어떻게 시각화 할 것인가](#3-데이터를-어떻게-시각화-할-것인가)
    - [3-1. D3.js](#3-1-d3js)
    - [3-2. 그래프 구현 과정 및 코드 분석](#3-2-그래프-구현-과정-및-코드-분석)
- [📋 회고](#-회고)
  - [프로젝트를 마치며](#프로젝트를-마치며)
  - [개발 기록](#개발-기록)
- [🙇🏻‍♂️ 내 소개](#-내-소개)

<br />
<br />

# 🛠 기술 스택

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

# 🙋🏻 프로젝트 소개

## FlowCatcher를 만들게 된 계기

비즈니스 웹사이트 사용자들은 모두 제각기 다른 흐름으로 페이지를 탐색합니다.

그 흐름들을 눈으로 볼 수 있다면 얼마나 좋을까요?

기업과 개인 사업자 모두 자신의 서비스와 제품을 온라인으로 홍보하고 판매하는데 의존하고 있고

이러한 환경에서 웹사이트의 사용자 경험과 전환율은 비즈니스 성공의 핵심 요소가 되었습니다.

그러나 많은 비즈니스가 자신의 웹사이트를 통해 어떤 사용자 행동이 일어나고 있는지 파악하지 못하고 있습니다.

저는 **웹페이지 사용자의 페이지 이동 흐름을 시각화할 수 있는 서비스**를 만들고 싶었습니다.

그래서 **웹사이트 내 사용자 흐름을 시각화 해주는 서비스 FlowCatcher** 를 만들게 되었습니다.

<br />
<br />

## 주요 기능 설명

### [프로젝트 생성 및 추적 서비스 코드 발급 및 적용]

![servicecode_issued](https://github.com/originchoi/FlowCatcher-client/assets/116258834/e5f47d98-3842-464c-8786-5606cb3c4a7e)

- 본인의 웹사이트에 사용할 서비스 코드를 발급받기 위해 사용자는 프로젝트를 만들 수 있습니다.
- 프로젝트별로 서비스 코드를 발급 받을 수 있고, copy 버튼으로 복사할 수 있습니다.

<br />
<br />

![servicecode_apply](https://github.com/originchoi/FlowCatcher-client/assets/116258834/031924a5-8a35-47a7-b412-4c691a7965f5)

- 발급받은 서비스 코드(스크립트 코드)를 사용자의 비즈니스 웹사이트에 붙여넣기 하여 사용합니다.

<br />
<br />

### [웹사이트 사용자 행동 데이터를 기반으로 페이지 이동 흐름을 시각화 (행동 흐름 분석)]

![analytics_behavior](https://github.com/originchoi/FlowCatcher-client/assets/116258834/04a68277-2059-4002-9c68-cb64b8982db5)

- 행동 흐름 분석 탭에서 서비스 코드를 적용한 웹 사이트 내 방문자들의 페이지 이동 흐름을 볼 수 있습니다.
- 가장 많이 방문한 페이지 5개가 메인페이지 주소 이하 url로 나열되어 그래프와 함께 나타냅니다.
- 총 세션 수(방문자 수), 총 방문 횟수, 총 새로 고침 횟수, 총 이탈 횟수를 수치로 나타냅니다.
- 가장 하단에 방문자들의 페이지 흐름을 시각화 하여 나타냅니다.
  - 사용자는 각 url 별로 분류된 방문 페이지 노드를 드래그 할 수 있습니다.
  - 각 노드(방문 페이지)는 이탈 횟수와 방문 횟수 수치를 나타냅니다.
  - 이탈 횟수는 30분 이상 활동이 없는 방문자를 이탈로 간주하여, 마지막 방문페이지를 확인하여 나타냅니다.
  - 노드와 노드 사이 화살표로 링크로 페이지 간 이동 관계를 나타냅니다.
  - 화살표 링크에 호버 시, 어느 source(이동 전 페이지)에서 어느 target(이동 후 페이지)를 나타냅니다.
  - 새로고침의 경우 이동 전, 후 페이지가 같기 때문에 자기 자신에게 링크가 연결되어집니다. 마찬가지로 호버 시, source와 target을 볼 수 있습니다.

<br />
<br />

# **💪🏻 기술적 경험**

## 1. 어떻게 웹사이트 방문자의 페이지 이동 흐름을 추적할 수 있을까

유저의 페이지 이동 흐름을 추적하는 코드를 작성하기 위해 History API를 사용했습니다.

### 1-1. **History API**를 활용한 페이지 이동 추적

<p align="center">
  <img width="700" alt="HistoryAPI란" src="https://github.com/originchoi/FlowCatcher-client/assets/116258834/6940c2ba-f4c6-4ec8-8d56-f1675fd1689e">
</p>

History API는 history 글로벌 오브젝트를 이용하여 브라우저의 세션 히스토리에 대한 접근과 조작 기능을 제공해줍니다.

이 API는 브라우저의 세션 히스토리, 즉 사용자가 방문한 페이지의 기록을 스크립트를 통해 조작할 수 있게 해줍니다. 이를 통해 개발자는 브라우저의 뒤로 가기 및 앞으로 가기 버튼의 기능을 효과적으로 제어할 수 있으며, 페이지 리로드 없이 URL을 변경할 수 있습니다.

브라우저에서 페이지 로딩을 하면, 세션 히스토리를 갖으며, 브라우저는 이 히스토리를 stack으로 관리합니다.

세션 히스토리는 페이지를 이동할 때마다 쌓이며, 이를 통해 뒤로 가기 또는 앞으로 가기 같은 이동이 가능합니다.

즉, "어떤 페이지를 탐색했는지에 대해서 history를 쌓는 것" 이라고 생각하면 됩니다.

이 API를 활용해 개발자는 브라우저의 '뒤로 가기' 및 '앞으로 가기' 버튼 기능을 제어하고, 페이지 리로드 없이 URL을 변경할 수 있습니다.

#### 핵심 활용 메서드

1. `history.pushState()`: 새로운 상태를 히스토리 스택에 추가합니다. 이 메서드를 사용하면, 사용자가 뒤로 가기 버튼을 클릭했을 때 이전 상태로 돌아갈 수 있습니다.
2. `history.replaceState()`: 현재 상태를 새로운 상태로 대체합니다. 이 메서드는 페이지의 상태를 변경하고 싶지만, 그 변경이 히스토리 스택에 새로운 항목을 추가하지 않길 원할 때 유용합니다.

<br />
<br />

### 1-2. 메서드 오버라이딩을 통한 추적코드 작성

단순히 History API의 기본 메서드를 활용하는 것만으로는 웹 페이지 간의 이동 흐름을 충분히 파악하고 추적하는 것이 한계가 있었습니다.

이러한 제한을 극복하고, 웹 애플리케이션에서 발생하는 모든 URL 변경을 세밀하게 모니터링하기 위해, 저는 History API의 `pushState`와 `replaceState` 메서드를 창의적으로 활용했습니다.
</br>
</br>

#### 1. 메서드 오버라이딩

저의 접근 방식은 이 두 메서드를 오버라이딩하여, 원래의 기능을 유지하면서도 페이지의 URL이 변경될 때마다 이를 실시간으로 감지하고 기록하는 추가적인 기능을 부여하는 것이었습니다.

사용자의 페이지 이동 흐름을 추적하는 코드를 제공하기 위해 `history.pushState`와 `history.replaceState` 메서드를 오버라이딩하고, `popstate` 이벤트에 리스너를 추가하여, 페이지의 URL이 변경될 때마다 이를 감지하고 처리합니다.

<p align="center">
  <img width="500px" alt="메서드오버라이딩" src="https://github.com/originchoi/FlowCatcher-client/assets/116258834/4542f4d1-37dd-4119-a7b2-b43e29e0a679">
</p>

위의 이미지의 코드와 같은 방법을 통해, 사용자의 동적인 페이지 이동을 포함하여 모든 유형의 페이지 이동을 추적할 수 있었습니다.

`history.pushState`와 `history.replaceState` 메서드를 오버라이딩하는 주된 이유는, 이 메서드들이 호출될 때마다 사용자 정의 기능을 실행하여 페이지의 URL 변경을 추적할 수 있도록 하기 위함입니다.

이러한 오버라이딩을 통해 원래의 메서드 기능을 유지하면서도, 페이지 이동이 발생할 때마다 추가적인 페이지뷰 추적코드 작성을 할 수 있었습니다. 상세한 로직 설명은 바로 아래의 페이지뷰 추적코드 설명에서 다루겠습니다.

</br>

#### 2. 페이지뷰 추적코드

추적코드는 아래의 다이어그램과 같은 흐름으로 동작합니다.

<p align="center">
  <img width="700" alt="페이흐름추적도식" src="https://github.com/originchoi/FlowCatcher-client/assets/116258834/8b6522e3-b0fb-42ce-b603-54f78fb00ecc">
</p>

해당 다이어그램에 대한 코드와 설명은 아래와 같습니다.

</br>

- History API 메서드 오버라이딩

```javascript
const originalPushState = history.pushState;
const originalReplaceState = history.replaceState;

history.pushState = function () {
  originalPushState.apply(this, arguments);
  handleLocationChange();
};

history.replaceState = function () {
  originalReplaceState.apply(this, arguments);
  handleLocationChange();
};
```

이 코드는 브라우저의 History API에 있는 pushState와 replaceState 메서드를 오버라이드합니다. 원본 메서드를 호출한 후 handleLocationChange 함수를 실행하여 위치 변경을 처리합니다. 이를 통해 사용자가 페이지 내에서 URL을 변경할 때마다 해당 변경을 추적할 수 있습니다.

</br>

- Popstate 이벤트 리스너 추가

```javascript
window.addEventListener("popstate", handleLocationChange);
```

popstate 이벤트는 브라우저의 뒤로 가기나 앞으로 가기 버튼을 사용할 때 발생합니다. 이 이벤트 리스너를 추가함으로써, 사용자의 이러한 탐색을 감지하고 handleLocationChange 함수를 통해 처리합니다.

</br>

- 페이지 위치 변경 처리 및 페이지뷰 추적 로직

```javascript
function handleLocationChange() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(trackPageView, 10);
}

async function trackPageView() {
  // 데이터 수집 및 전송 로직...
}
```

handleLocationChange 함수는 페이지 위치 변경이 감지될 때마다 호출됩니다. 이 함수는 debounceTimer를 사용하여 고속으로 발생하는 URL 변경을 효과적으로 처리합니다. trackPageView 함수는 실제로 페이지뷰를 추적하고, 관련 데이터를 서버로 전송합니다.

<br />
<br />

## 2. 세션 종료를 어떻게 판단할 수 있을까

### 2-1. **Google Analytics** 에서의 세션 종료 판단기준

<p align="center">
  <img width="700" alt="image" src="https://github.com/originchoi/FlowCatcher-client/assets/116258834/3115d106-1390-4209-bb87-d273fdd46c5e">
</p>

세션 종료 판단에 대한 기준을 세워보았습니다.

데이터 준비 단계에서 구글 애널리틱스를 보면 여러 세션 판단기준 중 시간 기반 완료 조건을 참고하여 진행하였습니다.

사용자 한 명이 여러 세션을 시작할 수도 있고, 이러한 세션은 하루 동안 집중적으로 발생할 수도 있고, 며칠, 몇주 또는 몇 개월에 걸쳐 발생할 수도 있습니다.

세션이 종료되는 방식에는 시간 기반 완료가 있고, 이 중 방문자 활동이 30분 이상 없을 경우 세션을 종료판단 하고 있습니다. 이를 기준으로 삼았습니다.

따라서 마지막 페이지가 업데이트 된지 30분이 지난 세션은 활성이 안 되어있다고 판단하였습니다.

이에따라, **AWS Lamda의 Event-Bridge**를 통해 5분 간격으로 30분 이상 지난 세션을 판단해 주었습니다.

그리고 이렇게 종료가 되었다고 판단되면 이는 페이지 이탈로 간주하였습니다.

<br />
<br />

### 2-2. AWS Lambda의 EventBridge 를 이용한 세션 종료 판단

<p align="center">
  <img width="700" alt="image" src="https://github.com/originchoi/FlowCatcher-client/assets/116258834/a9b9e773-973c-49e3-aea2-1853208ef8d5">
</p>

</br>

#### 1. AWS EventBridge란?

AWS EventBridge는 서버리스 이벤트 버스 서비스로, 애플리케이션 간에 데이터를 쉽게 전달할 수 있도록 돕습니다. 이 서비스를 사용하여 시간 기반 규칙(예: 주기적인 트리거) 또는 시스템 상태 변경과 같은 다양한 이벤트에 대한 응답으로 AWS Lambda 함수와 같은 타겟을 실행할 수 있습니다.

이벤트 브릿지 생성은 아래와 같이 진행됩니다.

1. 이벤트 브릿지 생성: AWS Management Console에서 EventBridge를 열고 새로운 이벤트 브릿지를 생성합니다.
2. 규칙 설정: EventBridge 규칙을 설정하여 특정 시간 간격(예: 매 5분마다)으로 이벤트를 트리거합니다.
3. 타겟 지정: Lambda 함수를 이벤트의 타겟으로 지정하여 특정 조건이 만족될 때 함수가 실행되도록 합니다.

</br>

#### 2. 세션 종료 판단 로직

세션 종료 판단 로직은 아래의 다이어그램과 같은 흐름으로 동작합니다.

<p align="center">
  <img width="700" alt="image" src="https://github.com/originchoi/FlowCatcher-client/assets/116258834/e26698a8-d462-4889-8d02-3375f1814414">
</p>

해당 다이어그램에 대한 코드와 설명은 아래와 같습니다.

- AWS Lambda EventBridge에 작성한 코드

```javascript
const Session = require("../models/Session.js");

async function checkInactiveSessions() {
  // 30분을 밀리초로 환산
  const inactiveThreshold = 30 * 60 * 1000;
  // 현재 시간에서 30분 전의 시간을 계산
  const thresholdTime = new Date(new Date().getTime() - inactiveThreshold);

  // DB에서 조건에 맞는 세션을 찾아 상태를 업데이트
  await Session.updateMany(
    { lastUpdated: { $lt: thresholdTime }, isActive: true },
    { isActive: false },
  );
}

module.exports = { checkInactiveSessions };
```

이 함수는 마지막 활동 시간이 현재 시간에서 30분 이전인 모든 세션을 찾아서 해당 세션의 isActive 속성을 false로 설정합니다. 이는 데이터베이스의 세션 문서를 대량으로 업데이트하는 작업을 비동기적으로 처리합니다.

AWS Lambda EventBridge를 활용하여 5분마다 MongoDB 데이터베이스에 저장된 세션의 활동 상태를 확인합니다.

1. MongoDB 데이터베이스 조회: MongoDB는 'lastUpdated' 필드가 특정 시간(예: 현재 시간에서 30분 전) 이전인 세션을 조회합니다.
2. 비활성 세션 목록 반환: 조회된 비활성 세션의 목록을 AWS Lambda로 반환합니다.
3. 세션 상태 업데이트: 반환된 비활성 세션들의 'isActive' 필드를 'false'로 업데이트합니다.

</br>

- sessionSchema 예시

```javascript
const sessionSchema = new mongoose.Schema({
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  // 이하 생략..
});
```

위의 코드는 세션의 스키마 예시입니다. AWS Lambda의 Event-Bridge 에서 isActive, 즉 세션 활성화 여부를 확인해서 값을 바꿔주면, 해당 세션은 종료된 세션으로 간주하게 됩니다.

종료된 세션은 웹사이트의 사용자 행동 분석에 중요한 데이터로 활용됩니다. 이 데이터를 통해 사용자의 참여도와 사이트 내에서의 행동 패턴을 분석할 수 있으며, 이는 다음과 같은 방식으로 활용될 수 있습니다.

1. 사용자 경험 개선: 사용자가 사이트에서 많은 시간을 보내지 않고 이탈하는 페이지를 식별하여 해당 페이지의 콘텐츠나 디자인을 개선함으로써 사용자 경험을 향상시킬 수 있습니다.
2. 마케팅 전략 조정: 가장 많이 이탈하는 시점을 분석하여, 사용자가 관심을 잃기 전에 효과적인 마케팅 메시지나 프로모션을 제시할 수 있습니다.
3. 성능 모니터링: 세션 종료 데이터를 기반으로 웹사이트의 성능 문제를 감지하고, 사용자가 사이트를 떠나는 원인을 분석하여 개선할 수 있습니다.

결과적으로 AWS EventBridge와 Lambda를 사용하여 세션 관리 로직을 자동화함으로써, 애플리케이션의 성능과 확장성을 크게 향상시킬 수 있었습니다. 이 접근 방식은 서버리스 아키텍처를 활용하여 리소스 사용을 최적화하고, 관리 오버헤드를 줄이는 데 효과적입니다.

<br />
<br />

## 3. 데이터를 어떻게 시각화 할 것인가

### 3-1. **D3.js**

<p align="center">
  <img width="700" alt="image" src="https://github.com/originchoi/FlowCatcher-client/assets/116258834/8b3dba0f-da5c-4501-885d-8784ad9cfb80">
</p>

데이터 중심의 문서 (Data - Driven Documents)의 약자로 자바스크립트 기반의 라이브러리로,
사용자가 입력한 시각화 규칙을 바탕으로 데이터를 반영해 시각화 결과물을 생성해 줍니다.

복잡한 데이터 관계를 HTML5의 SVG를 활용하여 높은 해상도에서도 선명하게 표현할 수 있으며, 다양한 시각화 형식을 지원합니다.

어떠한 흐름으로 그래프를 구성해 볼지 고민해 봤고 그 결과는 **Force-Directed Graph** 였습니다.

Force-Directed Graph는 복잡한 네트워크 상의 관계를 시각적으로 표현하는 데 매우 유용합니다. 웹 사이트 내에서 사용자의 이동 경로를 나타내는 노드와 링크를 통해, 어떤 페이지가 다른 페이지로 이어지는지, 어떤 페이지가 사용자들 사이에서 중심적인 역할을 하는지 등을 한눈에 볼 수 있습니다.

그리고 아래의 특징과 장점을 활용해 보았습니다.

#### 특징과 장점

1. 실시간 데이터 반영 및 동적 상호작용: D3.js는 데이터가 변경될 때마다 그래프를 업데이트하고 사용자 인터랙션에 반응합니다. 사용자는 노드를 드래그하여 다른 위치에 배치할 수 있고, 노드와 링크에 대한 자세한 정보를 툴팁으로 볼 수 있습니다.
2. 세부 정보 시각화: 각 페이지 노드에 마우스를 호버링하면 해당 페이지의 방문 횟수와 이탈 횟수를 표시하는 툴팁이 제공됩니다.

</br>

### 3-2. **그래프 구현 과정 및 코드 분석**

#### 1. 세션 데이터 처리 및 그래프 데이터 준비

```jsx
function processPageViewData(sessions) {
  const nodes = [];
  const links = [];
  const linkCounts = {};
  const visitCounts = {};
  const exitCounts = {};

  sessions.forEach((session) => {
    session.pageViews.forEach((pageView, index) => {
      // 페이지 방문 수 계산
      if (!visitCounts[pageView.url]) {
        visitCounts[pageView.url] = 1;
      } else {
        visitCounts[pageView.url] += 1;
      }
      // 노드 생성 및 업데이트
      let node = nodes.find((n) => n.id === pageView.url);
      if (!node) {
        node = {
          id: pageView.url,
          pageTitle: pageView.pageTitle,
          referrer: pageView.referrer,
          timestamp: pageView.timestamp,
          visitCounts: visitCounts[pageView.url],
          exitCounts: 0,
        };
        nodes.push(node);
      }
      // 링크 생성 및 카운팅
      if (index < session.pageViews.length - 1) {
        const source = pageView.url;
        const target = session.pageViews[index + 1].url;
        const linkKey = `${source}-${target}`;
        if (!linkCounts[linkKey]) {
          linkCounts[linkKey] = 1;
          links.push({
            source,
            target,
            isSelfLoop: source === target,
            count: 1,
          });
        } else {
          linkCounts[linkKey] += 1;
          const linkIndex = links.findIndex(
            (link) => link.source === source && link.target === target,
          );
          links[linkIndex].count = linkCounts[linkKey];
        }
      }
    });
  });
  return { nodes, links };
}
```

이 코드는 사용자 세션 데이터를 분석하여 페이지 노드와 연결 링크를 생성합니다. 각 페이지 방문은 노드로 표현되며, 사용자의 페이지 이동 경로는 링크로 연결됩니다.

</br>

#### 2. **Force-Directed Graph** 시각화

```jsx
function drawForceGraph({ nodes, links }) {
  const svg = d3.select(svgRef.current);
  const width = +svg.attr("width");
  const height = +svg.attr("height");

  // SVG 초기화
  svg.selectAll("*").remove();

  // 줌 기능 설정
  const zoom = d3.zoom().on("zoom", (event) => {
    group.attr("transform", event.transform);
  });
  svg.call(zoom);

  // 링크와 노드의 시각화 설정
  const link = group
    .selectAll(".link")
    .data(links)
    .enter()
    .append("path")
    .style("stroke", (d) => (d.isSelfLoop ? "#0059ff" : "#aaa"))
    .attr("stroke-width", 4)
    .attr("fill", "none")
    .attr("marker-end", (d) =>
      d.isSelfLoop ? "url(#refresh-arrow)" : "url(#arrow)",
    );

  const node = group
    .selectAll(".node")
    .data(nodes)
    .enter()
    .append("rect")
    .attr("width", 300)
    .attr("height", 80)
    .attr("rx", 15)
    .attr("ry", 15)
    .style("fill", "#dddee1")
    .call(
      d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended),
    );
}
```

이 함수는 준비된 노드와 링크 데이터를 사용하여 실제 SVG 요소로 그래프를 시각화합니다. D3의 드래그 및 줌 기능을 활용하여 인터랙티브한 사용자 경험을 제공합니다.

</br>

#### 3. **Link와 Self-Loop** 시각화

이 프로젝트에서는 사용자의 웹 페이지 방문과 새로고침 활동을 시각화하기 위해 linkArc와 selfLoopArc 함수를 사용합니다. 이 두 함수는 SVG path 요소의 'd' 속성을 정의하여, 각각 일반 링크와 자기 참조 링크(새로고침)를 그래픽으로 표현합니다.

</br>

**linkArc 함수 구현**

```jsx
function linkArc(d) {
  const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
  return `M${d.source.x},${d.source.y}A${r},${r} 0 0,1 ${d.target.x},${d.target.y}`;
}
```

- 이 함수는 두 노드 사이의 링크를 곡선으로 표현합니다.
- Math.hypot() 함수는 두 점 사이의 직선 거리(유클리드 거리)를 계산하여, 이를 곡선의 반지름으로 사용합니다.
- SVG의 Path 요소를 사용하여 'M' (moveto) 명령으로 시작점에 커서를 위치시키고, 'A' (arc) 명령으로 곡선을 그립니다. 이 곡선은 시작점에서 종점까지 잇는 반원형 경로입니다.

</br>

**selfLoopArc 함수 구현**

```jsx
function selfLoopArc(d) {
  const { x, y } = d.source;
  const dx = 140;
  const dy = 140;

  return `M${x},${y}C${x + dx},${y - dy} ${x - dx},${y - dy} ${x},${y}`;
}
```

- selfLoopArc 함수는 페이지가 새로고침되었을 때 사용됩니다. 이 함수는 동일 노드에서 시작해 동일 노드로 돌아오는 루프(자기 참조)를 그립니다.
- 'M' 명령으로 시작 위치를 설정하고, 'C' (cubic Bezier curve) 명령을 사용하여 노드 자신을 향해 곡선을 그립니다. 여기서 dx와 dy는 곡선의 제어점 오프셋을 결정합니다.
- 이 구조는 사용자가 동일한 페이지를 새로고침하는 행동을 시각적으로 나타내며, 곡선의 제어점은 루프의 크기와 모양을 조절합니다.
- selfLoop 가 표현된 모습
<p>
  <img width="300" alt="threejs-structure" src="https://github.com/originchoi/FlowCatcher-client/assets/116258834/144400fc-3d02-4b10-8aa7-5e77c57cb9c4">
</p>

위의 사진과 같이 새로고침이 selfLoop로 표현됩니다.

</br>

**그래프 내 적용 사례**

```jsx
simulation.on("tick", () => {
  link.attr("d", function (d) {
    return d.isSelfLoop ? selfLoopArc(d) : linkArc(d);
  });
});
```

- simulation.on("tick", ...) 이벤트 핸들러 내에서 link 요소의 'd' 속성을 업데이트하여, 각 링크가 자기 참조인지에 따라 적절한 함수를 호출합니다.
- d.isSelfLoop 속성이 true일 경우 selfLoopArc 함수를 호출하고, 그렇지 않으면 linkArc 함수를 사용합니다. 이를 통해 사용자의 페이지 이동 및 새로고침 활동을 다른 스타일과 형태로 구분하여 표현합니다.

<br />
<br />

# 📋 회고

## 프로젝트를 마치며

이번 프로젝트는 제 개인적인 성장에 있어 매우 중요한 계기가 되었습니다. FlowCatcher 개발 과정에서 저는 사용자 행동 데이터를 시각화하는 기능의 구현에서 큰 도전을 맞이했습니다.

### 선택과 집중의 중요성

프로젝트 초기, 다양한 기능과 아이디어 사이에서 우선순위를 정하는 것이 어려웠습니다. 모든 기능을 완벽하게 구현하고자 하는 욕심이 결국 프로젝트 진행을 더디게 했습니다. 이러한 경험을 통해, 선택과 집중의 중요성을 깨닫고 핵심 기능에 집중하기로 결정했습니다. 이 결정은 프로젝트를 시간 안에 성공적으로 완료하는 데 결정적인 역할을 했습니다.

### 기술적 문제 해결

프로젝트 중 가장 도전적이었던 부분은 사용자의 페이지 이동 흐름을 실시간으로 추적하고 시각화하는 기능이었습니다. HISTORY API와 같은 브라우저의 내장 기능을 활용하여 이 문제를 해결했습니다. 이 과정에서 많은 기술적 장벽에 부딪혔으나, 문제 해결을 위해 지속적으로 학습하고 실험하는 자세가 큰 도움이 되었습니다.

### 개인적 느낀점

프로젝트를 통해 스스로에게 많은 질문을 던지며 고민했습니다. "이 기술이 정말 이 상황에 최적인가?", "사용자 경험을 더 향상시킬 수 있는 방법은 무엇인가?" 등의 질문을 통해 제한된 자원 내에서 최적의 결과를 도출하려 노력했습니다. 이러한 과정들이 저를 더 성숙한 개발자로 성장시키는 데 큰 역할을 했습니다.

<br />
<br />

## 개발 기록

자세한 개발 과정은 다음 링크에서 확인하실 수 있습니다:

- [노션 정리, 프로젝트 시작부터 마무리까지..](https://fanatical-medicine-ad9.notion.site/FlowCatcher-69b4ed4ef38f4bf59392b156d2d70980?pvs=74)

이 회고를 통해 프로젝트의 각 단계에서의 학습 사항과 성장 과정을 돌아보며, 앞으로의 개발 경력에 적용할 중요한 교훈을 얻을 수 있었습니다. 모든 경험은 저를 더 나은 개발자로 만드는 밑거름이 되었습니다.

<br />
<br />

# 🙇🏻‍♂ 내 소개

<div style="display:flex">
  <table>
    <tr height="50px">
      <td align="center" colspan="2">
        <a href="https://github.com/originchoi">🐣 최기원 (Origin Choi)</a>
      </td>
    </tr>
    <tr height="130px">
      <td align="center" width="130px">
        <a href="https://github.com/originchoi"><img src="https://avatars.githubusercontent.com/u/116258834?v=4" style="border-radius:50%"/></a>
      </td>
      <td align="left">
        - Github: https://github.com/originchoi
        <br />
        - Gmail: kyun4525@gmail.com
        <br />
        - Hi, I am trying to become a nice developer ☺️
      </td>
    </tr>
  </table>
</div>
