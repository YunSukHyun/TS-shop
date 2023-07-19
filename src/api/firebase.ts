import { initializeApp } from "firebase/app";
import { get, getDatabase, ref } from "firebase/database";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { UserWithAdminCheck } from "../components/context/AuthContext";

// firebase 로직을 컴포넌트와 독립적으로 분리시킨다.
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);
const provider = new GoogleAuthProvider();

export const login = () => {
  signInWithPopup(auth, provider).catch(console.error);
};

export const logout = () => {
  signOut(auth).catch(console.error);
};

export const onUserStateChange = (
  callback: (arg0: UserWithAdminCheck | null) => void
) => {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user
      ? await adminUser({ ...user, isAdmin: false })
      : null;
    callback(updatedUser);
  });
};

const adminUser = async (user: UserWithAdminCheck) => {
  return get(ref(database, "admins")).then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val();
      console.log(admins);
      const isAdmin = admins.includes(user.uid);
      return { ...user, isAdmin };
    }
    return user;
  });
};
