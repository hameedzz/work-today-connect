
import { Star, MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface WorkerCardProps {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  location: string;
  distance: string;
  skills: string[];
  experience: string;
  available: boolean;
  onContact?: (id: string) => void;
}

const WorkerCard = ({
  id,
  name,
  avatar,
  rating,
  location,
  distance,
  skills,
  experience,
  available,
  onContact,
}: WorkerCardProps) => {
  const handleContact = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onContact) onContact(id);
  };
  
  return (
    <div className="job-card flex gap-3">
      <Avatar className="h-12 w-12">
        <AvatarImage src={avatar} />
        <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{name}</h3>
              <div className="flex items-center">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-sm ml-1">{rating}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
              <MapPin className="h-3.5 w-3.5" />
              <span>{location}</span>
              <span className="px-1">•</span>
              <span>{distance} away</span>
            </div>
          </div>
          
          <Badge 
            variant="outline" 
            className={available ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}
          >
            {available ? "Available Today" : "Unavailable"}
          </Badge>
        </div>
        
        <div className="mt-3">
          <div className="flex items-center gap-1 text-sm">
            <span className="font-medium">Experience:</span>
            <span>{experience}</span>
          </div>
          
          <div className="mt-2 flex flex-wrap gap-1">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="mt-3 flex justify-end">
          <Button 
            onClick={handleContact} 
            size="sm"
            className="btn-employer"
          >
            Contact Worker
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkerCard;
