
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User
} from "firebase/auth";
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import * as geofire from "geofire-common";

// User registration for workers
export const registerWorker = async (userData: {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  age: number;
  gender: string;
  skills: string[];
  experience: string;
  bio: string;
  area: string;
  maxDistance: number;
  availableDays: string[];
  expectedWage: string;
  latitude: number;
  longitude: number;
}) => {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
    const user = userCredential.user;
    
    // Update display name
    await updateProfile(user, {
      displayName: userData.fullName
    });
    
    // Generate a geohash for the user's location
    const geohash = geofire.geohashForLocation([userData.latitude, userData.longitude]);
    
    // Save additional user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      fullName: userData.fullName,
      phone: userData.phone,
      age: userData.age,
      gender: userData.gender,
      skills: userData.skills,
      experience: userData.experience,
      bio: userData.bio,
      area: userData.area,
      maxDistance: userData.maxDistance,
      availableDays: userData.availableDays,
      expectedWage: userData.expectedWage,
      role: "worker",
      createdAt: new Date(),
      location: {
        address: userData.area,
        geohash: geohash,
        geopoint: {
          latitude: userData.latitude,
          longitude: userData.longitude
        }
      },
      fcmToken: ""
    });
    
    return user;
  } catch (error) {
    console.error("Error registering worker:", error);
    throw error;
  }
};

// User registration for employers
export const registerEmployer = async (userData: {
  email: string;
  password: string;
  companyName: string;
  contactName: string;
  phone: string;
  industry: string;
  address: string;
  description: string;
  latitude: number;
  longitude: number;
}) => {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
    const user = userCredential.user;
    
    // Update display name
    await updateProfile(user, {
      displayName: userData.companyName
    });
    
    // Generate a geohash for the employer's location
    const geohash = geofire.geohashForLocation([userData.latitude, userData.longitude]);
    
    // Save additional user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      companyName: userData.companyName,
      contactName: userData.contactName,
      phone: userData.phone,
      industry: userData.industry,
      address: userData.address,
      description: userData.description,
      role: "employer",
      createdAt: new Date(),
      location: {
        address: userData.address,
        geohash: geohash,
        geopoint: {
          latitude: userData.latitude,
          longitude: userData.longitude
        }
      },
      fcmToken: ""
    });
    
    return user;
  } catch (error) {
    console.error("Error registering employer:", error);
    throw error;
  }
};

// User login
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

// User logout
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Get user profile
export const getUserProfile = async (userId: string) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (userId: string, userData: any) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, userData);
    return true;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

// Save FCM token for notifications
export const saveFCMToken = async (userId: string, token: string) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      fcmToken: token
    });
    return true;
  } catch (error) {
    console.error("Error saving FCM token:", error);
    throw error;
  }
};

// Find nearby workers for a job
export const findNearbyWorkers = async (
  latitude: number,
  longitude: number,
  radiusInKm: number = 20,
  requiredSkills?: string[]
) => {
  try {
    // Find workers within the specified radius
    const center = [latitude, longitude];
    const radiusInM = radiusInKm * 1000;
    
    // Calculate the geohash range for the query
    const bounds = geofire.geohashQueryBounds(center, radiusInM);
    const usersRef = collection(db, "users");
    
    // Create and execute multiple queries for each geohash range
    const nearbyWorkers: any[] = [];
    
    for (const b of bounds) {
      const q = query(
        usersRef,
        where("role", "==", "worker"),
        where("location.geohash", ">=", b[0]),
        where("location.geohash", "<=", b[1])
      );
      
      const querySnapshot = await getDocs(q);
      
      // Filter out results that are outside of the radius
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        
        const distanceInM = geofire.distanceBetween(
          [userData.location.geopoint.latitude, userData.location.geopoint.longitude],
          center
        ) * 1000;
        
        if (distanceInM <= radiusInM) {
          // Check if worker has the required skills if specified
          if (requiredSkills && requiredSkills.length > 0) {
            const workerSkills = userData.skills || [];
            const hasRequiredSkills = requiredSkills.some(skill => 
              workerSkills.includes(skill)
            );
            
            if (!hasRequiredSkills) return;
          }
          
          nearbyWorkers.push({ 
            id: doc.id, 
            ...userData,
            distance: (distanceInM / 1000).toFixed(1) + " km"
          });
        }
      });
    }
    
    // Sort workers by distance
    return nearbyWorkers.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
  } catch (error) {
    console.error("Error finding nearby workers:", error);
    throw error;
  }
};
