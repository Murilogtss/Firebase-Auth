import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { FirebaseConfig } from "./FirebaseConfig"; // FirebaseConfig;

//Definir as credenciais do Firebase
// const FirebaseConfig = {
//  apiKey: "api-key",
//  authDomain: "auth-domain",
//  projectId: "project-id",
//  storageBucket: "storage-bucket"",
//  messagingSenderId: "messaging-sender-id",
//  appId: "app-id",
//};

const app = initializeApp(FirebaseConfig);

export const auth = getAuth(app);
export default app;
