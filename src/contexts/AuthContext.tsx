
import React, { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db, requestNotificationPermission } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { saveFCMToken } from "@/services/authService";

interface AuthContextType {
  currentUser: User | null;
  userProfile: any | null;
  userRole: "worker" | "employer" | null;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userProfile: null,
  userRole: null,
  loading: true,
  error: null
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [userRole, setUserRole] = useState<"worker" | "employer" | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          // Fetch user profile from Firestore
          const userDoc = await getDoc(doc(db, "users", user.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserProfile({ id: user.uid, ...userData });
            setUserRole(userData.role as "worker" | "employer");
          } else {
            setError("User profile not found");
          }
          
          // Request notification permission and save FCM token
          const token = await requestNotificationPermission();
          if (token) {
            await saveFCMToken(user.uid, token);
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError("Failed to load user data");
        }
      } else {
        // Reset states when logged out
        setUserProfile(null);
        setUserRole(null);
      }
      
      setLoading(false);
    });
    
    // Cleanup function
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    userRole,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
