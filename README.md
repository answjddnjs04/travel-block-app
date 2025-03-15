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
travel-block-app/
├── backend/          # 백엔드 코드
│   ├── models/       # 데이터베이스 모델
│   ├── routes/       # API 경로
│   └── server.js     # 서버 설정
├── frontend/         # 프론트엔드 코드
│   ├── public/       # 정적 파일
│   ├── src/          # React 소스 코드
│   │   ├── components/  # 재사용 가능한 UI 조각
│   │   └── App.js       # 메인 앱 파일
│   └── package.json  # 의존성 관리
├── .gitignore        # Git 제외 파일
└── README.md         # 프로젝트 설명
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
