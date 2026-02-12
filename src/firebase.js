import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// Firebase 설정
// .env 파일에 실제 값을 설정하세요
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Firebase 설정 검증
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    console.error("Firebase 환경변수가 설정되지 않았습니다.");
    console.error("Vercel 환경변수 설정을 확인해주세요:");
    console.error("- VITE_FIREBASE_API_KEY");
    console.error("- VITE_FIREBASE_AUTH_DOMAIN");
    console.error("- VITE_FIREBASE_PROJECT_ID");
    console.error("- VITE_FIREBASE_STORAGE_BUCKET");
    console.error("- VITE_FIREBASE_MESSAGING_SENDER_ID");
    console.error("- VITE_FIREBASE_APP_ID");
}

// Firebase 초기화
let app;
let db;

try {
    app = initializeApp(firebaseConfig);
    // Firestore 데이터베이스 인스턴스
    db = getFirestore(app);
    console.log("Firebase 초기화 성공");
} catch (error) {
    console.error("Firebase 초기화 실패:", error);
    throw error;
}

export { db };
