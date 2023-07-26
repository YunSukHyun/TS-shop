import { initializeApp } from "firebase/app";
import { get, getDatabase, ref, remove, set } from "firebase/database";
import { v4 as uuid } from "uuid";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { UserWithAdminCheck } from "../context/AuthContext";
import { CartProduct, Product } from "../pages/NewProduct";

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
      const isAdmin = admins.includes(user.uid);
      return { ...user, isAdmin };
    }
    return user;
  });
};

export const addNewProduct = (product: Product, image: string) => {
  const id = uuid();
  return set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: product.price,
    image,
    options: product.options.split(","),
  });
};

export const getProducts = async () => {
  return await get(ref(database, "products")).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
};

export const getCart = async (userId: string | undefined | null) => {
  return get(ref(database, `cart/${userId}`)).then((snapshot) => {
    const items = snapshot.val() || {};
    return Object.values(items);
  });
};

export const addOrUpdateToCart = async (
  userId: string | null | undefined,
  product: CartProduct
) => {
  return set(ref(database, `cart/${userId}/${product.id}`), product);
};

export const removeFromCart = async (
  userId: string | null | undefined,
  productId: string
) => {
  return remove(ref(database, `cart/${userId}/${productId}`));
};
