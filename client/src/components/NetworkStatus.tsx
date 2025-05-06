import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Radio, Podcast, DownloadIcon, UploadIcon, SettingsIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type NetworkStatsProps = {
  className?: string;
};

const NetworkStatus = ({ className = "" }: NetworkStatsProps) => {
  // Fetch active peers
  const { data: peers, isLoading: peersLoading } = useQuery({
    queryKey: ["/api/peers"],
    staleTime: 30000, // 30 seconds
  });

  // Network stats are simulated here, but would be fetched from an API
  const { data: networkStats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/network/stats"],
    staleTime: 60000, // 1 minute
  });

  const isLoading = peersLoading || statsLoading;
  const activePeersCount = peers?.length || 0;

  // Simulated download/upload speeds - in a real app these would come from a P2P networking library
  const downloadSpeed = Math.floor(Math.random() * 30) + 5; // 5-35 MB/s
  const uploadSpeed = Math.floor(Math.random() * 15) + 3; // 3-18 MB/s

  return (
    <Card className={`${className}`}>
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4 bg-muted p-3 rounded-full">
            <Podcast className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">Decentralized Network Status</h3>
            <div className="flex flex-wrap items-center text-sm text-muted-foreground mt-1">
              {isLoading ? (
                <>
                  <Skeleton className="h-4 w-24 mr-4" />
                  <Skeleton className="h-4 w-16 mr-4" />
                  <Skeleton className="h-4 w-16" />
                </>
              ) : (
                <>
                  <span className="flex items-center mr-4">
                    <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-1 pulse"></span>
                    Connected to {activePeersCount} peers
                  </span>
                  <span className="flex items-center mr-4">
                    <DownloadIcon className="h-3 w-3 mr-1" />
                    {downloadSpeed} MB/s
                  </span>
                  <span className="flex items-center">
                    <UploadIcon className="h-3 w-3 mr-1" />
                    {uploadSpeed} MB/s
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        <div>
          <Button variant="outline" size="sm" className="flex items-center">
            <SettingsIcon className="h-3 w-3 mr-1" />
            Network Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkStatus;
