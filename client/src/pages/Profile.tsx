import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import RepositoryList from "@/components/RepositoryList";
import ActivityFeed from "@/components/ActivityFeed";
import {
  UserIcon,
  MailIcon,
  CalendarIcon,
  GitBranchIcon,
  GitCommitIcon,
  StarIcon,
  ShieldCheckIcon,
  ClockIcon,
  MapPinIcon,
  LinkIcon,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type User = {
  id: number;
  username: string;
  displayName: string;
  publicKey: string;
  avatarUrl: string | null;
  storageUsed: number;
  storageLimit: number;
  createdAt: string;
  updatedAt: string;
};

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState("repositories");

  // Fetch user profile
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery<User>({
    queryKey: [`/api/users/by-username/${username}`],
    staleTime: 60000, // 1 minute
    retry: 1,
  });

  // Handle 404 error
  useEffect(() => {
    if (isError) {
      toast({
        title: "Error",
        description: "User not found. The username may be incorrect.",
        variant: "destructive",
      });
      setLocation("/");
    }
  }, [isError, setLocation, toast]);

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format storage size
  const formatStorageSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    } else if (bytes < 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    } else {
      return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/3">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <Skeleton className="h-32 w-32 rounded-full mb-4" />
                  <Skeleton className="h-8 w-48 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:w-2/3">
            <Skeleton className="h-10 w-full mb-6" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Handled by useEffect above
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Profile Sidebar */}
        <div className="lg:w-1/3">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center mb-6">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.displayName}
                    className="h-32 w-32 rounded-full mb-4"
                  />
                ) : (
                  <div className="h-32 w-32 rounded-full bg-primary flex items-center justify-center text-white text-4xl font-semibold mb-4">
                    {user.displayName.charAt(0).toUpperCase()}
                  </div>
                )}
                <h1 className="text-2xl font-bold text-foreground mb-1">
                  {user.displayName}
                </h1>
                <h2 className="text-lg text-muted-foreground">@{user.username}</h2>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center text-sm mb-2">
                  <ShieldCheckIcon className="h-4 w-4 mr-2 text-green-500" />
                  <span>Cryptographically verified identity</span>
                </div>
                <div className="bg-muted p-2 rounded text-xs font-mono overflow-hidden text-ellipsis">
                  {user.publicKey.substring(0, 20)}...{user.publicKey.substring(user.publicKey.length - 20)}
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <ClockIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Joined {formatDate(user.createdAt)}</span>
                </div>
                <div className="flex items-center">
                  <GitBranchIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Storage: {formatStorageSize(user.storageUsed)} / {formatStorageSize(user.storageLimit)}</span>
                </div>
                {/* Additional profile info would go here */}
                <div className="flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Location info (if available)</span>
                </div>
                <div className="flex items-center">
                  <LinkIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <a href="#" className="text-primary hover:underline">personal-website.com</a>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="font-medium text-foreground mb-3">Network Status</h3>
                <div className="flex items-center space-x-4 text-sm">
                  <div>
                    <div className="text-2xl font-semibold">23</div>
                    <div className="text-muted-foreground">Peers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold">156</div>
                    <div className="text-muted-foreground">Stars</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold">18</div>
                    <div className="text-muted-foreground">Followers</div>
                  </div>
                </div>
              </div>
              
              <Button className="w-full mt-6">Follow User</Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Profile Content */}
        <div className="lg:w-2/3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start mb-4">
              <TabsTrigger value="repositories" className="flex items-center">
                <GitBranchIcon className="h-4 w-4 mr-2" />
                Repositories
              </TabsTrigger>
              <TabsTrigger value="stars" className="flex items-center">
                <StarIcon className="h-4 w-4 mr-2" />
                Stars
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center">
                <GitCommitIcon className="h-4 w-4 mr-2" />
                Activity
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="repositories">
              <RepositoryList
                userId={user.id}
                showHeader={false}
              />
            </TabsContent>
            
            <TabsContent value="stars">
              <Card>
                <CardHeader>
                  <CardTitle>Starred Repositories</CardTitle>
                  <CardDescription>
                    Repositories that {user.displayName} has starred
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-10">
                    <StarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No starred repositories yet</h3>
                    <p className="text-muted-foreground">
                      When {user.displayName} stars repositories, they'll appear here.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="activity">
              <ActivityFeed userId={user.id} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
