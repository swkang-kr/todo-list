import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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

console.log("🔧 Firebase 환경변수 확인:");
console.log("API Key:", firebaseConfig.apiKey ? "✅ 설정됨" : "❌ 없음");
console.log("Auth Domain:", firebaseConfig.authDomain ? "✅ 설정됨" : "❌ 없음");
console.log("Project ID:", firebaseConfig.projectId ? "✅ 설정됨" : "❌ 없음");
console.log("Storage Bucket:", firebaseConfig.storageBucket ? "✅ 설정됨" : "❌ 없음");
console.log("Messaging Sender ID:", firebaseConfig.messagingSenderId ? "✅ 설정됨" : "❌ 없음");
console.log("App ID:", firebaseConfig.appId ? "✅ 설정됨" : "❌ 없음");

// Firebase 초기화
let app = null;
let db = null;

// Firebase 설정 검증
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    console.error("❌ Firebase 환경변수가 설정되지 않았습니다!");
    console.error("다음 환경변수를 확인해주세요:");
    console.error("- VITE_FIREBASE_API_KEY:", firebaseConfig.apiKey || "❌ 없음");
    console.error("- VITE_FIREBASE_PROJECT_ID:", firebaseConfig.projectId || "❌ 없음");
    console.error("");
    console.error("💡 Vercel 배포인 경우:");
    console.error("1. Vercel Dashboard > Settings > Environment Variables");
    console.error("2. 모든 VITE_FIREBASE_* 환경변수 확인");
    console.error("3. 변경 후 재배포 필요");
    console.error("");
    console.error("💡 로컬 개발인 경우:");
    console.error("1. .env.example을 복사하여 .env 파일 생성");
    console.error("2. Firebase Console에서 설정값 복사");
} else {
    try {
        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        console.log("✅ Firebase 초기화 성공!");
        console.log("📊 Firestore 데이터베이스 연결됨");
    } catch (error) {
        console.error("❌ Firebase 초기화 실패:", error);
        console.error("에러 상세:", error.message);

        if (error.code === 'app/duplicate-app') {
            console.error("이미 Firebase 앱이 초기화되어 있습니다.");
        } else if (error.code === 'app/invalid-credential') {
            console.error("Firebase 인증 정보가 잘못되었습니다. API Key와 Project ID를 확인하세요.");
        }
    }
}

export { db };
