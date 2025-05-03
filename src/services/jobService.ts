
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  onSnapshot,
  GeoPoint,
  setDoc,
  Timestamp,
  orderBy,
  limit
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import * as geofire from "geofire-common";

const JOBS_COLLECTION = "jobs";
const USERS_COLLECTION = "users";

// Job interface to match our data structure
export interface FirebaseJob {
  id?: string;
  title: string;
  description: string;
  location: {
    address: string;
    geohash: string;
    geopoint: {
      latitude: number;
      longitude: number;
    };
  };
  wage: number;
  currency: string;
  duration: string;
  category: string;
  requirements: string[];
  employerId: string;
  createdAt: Date | Timestamp;
  status: "active" | "filled" | "cancelled";
  distance?: string; // Add distance field as optional
}

// Create a new job
export const createJob = async (jobData: Omit<FirebaseJob, "id" | "createdAt" | "status">) => {
  try {
    const newJob = {
      ...jobData,
      createdAt: Timestamp.now(),
      status: "active"
    };
    
    const docRef = await addDoc(collection(db, JOBS_COLLECTION), newJob);
    return { id: docRef.id, ...newJob };
  } catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
};

// Get job by ID
export const getJobById = async (jobId: string) => {
  try {
    const docRef = doc(db, JOBS_COLLECTION, jobId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as FirebaseJob;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting job:", error);
    throw error;
  }
};

// Update job
export const updateJob = async (jobId: string, jobData: Partial<FirebaseJob>) => {
  try {
    const jobRef = doc(db, JOBS_COLLECTION, jobId);
    await updateDoc(jobRef, jobData);
    return true;
  } catch (error) {
    console.error("Error updating job:", error);
    throw error;
  }
};

// Delete job
export const deleteJob = async (jobId: string) => {
  try {
    await deleteDoc(doc(db, JOBS_COLLECTION, jobId));
    return true;
  } catch (error) {
    console.error("Error deleting job:", error);
    throw error;
  }
};

// Get jobs near location (within radiusInKm)
export const getJobsNearLocation = async (
  lat: number, 
  lng: number, 
  radiusInKm: number = 20,
  category?: string
) => {
  try {
    // Find jobs within the specified radius
    const center = [lat, lng];
    const radiusInM = radiusInKm * 1000;
    
    // Calculate the geohash range for the query
    const bounds = geofire.geohashQueryBounds(center as [number, number]);
    const jobsRef = collection(db, JOBS_COLLECTION);
    
    // Create and execute multiple queries for each geohash range
    const matchingJobs: FirebaseJob[] = [];
    
    for (const b of bounds) {
      let jobQuery = query(
        jobsRef,
        where("location.geohash", ">=", b[0]),
        where("location.geohash", "<=", b[1]),
        where("status", "==", "active")
      );
      
      // Add category filter if provided
      if (category) {
        jobQuery = query(jobQuery, where("category", "==", category));
      }
      
      const querySnapshot = await getDocs(jobQuery);
      
      // Filter out results that are outside of the radius
      querySnapshot.forEach((doc) => {
        const jobData = doc.data() as Omit<FirebaseJob, "id">;
        
        const distanceInM = geofire.distanceBetween(
          [jobData.location.geopoint.latitude, jobData.location.geopoint.longitude] as [number, number],
          center as [number, number]
        ) * 1000;
        
        if (distanceInM <= radiusInM) {
          matchingJobs.push({ 
            id: doc.id, 
            ...jobData,
            distance: (distanceInM / 1000).toFixed(1) + " km"
          } as FirebaseJob & { distance: string });
        }
      });
    }
    
    // Sort jobs by distance
    return matchingJobs.sort((a: any, b: any) => parseFloat(a.distance) - parseFloat(b.distance));
  } catch (error) {
    console.error("Error getting nearby jobs:", error);
    throw error;
  }
};

// Subscribe to jobs near location in real-time
export const subscribeToNearbyJobs = (
  lat: number,
  lng: number,
  radiusInKm: number = 20,
  category: string | undefined,
  callback: (jobs: FirebaseJob[]) => void
) => {
  // This is a simplified version that doesn't use true geoqueries for real-time
  // For production, you'd need a more complex solution with multiple listeners
  const jobsRef = query(
    collection(db, JOBS_COLLECTION),
    where("status", "==", "active"),
    orderBy("createdAt", "desc")
  );
  
  return onSnapshot(jobsRef, (snapshot) => {
    const center = [lat, lng] as [number, number];
    const radiusInM = radiusInKm * 1000;
    const jobs: any[] = [];
    
    snapshot.forEach((doc) => {
      const jobData = doc.data();
      
      // If location exists, calculate distance
      if (jobData.location?.geopoint) {
        const distanceInM = geofire.distanceBetween(
          [jobData.location.geopoint.latitude, jobData.location.geopoint.longitude] as [number, number],
          center
        ) * 1000;
        
        if (distanceInM <= radiusInM) {
          // If category filter is applied, check if job matches
          if (!category || jobData.category === category) {
            jobs.push({ 
              id: doc.id, 
              ...jobData,
              distance: (distanceInM / 1000).toFixed(1) + " km"
            });
          }
        }
      }
    });
    
    // Sort jobs by distance and call the callback with the filtered data
    callback(jobs.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance)));
  });
};

// Job application methods
export const applyForJob = async (jobId: string, workerId: string) => {
  try {
    const applicationRef = collection(db, "jobApplications");
    await addDoc(applicationRef, {
      jobId,
      workerId,
      status: "pending",
      appliedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    console.error("Error applying for job:", error);
    throw error;
  }
};

export const getUserApplications = async (userId: string) => {
  try {
    const applicationsQuery = query(
      collection(db, "jobApplications"),
      where("workerId", "==", userId)
    );
    
    const querySnapshot = await getDocs(applicationsQuery);
    const applications: any[] = [];
    
    for (const doc of querySnapshot.docs) {
      const application = doc.data();
      // Get the job data
      const jobDoc = await getDoc(doc.ref);
      const jobData = jobDoc.data();
      
      applications.push({
        id: doc.id,
        ...application,
        job: jobData
      });
    }
    
    return applications;
  } catch (error) {
    console.error("Error getting user applications:", error);
    throw error;
  }
};
