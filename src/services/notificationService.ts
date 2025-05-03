
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  onSnapshot,
  orderBy,
  limit,
  getDocs,
  Timestamp,
  doc,
  updateDoc
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// Interface for notification data
export interface Notification {
  id?: string;
  userId: string;
  title: string;
  message: string;
  type: "job_application" | "job_match" | "message" | "payment" | "system";
  relatedId?: string;
  isRead: boolean;
  createdAt: Date | Timestamp;
}

// Create a new notification
export const createNotification = async (notificationData: Omit<Notification, "id" | "isRead" | "createdAt">) => {
  try {
    const newNotification = {
      ...notificationData,
      isRead: false,
      createdAt: Timestamp.now()
    };
    
    const docRef = await addDoc(collection(db, "notifications"), newNotification);
    return { id: docRef.id, ...newNotification };
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
};

// Get notifications for a user
export const getUserNotifications = async (userId: string) => {
  try {
    const q = query(
      collection(db, "notifications"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const notifications: Notification[] = [];
    
    querySnapshot.forEach((doc) => {
      notifications.push({ id: doc.id, ...doc.data() } as Notification);
    });
    
    return notifications;
  } catch (error) {
    console.error("Error getting notifications:", error);
    throw error;
  }
};

// Subscribe to user notifications in real-time
export const subscribeToUserNotifications = (
  userId: string,
  callback: (notifications: Notification[]) => void
) => {
  const q = query(
    collection(db, "notifications"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
    limit(50)
  );
  
  return onSnapshot(q, (snapshot) => {
    const notifications: Notification[] = [];
    
    snapshot.forEach((doc) => {
      notifications.push({ id: doc.id, ...doc.data() } as Notification);
    });
    
    callback(notifications);
  });
};

// Mark a notification as read
export const markNotificationAsRead = async (notificationId: string) => {
  try {
    const notificationRef = doc(db, "notifications", notificationId);
    await updateDoc(notificationRef, { isRead: true });
    return true;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
};

// Send job notifications to nearby workers
export const notifyNearbyWorkersAboutJob = async (
  job: any,
  maxDistance: number = 20
) => {
  try {
    // Find nearby workers
    const nearbyWorkers = await findNearbyWorkers(
      job.location.geopoint.latitude,
      job.location.geopoint.longitude,
      maxDistance,
      job.requiredSkills
    );
    
    // Create notifications for each worker
    const notifications = nearbyWorkers.map((worker) => ({
      userId: worker.id,
      title: "New job in your area",
      message: `${job.title} (${worker.distance} away)`,
      type: "job_match" as const,
      relatedId: job.id
    }));
    
    // Send notifications
    for (const notification of notifications) {
      await createNotification(notification);
    }
    
    return true;
  } catch (error) {
    console.error("Error notifying workers about job:", error);
    throw error;
  }
};

// Helper function to find nearby workers
const findNearbyWorkers = async (
  latitude: number,
  longitude: number,
  radiusInKm: number = 20,
  requiredSkills?: string[]
) => {
  // Placeholder function - implementation is in authService.ts
  // This is just to avoid circular dependency
  try {
    // This should be imported from authService in a real implementation
    // For now this is a simplified version
    return [];
  } catch (error) {
    console.error("Error finding nearby workers:", error);
    throw error;
  }
};
