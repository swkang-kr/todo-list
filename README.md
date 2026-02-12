<img width="545" height="640" alt="image" src="https://github.com/user-attachments/assets/d317d713-0352-4189-989f-b551db3ba675" />


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## Firebase 설정

이 프로젝트는 Firebase Firestore를 사용하여 Todo 데이터를 저장합니다.

### 설정 방법

1. **Firebase 프로젝트 생성**
   - [Firebase Console](https://console.firebase.google.com/)에 접속
   - 새 프로젝트 생성

2. **Firestore 데이터베이스 생성**
   - Firebase Console > Firestore Database > 데이터베이스 만들기
   - 테스트 모드로 시작 (개발용) 또는 프로덕션 모드 선택

3. **Firebase 설정 정보 가져오기**
   - Firebase Console > 프로젝트 설정 > 일반
   - "내 앱" 섹션에서 웹 앱 추가 (</> 아이콘)
   - SDK 구성 정보 복사

4. **환경 변수 설정**
   ```bash
   cp .env.example .env
   ```
   `.env` 파일을 열고 Firebase 설정 정보 입력:
   ```
   VITE_FIREBASE_API_KEY=your-api-key-here
   VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

5. **의존성 설치 및 실행**
   ```bash
   npm install
   npm run dev
   ```

### 기능

- ✅ 실시간 데이터 동기화
- ✅ Todo 추가/수정/삭제
- ✅ 검색 기능
- ✅ 완료/미완료 통계

## Sources

[![React Study](https://img.shields.io/badge/React_Study-한_입_크기로_잘라_먹는_리액트-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://inf.run/EnXcr)
