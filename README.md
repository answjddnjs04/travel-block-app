# 여행 블록 앱 (Travel Block App)

여행과 관련된 장소와 경험을 블록 형태로 저장하고 관리할 수 있는 웹 애플리케이션입니다.

## 기능

- 여행 블록 생성, 조회, 수정, 삭제 (CRUD)
- 여행 계획 생성 및 관리
- 계획에 블록 추가하고 일자별로 정리
- 블록과 계획에 태그 추가 및 검색 가능
- 반응형 디자인으로 모바일 환경 지원

## 기술 스택

### 백엔드
- Node.js
- Express.js
- MongoDB
- Mongoose

### 프론트엔드
- React
- React Router
- Axios
- HTML/CSS

## 시작하기

### 필수 조건
- Node.js
- MongoDB

### 설치 및 실행

1. 저장소 클론
```
git clone https://github.com/[사용자이름]/travel-block-app.git
cd travel-block-app
```

2. 백엔드 설정
```
cd backend
npm install
npm run dev
```

3. 프론트엔드 설정
```
cd ../frontend
npm install
npm start
```

4. 브라우저에서 확인
```
http://localhost:3000
```

## 개발 모드

개발 모드에서는 MongoDB 연결 없이 더미 데이터를 사용하여 테스트할 수 있습니다. 이는 프론트엔드 `axiosConfig.js` 파일에서 관리됩니다.

## 프로젝트 구조

```
travel-block-app/
│
├── backend/                       # 백엔드 디렉토리
│   ├── package.json               # 백엔드 의존성 정보
│   ├── server.js                  # 메인 서버 파일 (Express 앱)
│   │
│   ├── models/                    # 데이터베이스 모델
│   │   ├── blockModel.js          # 블록 데이터 모델
│   │   └── planModel.js           # 여행 계획 모델
│   │
│   └── routes/                    # API 라우트
│       ├── blockRoutes.js         # 블록 API 라우트
│       └── planRoutes.js          # 계획 API 라우트
│
└── frontend/                      # 프론트엔드 디렉토리
    ├── package.json               # 프론트엔드 의존성 정보
    │
    ├── public/                    # 정적 파일
    │   ├── index.html             # 메인 HTML 파일
    │   └── manifest.json          # PWA 매니페스트 파일
    │
    └── src/                       # React 소스 코드
        ├── App.js                 # 메인 앱 컴포넌트
        ├── App.css                # 스타일 정의
        ├── index.js               # React 진입점
        ├── index.css              # 기본 스타일
        │
        ├── components/            # 리액트 컴포넌트
        │   ├── Navbar.js          # 네비게이션 바 컴포넌트
        │   ├── BlockList.js       # 블록 목록 표시 컴포넌트
        │   ├── BlockDetail.js     # 블록 상세 정보 컴포넌트
        │   ├── BlockForm.js       # 블록 생성/수정 폼 컴포넌트
        │   ├── PlanList.js        # 계획 목록 표시 컴포넌트
        │   ├── PlanDetail.js      # 계획 상세 정보 컴포넌트
        │   └── PlanForm.js        # 계획 생성/수정 폼 컴포넌트
        │
        └── utils/                 # 유틸리티 기능
            └── axiosConfig.js     # API 호출 설정
```

## 주요 기능 사용법

### 여행 블록 관리

1. **블록 생성**: '새 블록' 메뉴에서 장소나 경험에 대한 정보 입력
2. **블록 목록 확인**: 메인 페이지에서 모든 블록 목록 확인 가능
3. **블록 상세 정보**: 각 블록 카드의 '자세히 보기' 버튼 클릭
4. **블록 수정/삭제**: 상세 페이지에서 수정 및 삭제 가능

### 여행 계획 관리

1. **계획 생성**: '새 여행 계획' 메뉴에서 여행 기본 정보 입력
2. **블록 추가**: 계획 상세 페이지에서 일자별로 블록 추가
3. **일정 관리**: 여러 날짜의 일정을 탭 인터페이스로 관리
4. **계획 공유**: 공개 설정을 통해 다른 사용자와 공유 가능 (추후 기능)

## 확장 계획

이 프로젝트는 확장 가능한 구조로 설계되었으며 다음과 같은 기능을 추가할 수 있습니다:

- 사용자 인증 및 개인 블록 컬렉션
- 지도 API 통합
- 이미지 업로드 기능
- 소셜 미디어 공유
- 여행 경비 추적 기능

## 기여

버그 리포트, 기능 요청, 풀 리퀘스트 등 어떤 형태의 기여도 환영합니다.

## 라이센스

MIT
