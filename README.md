# 여행 블록 앱 (Travel Block App)

여행과 관련된 장소와 경험을 블록 형태로 저장하고 관리할 수 있는 웹 애플리케이션입니다.

## 기능

- 여행 블록 생성, 조회, 수정, 삭제 (CRUD)
- 블록에 태그 추가 및 태그별 검색
- 블록에 이미지 URL 추가 가능
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
npm start
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

## 프로젝트 구조

```
travel-block-app/                  # 루트 디렉토리
│
├── .gitignore                     # Git에서 제외할 파일 목록
├── README.md                      # 프로젝트 설명 문서
│
├── backend/                       # 백엔드 디렉토리
│   ├── package.json               # 백엔드 의존성 정보
│   ├── server.js                  # 메인 서버 파일 (Express 앱 시작점)
│   │
│   ├── models/                    # 데이터베이스 모델 디렉토리
│   │   └── blockModel.js          # 블록 데이터 모델 정의
│   │
│   └── routes/                    # API 라우트 디렉토리
│       └── blockRoutes.js         # 블록 관련 API 라우트 정의
│
└── frontend/                      # 프론트엔드 디렉토리
    ├── package.json               # 프론트엔드 의존성 정보
    │
    ├── public/                    # 정적 파일 디렉토리 (자동 생성됨)
    │   ├── index.html             # 메인 HTML 파일
    │   ├── favicon.ico            # 웹사이트 아이콘
    │   └── manifest.json          # PWA 매니페스트 파일
    │
    └── src/                       # React 소스 코드 디렉토리
        ├── App.js                 # 메인 앱 컴포넌트 (라우팅 설정)
        ├── App.css                # 전역 스타일 정의
        ├── index.js               # React 앱 진입점 (자동 생성됨)
        │
        └── components/            # 리액트 컴포넌트 디렉토리
            ├── Navbar.js          # 네비게이션 바 컴포넌트
            ├── BlockList.js       # 블록 목록 표시 컴포넌트
            ├── BlockForm.js       # 블록 생성/수정 폼 컴포넌트
            └── BlockDetail.js     # 블록 상세 정보 컴포넌트
```

## 확장 계획

이 프로젝트는 확장 가능한 구조로 설계되었으며 다음과 같은 기능을 추가할 수 있습니다:

- 사용자 인증 및 개인 블록 컬렉션
- 지도 API 통합
- 이미지 업로드 기능
- 소셜 미디어 공유
- 여행 일정 계획

## 기여

버그 리포트, 기능 요청, 풀 리퀘스트 등 어떤 형태의 기여도 환영합니다.

## 라이센스

MIT
