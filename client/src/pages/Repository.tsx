import { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { AppContext, AppContextType } from "@/App";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import ActivityFeed from "@/components/ActivityFeed";
import {
  GitBranchIcon,
  GitCommitIcon,
  StarIcon,
  EyeIcon,
  CodeIcon,
  GitForkIcon,
  ListIcon,
  UserIcon,
  HistoryIcon,
  SettingsIcon,
  CheckCircleIcon,
  GitPullRequestIcon,
  AlertCircleIcon,
  DownloadIcon,
  ClipboardIcon,
  UsersIcon,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Repository = {
  id: number;
  name: string;
  description: string | null;
  isPublic: boolean;
  isVerified: boolean;
  ownerId: number;
  language: string | null;
  stars: number;
  forks: number;
  branches: number;
  commits: number;
  localPath: string;
  createdAt: string;
  updatedAt: string;
  owner: {
    id: number;
    username: string;
    displayName: string;
    avatarUrl: string | null;
  };
};

const Repository = () => {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const appContext = useContext(AppContext) as AppContextType;
  const { user } = appContext;
  const { toast } = useToast();
  const repoId = parseInt(id);
  
  const [activeTab, setActiveTab] = useState("code");

  // Fetch repository details
  const {
    data: repository,
    isLoading,
    isError,
    error,
  } = useQuery<Repository>({
    queryKey: [`/api/repositories/${repoId}`],
    staleTime: 60000, // 1 minute
  });

  // Fetch repository tags
  const { data: tags } = useQuery({
    queryKey: [`/api/repositories/${repoId}/tags`],
    staleTime: 60000, // 1 minute
    enabled: !!repository,
  });

  // Fetch repository collaborators
  const { data: collaborators } = useQuery({
    queryKey: [`/api/repositories/${repoId}/collaborators`],
    staleTime: 60000, // 1 minute
    enabled: !!repository,
  });

  // Check if current user is the owner
  const isOwner = user && repository && user.id === repository.ownerId;

  // Handle 404 or access errors
  useEffect(() => {
    if (isError) {
      toast({
        title: "Error",
        description: "Repository not found or you don't have access.",
        variant: "destructive",
      });
      setLocation("/");
    }
  }, [isError, setLocation, toast]);

  const handleCloneRepository = () => {
    if (!repository) return;
    
    // In a real app, this would trigger the P2P connection
    const cloneUrl = `gitmesh://${repository.id}`;
    
    navigator.clipboard.writeText(cloneUrl);
    toast({
      title: "Clone URL copied",
      description: "Clone URL has been copied to your clipboard.",
    });
  };

  const handleStarRepository = () => {
    // In a real app, this would make an API call to star the repository
    toast({
      title: "Repository starred",
      description: "This repository has been added to your stars.",
    });
  };

  const handleForkRepository = () => {
    // In a real app, this would make an API call to fork the repository
    toast({
      title: "Repository forked",
      description: "This repository has been forked to your account.",
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-4">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-6 w-2/3" />
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!repository) {
    return null; // Handled by the useEffect above
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Repository Header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <h1 className="text-2xl font-semibold text-foreground">{repository.name}</h1>
          <span className={`px-2 py-0.5 text-xs rounded-full ${repository.isPublic ? 'badge-primary' : 'badge-private'}`}>
            {repository.isPublic ? "Public" : "Private"}
          </span>
          {repository.isVerified && (
            <div className="flex items-center text-sm badge-success px-2 py-0.5 rounded-full">
              <CheckCircleIcon className="h-3 w-3 mr-1" />
              <span className="text-xs">Verified</span>
            </div>
          )}
        </div>
        
        {repository.description && (
          <p className="text-muted-foreground mb-4">{repository.description}</p>
        )}
        
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <UserIcon className="h-4 w-4 mr-1" />
            <span>
              Owner:{" "}
              <a href={`/profile/${repository.owner.username}`} className="text-primary hover:underline">
                {repository.owner.displayName}
              </a>
            </span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <GitBranchIcon className="h-4 w-4 mr-1" />
            <span>{repository.branches} branches</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <GitCommitIcon className="h-4 w-4 mr-1" />
            <span>{repository.commits} commits</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <StarIcon className="h-4 w-4 mr-1" />
            <span>{repository.stars} stars</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <GitForkIcon className="h-4 w-4 mr-1" />
            <span>{repository.forks} forks</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags && tags.map((tag: { id: number; name: string }) => (
            <span key={tag.id} className="tag">
              {tag.name}
            </span>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            className="flex items-center"
            onClick={handleCloneRepository}
          >
            <DownloadIcon className="h-4 w-4 mr-2" />
            Clone
          </Button>
          <Button
            variant="outline"
            className="flex items-center"
            onClick={handleStarRepository}
          >
            <StarIcon className="h-4 w-4 mr-2" />
            Star
          </Button>
          <Button
            variant="outline"
            className="flex items-center"
            onClick={handleForkRepository}
          >
            <GitForkIcon className="h-4 w-4 mr-2" />
            Fork
          </Button>
          {isOwner && (
            <Button
              variant="outline"
              className="flex items-center"
              onClick={() => setLocation(`/repository/${repoId}/settings`)}
            >
              <SettingsIcon className="h-4 w-4 mr-2" />
              Settings
            </Button>
          )}
        </div>
      </div>

      {/* Repository Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-3/4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="code" className="flex items-center">
                <CodeIcon className="h-4 w-4 mr-2" />
                Code
              </TabsTrigger>
              <TabsTrigger value="issues" className="flex items-center">
                <AlertCircleIcon className="h-4 w-4 mr-2" />
                Issues
              </TabsTrigger>
              <TabsTrigger value="pull-requests" className="flex items-center">
                <GitPullRequestIcon className="h-4 w-4 mr-2" />
                Pull Requests
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center">
                <HistoryIcon className="h-4 w-4 mr-2" />
                Activity
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="code" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                      <GitBranchIcon className="h-4 w-4" />
                      <select className="bg-muted rounded px-2 py-1 text-sm">
                        <option>main</option>
                        <option>develop</option>
                      </select>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <ClipboardIcon className="h-4 w-4 mr-2" />
                      Clone Repository
                    </Button>
                  </div>
                  
                  <div className="border border-border rounded-md overflow-hidden">
                    <div className="bg-muted p-3 border-b border-border">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Files</span>
                        <span className="text-xs text-muted-foreground">Last commit: 3 days ago</span>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between p-2 hover:bg-muted rounded cursor-pointer">
                          <div className="flex items-center">
                            <CodeIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">src</span>
                          </div>
                          <span className="text-xs text-muted-foreground">Directory</span>
                        </div>
                        <div className="flex items-center justify-between p-2 hover:bg-muted rounded cursor-pointer">
                          <div className="flex items-center">
                            <CodeIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">tests</span>
                          </div>
                          <span className="text-xs text-muted-foreground">Directory</span>
                        </div>
                        <div className="flex items-center justify-between p-2 hover:bg-muted rounded cursor-pointer">
                          <div className="flex items-center">
                            <ListIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">README.md</span>
                          </div>
                          <span className="text-xs text-muted-foreground">Updated 3 days ago</span>
                        </div>
                        <div className="flex items-center justify-between p-2 hover:bg-muted rounded cursor-pointer">
                          <div className="flex items-center">
                            <ListIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">package.json</span>
                          </div>
                          <span className="text-xs text-muted-foreground">Updated 5 days ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">README.md</h3>
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <h1>{repository.name}</h1>
                      <p>{repository.description}</p>
                      <h2>Installation</h2>
                      <pre className="bg-muted p-3 rounded-md"><code>git clone gitmesh://{repository.id}</code></pre>
                      <h2>Usage</h2>
                      <p>This is a placeholder README for the repository. In a real implementation, the actual README content would be displayed here.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="issues" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Issues</h3>
                    <Button>New Issue</Button>
                  </div>
                  <div className="text-center p-6">
                    <AlertCircleIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <h3 className="text-lg font-medium mb-2">No Issues Yet</h3>
                    <p className="text-muted-foreground mb-4">There are no issues for this repository yet.</p>
                    <Button>Create First Issue</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="pull-requests" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Pull Requests</h3>
                    <Button>New Pull Request</Button>
                  </div>
                  <div className="text-center p-6">
                    <GitPullRequestIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <h3 className="text-lg font-medium mb-2">No Pull Requests Yet</h3>
                    <p className="text-muted-foreground mb-4">There are no pull requests for this repository yet.</p>
                    <Button>Create First Pull Request</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="activity" className="mt-6">
              <ActivityFeed repositoryId={repository.id} />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="lg:w-1/4">
          <Card className="mb-6">
            <CardContent className="p-4">
              <h3 className="font-medium text-foreground mb-3">About</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {repository.description || "No description provided."}
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <UserIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>
                    <a href={`/profile/${repository.owner.username}`} className="text-primary hover:underline">
                      {repository.owner.displayName}
                    </a>
                  </span>
                </div>
                {repository.language && (
                  <div className="flex items-center">
                    <CodeIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{repository.language}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <EyeIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{repository.isPublic ? "Public" : "Private"} repository</span>
                </div>
                <div className="flex items-center">
                  <HistoryIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Created {new Date(repository.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardContent className="p-4">
              <h3 className="font-medium text-foreground mb-3">Collaborators</h3>
              {collaborators && collaborators.length > 0 ? (
                <div className="space-y-3">
                  {collaborators.map((collab: any) => (
                    <div key={collab.userId} className="flex items-center">
                      {collab.user.avatarUrl ? (
                        <img
                          src={collab.user.avatarUrl}
                          alt={collab.user.displayName}
                          className="h-8 w-8 rounded-full mr-2"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-semibold mr-2">
                          {collab.user.displayName.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <a
                          href={`/profile/${collab.user.username}`}
                          className="text-sm font-medium hover:text-primary"
                        >
                          {collab.user.displayName}
                        </a>
                        <p className="text-xs text-muted-foreground">
                          {collab.permission === "admin"
                            ? "Admin"
                            : collab.permission === "write"
                            ? "Write"
                            : "Read"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <UsersIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No collaborators yet
                  </p>
                </div>
              )}
              {isOwner && (
                <Button
                  variant="outline"
                  className="w-full mt-3"
                  onClick={() => setLocation(`/repository/${repoId}/settings/collaborators`)}
                >
                  Manage Collaborators
                </Button>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium text-foreground mb-3">Peers Sharing</h3>
              <div className="text-center py-4">
                <UsersIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium">8 peers sharing</p>
                <p className="text-xs text-muted-foreground mb-3">
                  Repository is available on multiple peers
                </p>
                <Button variant="outline" className="w-full" size="sm">
                  Network Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Repository;
