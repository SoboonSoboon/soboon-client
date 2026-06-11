<div align="center">

  <p>지역 기반 공동구매 및 쉐어링 서비스
  <h1>함께 사서 알뜰하게 나누는 소비, 소분소분</h1>
</p>

</div>

## 🗂️ 목차

1. [**서비스 소개**](#1)
2. [**주요 기능**](#2)
3. [**기술 스택**](#3)
4. [**주요 기능 데모 영상**](#4)
5. [**프론트엔드팀 소개**](#5)
6. [**개발 기간**](#6)
7. [**Demo 환경 전환 내역**](#demo)

<br />

<div id="1"></div>

## 💁🏻 서비스 소개

함께 사서 나누는 소비 방식을 통해 개인의 비용 부담을 완화하고, 자원 낭비를 줄이는 효율적 소비를 할 수 있는 서비스를 제공한다.

🔗 [서비스 바로가기](https://soboon-client-seven.vercel.app)<br>
🎨 [Storybook 바로가기](https://698440ee98f72e58e3274401-eqgtshgquz.chromatic.com)<br>
📄 [최종 발표 자료 바로가기](https://www.canva.com/design/DAG3haIPqI8/9ahNJvvufzcwZtLiJcx--w/view?utm_content=DAG3haIPqI8&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h4f0cfd3e28)<br>
📼 [풀버전 시연 영상 바로가기](https://drive.google.com/file/d/10wD9fj59rG9utvhE2Yk2I08CSVpc0zJG/view?usp=sharing)

<br />

> 💡 **[프론트엔드 단독 데모 환경 안내]**
>
> 본 프로젝트는 백엔드 서버(AWS) 인프라 유지보수 기간이 종료되어,  
> 현재 실무 면접관님들의 원활한 리뷰를 위해 **프론트엔드 단독 환경(Mock Data)** 으로 전환하여 데모를 제공하고 있습니다.
>
> - 실제 API 연동 화면은 위 **풀버전 시연 영상**을 통해 확인하실 수 있습니다.
> - Mock 전환 구현 방식은 아래 [Demo 환경 전환 내역](#demo)을 참고해 주세요.

<br />

<div id="2"></div>

## 💡 주요 기능

- 소분/장보기 모임 생성: 함께 구매하고 나누는 모임 개설
- 댓글 소통: 주최자와 참여자 간의 대화 및 조율
- 모임 관리: 참여 신청, 확정, 거절, 강퇴 등 운영 기능 제공
- 모임 탐색: 카테고리, 지역, 키워드 기반 검색
- 마이페이지: 주최 및 참여 모임 조회와 리뷰 작성
- 간편 로그인: 카카오 계정 연동 로그인

<br />

<div id="3"></div>

## ⚙️ 기술 스택

- 코어: `TypeScript`, `Next.js`
- 스타일링: `Tailwind CSS`
- 상태 관리: `Zustand`
- 테스트: `Jest`
- 디자인 시스템: `Storybook`
- CI/CD: `GitHub Actions`

<br />

<div id="4"></div>

## 🎥 주요 기능 데모 영상

|                                         소분 모임 등록                                          |
| :---------------------------------------------------------------------------------------------: |
| <img src="./readme-assets/1-dividing-register.gif" style="width: 700px" alt="소분 모임 등록" /> |

|                          소분 모임 댓글 (대댓글, 비공개 댓글 작성 및 수정)                           |
| :--------------------------------------------------------------------------------------------------: |
| <img src="./readme-assets/2-dividing-comments.gif" style="width: 700px" alt="소분 모임 댓글 기능" /> |

|                               소분 모임 참여 확인 (확정, 거절, 강퇴, 마감)                               |
| :------------------------------------------------------------------------------------------------------: |
| <img src="./readme-assets/3-dividing-verification.gif" style="width: 700px" alt="소분 모임 참여 확인" /> |

|                                    리뷰 작성 및 조회                                     |
| :--------------------------------------------------------------------------------------: |
| <img src="./readme-assets/4-reviews.gif" style="width: 700px" alt="리뷰 작성 및 조회" /> |

<br />

<div id="5"></div>

## 🏄🏻‍♀️ 프론트엔드팀 소개

|                                  이름                                  |                                               프로필                                                | 개발 내용                                                                                                                                                                                                                                                                              |
| :--------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a href="https://github.com/keeprok" target="_blank">이영록 (팀장)</a> | <img src="https://avatars.githubusercontent.com/u/140785214?v=4" alt="이영록 프로필" width="80px"/> | 마이페이지 내 프로필 조회 및 수정 구현<br>리뷰 조회/작성 기능 구현<br>마이페이지 내 참여한/주최한/찜한 모임 조회<br>공용 컴포넌트 개발 + 스토리북 및 테스트 코드 작성<br>Husky를 통한 커밋 단계 코드 검사 자동화<br>검색 기능                                                          |
|   <a href="https://github.com/kdh990315" target="_blank">김동현</a>    | <img src="https://avatars.githubusercontent.com/u/104114383?v=4" alt="김동현 프로필" width="80px"/> | 소분/장보기 모임 목록/상세페이지 기능 구현<br>공용 컴포넌트 개발 + 스토리북 및 테스트 코드 작성<br>프로젝트 초기 환경 구성 및 App Router·Jest 테스트 환경 세팅<br>SEO 최적화<br>next의 미들웨어 기반 인증 라우팅 제어<br>next-bundle-analyzer를 활용한 번들 사이즈 분석 및 최적화      |
|   <a href="https://github.com/misung-dev" target="_blank">류미성</a>   | <img src="https://avatars.githubusercontent.com/u/128569095?v=4" alt="류미성 프로필" width="80px"/> | 소분/장보기 모임 수정 및 삭제 기능 구현<br>Storybook 환경 세팅 및 Chromatic 자동 배포 설정 <br>공용 컴포넌트 개발 + 스토리북 및 테스트 코드 작성<br>Jest를 활용한 컴포넌트 테스트 코드 작성<br>next-bundle-analyzer를 활용한 번들 사이즈 분석 및 최적화<br>Vercel을 이용한 서비스 배포 |
|  <a href="https://github.com/jihee1103" target="_blank"> 최지희 </a>   | <img src="https://avatars.githubusercontent.com/u/73398624?v=4" alt="최지희 프로필" width="80px"/>  | 소셜 로그인 (카카오톡) 기능 구현<br>프로필 생성 페이지 구현<br>공용 컴포넌트 개발 + 스토리북 및 테스트 코드 작성                                                                                                                                                                       |

<br />

<div id="6"></div>

## 📅 개발 기간

2025.09 ~ 2025.11 (2개월)

<br />

<div id="demo"></div>

## 🛠️ Demo 환경 전환 내역

### 배경

백엔드 서버(AWS)의 인프라 유지보수 기간이 종료되어 실 API 호출이 불가능한 상태입니다.  
포트폴리오 리뷰어가 실제 화면 흐름을 직접 확인할 수 있도록, **API 의존성을 프론트엔드 레이어에서 분리**하고 Mock 데이터 기반의 데모 환경으로 전환하였습니다.

> 실제 API 연동 영상: [풀버전 시연 영상 바로가기](https://drive.google.com/file/d/10wD9fj59rG9utvhE2Yk2I08CSVpc0zJG/view?usp=sharing)

---

### 변경 파일 및 처리 방식

#### 1. `src/middleware.ts` — 인증 라우트 가드 우회

```ts
// Before
const protectedRoutes = ['/mypage', '/shopping/register', '/dividing/register'];

// After (DEMO)
const protectedRoutes = ['/mypage', '/shopping/register' /* '/dividing/register' */];
```

`/dividing/register` 경로를 인증 보호 목록에서 임시 제외하여,  
로그인 없이도 모임 등록 화면을 시연할 수 있도록 처리했습니다.

---

#### 2. `src/apis/meetings/getDividingListApi.ts` — 목록 API early-return

```ts
const MOCK_EMPTY_RESPONSE = {
  data: { content: [], sliceInfo: { currentPage: 0, size: 10, hasNext: false } },
};

export const getDividingListApi = async (query: URLSearchParams) => {
  // [DEMO] 백엔드 없이 시연 가능하도록 API 호출 차단
  return MOCK_EMPTY_RESPONSE;
  // ...기존 axiosInstance 호출 코드
};
```

실제 API 호출 전에 early-return으로 Mock 응답을 반환합니다.  
기존 코드 로직은 그대로 유지하여 API 재연동 시 주석 한 줄만 제거하면 복구됩니다.

---

#### 3. `src/apis/comment/getComment.ts` · `getCommentCount.ts` — 댓글 API 분기 처리

```ts
export const getCommentApi = async (meetingId: string, query: URLSearchParams) => {
  // [DEMO] 시연용 demo 페이지에서 API 호출 차단
  if (meetingId === 'demo') {
    return { data: { content: [], sliceInfo: { ... }, totalElements: 0 } };
  }
  // ...기존 axiosInstance 호출 코드
};

export const getCommentCountApi = async (meetingId: string) => {
  if (meetingId === 'demo') return 0;
  // ...기존 axiosInstance 호출 코드
};
```

`meetingId === 'demo'` 조건 분기를 통해 실 데이터 흐름을 건드리지 않고  
데모 라우트(`/dividing/demo`)에서만 Mock 응답을 반환합니다.

---

#### 4. `src/app/(main)/dividing/[id]/page.tsx` — 상세 페이지 Mock 렌더링

```ts
const MOCK_MEETING_DETAIL: MeetingDetailType = {
  id: 9999,
  title: '유정란 90구 소분 모집',
  location_dep0: '서울특별시',
  // ...
};

const MOCK_COMMENTS_LIST: CommentsListType = {
  content: [],
  sliceInfo: { currentPage: 0, size: 10, hasNext: false },
  totalElements: 0,
};

// id가 'demo'이면 API 전체 건너뛰고 목 데이터로 렌더링
if (meetingId === 'demo') {
  return (
    <section>
      <DetailHeader />
      <DynamicDetailAsideWrapper meetingDetail={MOCK_MEETING_DETAIL} isAuthor={true} ... />
      <DynamicCommentSectionWrapper commentsList={MOCK_COMMENTS_LIST} ... />
    </section>
  );
}
```

`/dividing/demo` 경로 접근 시 실제 API 없이 정적 Mock 데이터로 상세 페이지 전체를 렌더링합니다.  
`generateMetadata`도 동일하게 분기 처리하여 SEO 메타태그도 정상 동작합니다.

---

#### 5. `src/app/(main)/dividing/register/page.tsx` — 등록 폼 시뮬레이션

```ts
// [DEMO] 가짜 유저 세션 — 항상 로그인된 것으로 처리
const MOCK_USER = { userId: 1, userName: '소분소분', userNickname: '소분왕', ... };

// useUserLocation 대신 목 위치 데이터 사용
const userLocation = MOCK_USER.userLocation;
const hasLocation = true;

// useMutation 제거 → 로컬 시뮬레이션
const isPending = false;
const onSubmit = (data: DividingFormData) => {
  console.log('[DEMO] 등록 폼 제출 데이터:', data);
  success('모임이 성공적으로 등록되었어요!');
  router.push('/dividing/demo'); // Mock 상세 페이지로 리다이렉트
};
```

실제 `useMutation` + `dividingRegisterApi` 호출을 제거하고,  
폼 제출 시 성공 토스트를 띄운 뒤 Mock 상세 페이지(`/dividing/demo`)로 리다이렉트합니다.  
위치 정보도 `useUserLocation` 훅 대신 Mock 세션 데이터로 대체하여 네트워크 오류 없이 폼이 동작합니다.

---

### 복구 방법 (API 재연동 시)

1. `middleware.ts` — `'/dividing/register'` 주석 해제
2. `getDividingListApi.ts` — early-return 블록 제거
3. `getComment.ts` / `getCommentCount.ts` — `if (meetingId === 'demo')` 분기 제거
4. `dividing/[id]/page.tsx` — `MOCK_MEETING_DETAIL`, `MOCK_COMMENTS_LIST` 선언 및 `demo` 분기 제거
5. `dividing/register/page.tsx` — `MOCK_USER` 제거, `useUserLocation` / `useMutation` / `dividingRegisterApi` 원복
