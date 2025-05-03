
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { toast } from "sonner";

// Firebase configuration
// Replace with your own Firebase config values
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Firebase Cloud Messaging
let messaging: any;

try {
  messaging = getMessaging(app);
} catch (error) {
  console.error("Firebase messaging not supported in this browser", error);
}

// Request notification permission and get token
export const requestNotificationPermission = async () => {
  try {
    if (!messaging) return;

    const permission = await Notification.requestPermission();
    
    if (permission === "granted") {
      // Get token
      const currentToken = await getToken(messaging, {
        vapidKey: "YOUR_VAPID_KEY"
      });
      
      if (currentToken) {
        console.log("FCM token:", currentToken);
        return currentToken;
      } else {
        console.log("No registration token available");
      }
    } else {
      console.log("Notification permission denied");
    }
  } catch (err) {
    console.error("Error getting notification permission", err);
  }
};

// Handle foreground messages
export const onMessageListener = () => {
  if (!messaging) return Promise.reject(new Error("Messaging not supported"));
  
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("Message received in foreground:", payload);
      toast.info(payload.notification?.title || "New notification", {
        description: payload.notification?.body
      });
      resolve(payload);
    });
  });
};

export default app;
