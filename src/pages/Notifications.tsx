
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, Bell } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  subscribeToUserNotifications,
  markNotificationAsRead,
  Notification
} from "@/services/notificationService";
import MobileNavbar from "@/components/layout/MobileNavbar";

const NotificationItem = ({ 
  notification, 
  onRead 
}: { 
  notification: Notification; 
  onRead: () => void; 
}) => {
  const navigate = useNavigate();
  
  const handleClick = async () => {
    // Mark as read
    onRead();
    
    // Navigate based on notification type
    if (notification.type === "job_match" && notification.relatedId) {
      navigate(`/worker/job/${notification.relatedId}`);
    } else if (notification.type === "job_application" && notification.relatedId) {
      navigate(`/employer/applications/${notification.relatedId}`);
    } else if (notification.type === "message") {
      navigate("/messages");
    }
  };

  // Format time
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);
    
    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  
  return (
    <div 
      className={`p-4 border-b last:border-b-0 ${!notification.isRead ? 'bg-muted/50' : ''}`}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium">{notification.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
        </div>
        <span className="text-xs text-muted-foreground">
          {formatTime(notification.createdAt instanceof Date ? notification.createdAt : notification.createdAt.toDate())}
        </span>
      </div>
      {!notification.isRead && (
        <div className="w-2 h-2 bg-worker rounded-full absolute top-4 right-4"></div>
      )}
    </div>
  );
};

const Notifications = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    
    // Subscribe to notifications
    const unsubscribe = subscribeToUserNotifications(
      currentUser.uid,
      (notificationsData) => {
        setNotifications(notificationsData);
        setLoading(false);
      }
    );
    
    return unsubscribe;
  }, [currentUser, navigate]);
  
  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markNotificationAsRead(notificationId);
      
      // Update UI
      setNotifications(notifications.map(n => 
        n.id === notificationId ? { ...n, isRead: true } : n
      ));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-muted/30 pb-16">
      <header className="sticky top-0 bg-white z-30 border-b">
        <div className="container py-3 px-4 flex items-center">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)} 
            className="mr-2"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-medium flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </h1>
        </div>
      </header>
      
      <main className="flex-1">
        <ScrollArea className="h-[calc(100vh-140px)]">
          <div className="relative">
            {loading ? (
              <div className="text-center py-8">
                <p>Loading notifications...</p>
              </div>
            ) : notifications.length > 0 ? (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onRead={() => notification.id && handleMarkAsRead(notification.id)}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <h3 className="font-medium text-lg mt-4">No notifications</h3>
                <p className="text-muted-foreground mt-1">
                  You don't have any notifications yet
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </main>
      
      <MobileNavbar />
    </div>
  );
};

export default Notifications;
