import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  GitCommitIcon,
  GitPullRequestIcon,
  AlertCircleIcon,
  RefreshCwIcon,
} from "lucide-react";

type Activity = {
  id: number;
  userId: number;
  repositoryId: number | null;
  type: string;
  payload: any;
  createdAt: string;
  user: {
    id: number;
    username: string;
    displayName: string;
    avatarUrl: string | null;
  };
  repository: {
    id: number;
    name: string;
  } | null;
};

type ActivityFeedProps = {
  userId?: number;
  repositoryId?: number;
  limit?: number;
  className?: string;
};

const ActivityFeed = ({
  userId,
  repositoryId,
  limit = 5,
  className = "",
}: ActivityFeedProps) => {
  let queryKey: string[];
  
  if (repositoryId) {
    queryKey = [`/api/activities/repository/${repositoryId}`, `limit=${limit}`];
  } else if (userId) {
    queryKey = [`/api/activities/user/${userId}`, `limit=${limit}`];
  } else {
    // Default to current user's activities
    queryKey = [`/api/activities/user/current`, `limit=${limit}`];
  }

  const { data: activities, isLoading, isError } = useQuery<Activity[]>({
    queryKey,
    staleTime: 60000, // 1 minute
  });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "commit":
        return <GitCommitIcon className="h-4 w-4 mr-1" />;
      case "pull_request":
        return <GitPullRequestIcon className="h-4 w-4 mr-1" />;
      case "issue":
        return <AlertCircleIcon className="h-4 w-4 mr-1" />;
      default:
        return <RefreshCwIcon className="h-4 w-4 mr-1" />;
    }
  };

  const getActivityMessage = (activity: Activity) => {
    const { type, payload, user, repository } = activity;
    const repoName = repository ? repository.name : "unknown repository";
    
    switch (type) {
      case "commit":
        return (
          <>
            <span className="font-medium text-foreground">
              {user.id === userId ? "You" : user.displayName}
            </span>
            <span className="text-muted-foreground"> pushed to </span>
            <span className="font-medium text-foreground">{repoName}</span>
          </>
        );
      case "pull_request":
        return (
          <>
            <span className="font-medium text-foreground">
              {user.id === userId ? "You" : user.displayName}
            </span>
            <span className="text-muted-foreground">
              {" "}
              {payload.action === "opened" ? "opened" : "closed"} a pull request
              in{" "}
            </span>
            <span className="font-medium text-foreground">{repoName}</span>
          </>
        );
      case "issue":
        return (
          <>
            <span className="font-medium text-foreground">
              {user.id === userId ? "You" : user.displayName}
            </span>
            <span className="text-muted-foreground">
              {" "}
              {payload.action === "opened" ? "opened" : "closed"} an issue on{" "}
            </span>
            <span className="font-medium text-foreground">{repoName}</span>
          </>
        );
      default:
        return (
          <>
            <span className="font-medium text-foreground">
              {user.id === userId ? "You" : user.displayName}
            </span>
            <span className="text-muted-foreground"> performed an action on </span>
            <span className="font-medium text-foreground">{repoName}</span>
          </>
        );
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
    }
    
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""} ago`;
  };

  return (
    <div className={className}>
      <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
      <Card className="overflow-hidden">
        <div className="divide-y divide-border">
          {isLoading ? (
            <>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-4">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                    </div>
                    <div className="space-y-2 w-full">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : isError ? (
            <div className="p-4 text-center">
              <p className="text-muted-foreground">
                Failed to load activities. Please try again later.
              </p>
            </div>
          ) : !activities || activities.length === 0 ? (
            <div className="p-4 text-center">
              <p className="text-muted-foreground">No recent activities found.</p>
            </div>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="p-4">
                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    {activity.user.avatarUrl ? (
                      <img
                        className="h-10 w-10 rounded-full"
                        src={activity.user.avatarUrl}
                        alt={activity.user.displayName}
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-semibold">
                        {activity.user.displayName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-sm">{getActivityMessage(activity)}</div>
                    <div className="mt-1 text-xs text-foreground font-medium">
                      {activity.type === "commit" && (
                        <div className="flex items-center">
                          <GitCommitIcon className="h-3 w-3 mr-1" />
                          <span className="code font-medium">
                            {activity.payload.commitHash.substring(0, 7)}
                          </span>
                          <span className="ml-2">{activity.payload.message}</span>
                        </div>
                      )}
                      {activity.type === "pull_request" && activity.payload.title}
                      {activity.type === "issue" && activity.payload.title}
                    </div>
                    <span className="text-xs text-muted-foreground mt-1 block">
                      {formatTimeAgo(activity.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="bg-muted p-3 text-center">
          <Link
            href={userId ? `/profile/${userId}/activity` : `/activity`}
            className="text-sm text-primary hover:text-primary/80"
          >
            View all activity
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ActivityFeed;
