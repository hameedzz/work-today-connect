
import { MapPin, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface JobCardProps {
  id: string;
  title: string;
  location: string;
  wage: number;
  currency: string;
  distance: string;
  duration: string;
  category: string;
  postedAt: string;
  applied?: boolean;
  onApply?: (id: string) => void;
  onClick?: (id: string) => void;
}

const JobCard = ({
  id,
  title,
  location,
  wage,
  currency,
  distance,
  duration,
  category,
  postedAt,
  applied = false,
  onApply,
  onClick,
}: JobCardProps) => {
  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onApply) onApply(id);
  };
  
  return (
    <div 
      className="job-card cursor-pointer"
      onClick={() => onClick && onClick(id)}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-lg">{title}</h3>
          <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
            <MapPin className="h-3.5 w-3.5" />
            <span>{location}</span>
            <span className="px-1">•</span>
            <span>{distance} away</span>
          </div>
        </div>
        <Badge variant="outline" className="bg-muted/50">{category}</Badge>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4 text-green-500" />
            <span className="font-medium">
              {currency} {wage}
              <span className="text-xs font-normal text-muted-foreground">/day</span>
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-blue-500" />
            <span>{duration}</span>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground">
          Posted {postedAt}
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        {!applied ? (
          <Button 
            onClick={handleApply} 
            size="sm"
            className="btn-worker"
          >
            Apply Now
          </Button>
        ) : (
          <Badge variant="secondary" className="badge-worker">Applied</Badge>
        )}
      </div>
    </div>
  );
};

export default JobCard;
