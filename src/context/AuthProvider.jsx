"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile as firebaseUpdateProfile,
} from "firebase/auth";
import { auth } from "@/Firebase/firebase.config";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register
  const registerWithEmail = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login
  const logInWithEmail = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Login
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // ⭐ FIXED — Update Profile + Reload User
  const updateUserProfile = async (displayName, photoURL) => {
    await firebaseUpdateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });

    // 🔥 IMPORTANT — refresh user state
    await auth.currentUser.reload();
    setUser({ ...auth.currentUser });
  };

  // Logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Listen to auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const shareAuthData = {
    user,
    loading,
    registerWithEmail,
    logInWithEmail,
    signInWithGoogle,
    updateUserProfile,
    logOut,
    setUser,
    setLoading,
  };

  return (
    <AuthContext.Provider value={shareAuthData}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export default function useAuth() {
  return useContext(AuthContext);
}
