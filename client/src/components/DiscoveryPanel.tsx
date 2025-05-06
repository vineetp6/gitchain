import { useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

type DiscoveryPanelProps = {
  className?: string;
};

const DiscoveryPanel = ({ className = "" }: DiscoveryPanelProps) => {
  const [, setLocation] = useLocation();

  // Fetch popular tags
  const { data: tags, isLoading } = useQuery({
    queryKey: ["/api/tags"],
    staleTime: 300000, // 5 minutes
  });

  const handleDiscover = () => {
    setLocation("/discover");
  };

  const handleTagClick = (tagName: string) => {
    setLocation(`/discover?tag=${encodeURIComponent(tagName)}`);
  };

  return (
    <Card className={`overflow-hidden ${className}`}>
      <div className="p-4 font-medium text-foreground border-b border-border">
        Repository Discovery
      </div>
      <div className="p-4">
        <p className="text-sm text-muted-foreground mb-4">
          Find repositories from peers in your network
        </p>
        <Button
          onClick={handleDiscover}
          className="w-full bg-primary hover:bg-primary/90 text-white"
        >
          <SearchIcon className="h-4 w-4 mr-2" />
          Discover Repositories
        </Button>
        <div className="mt-4 pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-2">Popular Tags</h4>
          <div className="flex flex-wrap gap-2">
            {isLoading ? (
              <>
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-12" />
                <Skeleton className="h-6 w-18" />
              </>
            ) : tags && tags.length > 0 ? (
              tags.slice(0, 8).map((tag: { id: number; name: string }) => (
                <span
                  key={tag.id}
                  className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs cursor-pointer hover:bg-muted/80"
                  onClick={() => handleTagClick(tag.name)}
                >
                  {tag.name}
                </span>
              ))
            ) : (
              <span className="text-xs text-muted-foreground">No tags found</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DiscoveryPanel;
