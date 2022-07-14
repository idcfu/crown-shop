import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword as createUserWithEmailAndPasswordCallback,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged as onAuthStateChangedCallback,
  signInWithEmailAndPassword as signInWithEmailAndPasswordCallback,
  signInWithPopup as signInWithPopupCallback,
  signOut as signOutCallback,
  User,
} from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc as setDocCallback } from 'firebase/firestore';

const options = {
  apiKey: 'AIzaSyCPpkxUuxQOt6FM-vk3dQpT0fLSDmYxzuI',
  authDomain: 'crown-shop-35a05.firebaseapp.com',
  projectId: 'crown-shop-35a05',
  storageBucket: 'crown-shop-35a05.appspot.com',
  messagingSenderId: '189890246502',
  appId: '1:189890246502:web:3b3bf0dd49592238a1baa7',
};

initializeApp(options);
const auth = getAuth();
const fireStore = getFirestore();
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

const setDoc = async function (
  { uid, displayName, email }: User,
  additionalData?: object,
) {
  const docRef = doc(fireStore, 'users', uid);
  const docSnapshot = await getDoc(docRef);

  if (!docSnapshot.exists()) {
    await setDocCallback(docRef, {
      displayName,
      email,
      createdAt: new Date(),
      ...additionalData,
    });
  }
};

const createUserWithEmailAndPassword = function (email: string, password: string) {
  return createUserWithEmailAndPasswordCallback(auth, email, password);
};

const signInWithEmailAndPassword = async function (email: string, password: string) {
  await signInWithEmailAndPasswordCallback(auth, email, password);
};

const signInWithPopup = async function () {
  await signInWithPopupCallback(auth, provider);
};

const signOut = function () {
  signOutCallback(auth);
};

const handleAuthStateChange = function (callback: (user: User | null) => void) {
  return onAuthStateChangedCallback(auth, callback);
};

export {
  createUserWithEmailAndPassword,
  handleAuthStateChange,
  setDoc,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
};
