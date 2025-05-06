import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  GitBranchIcon,
  GitCommitIcon,
  StarIcon,
  CheckCircleIcon,
  MoreVerticalIcon,
  SearchIcon,
  PlusIcon,
  UserIcon,
  BookOpenIcon,
  SettingsIcon,
  Trash2Icon,
  GitForkIcon,
  RefreshCwIcon,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/App";

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
  owner?: User;
};

type RepositoryListProps = {
  userId?: number;
  showHeader?: boolean;
  limit?: number;
  className?: string;
};

const RepositoryList = ({
  userId,
  showHeader = true,
  limit,
  className = "",
}: RepositoryListProps) => {
  const [filter, setFilter] = useState("");
  const [showNewRepoDialog, setShowNewRepoDialog] = useState(false);
  const { toast } = useToast();

  const queryKey = userId ? [`/api/repositories/user/${userId}`] : ["/api/repositories"];

  const { data: repositories, isLoading, isError } = useQuery<Repository[]>({
    queryKey,
    staleTime: 60000, // 1 minute
  });

  const filteredRepositories = repositories
    ? repositories.filter(
        (repo) =>
          repo.name.toLowerCase().includes(filter.toLowerCase()) ||
          (repo.description &&
            repo.description.toLowerCase().includes(filter.toLowerCase()))
      )
    : [];

  const displayedRepositories = limit
    ? filteredRepositories.slice(0, limit)
    : filteredRepositories;

  const handleDeleteRepository = async (id: number) => {
    try {
      await apiRequest("DELETE", `/api/repositories/${id}`);
      queryClient.invalidateQueries({ queryKey });
      toast({
        title: "Repository deleted",
        description: "The repository has been deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting repository:", error);
      toast({
        title: "Error deleting repository",
        description: "There was an error deleting the repository.",
        variant: "destructive",
      });
    }
  };

  const getLanguageColor = (language: string | null) => {
    if (!language) return "bg-gray-400";
    
    const colors: Record<string, string> = {
      TypeScript: "bg-blue-500",
      JavaScript: "bg-yellow-400",
      Python: "bg-green-600",
      Java: "bg-orange-600",
      Rust: "bg-orange-700",
      Go: "bg-blue-400",
      Ruby: "bg-red-600",
      PHP: "bg-purple-400",
      C: "bg-gray-600",
      "C++": "bg-pink-600",
      "C#": "bg-green-500",
    };
    
    return colors[language] || "bg-gray-400";
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
      {showHeader && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-semibold text-foreground mb-3 sm:mb-0">My Repositories</h1>
          <div className="flex space-x-3 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0">
              <Input
                type="text"
                placeholder="Filter repositories..."
                className="w-full sm:w-64 pr-10"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              <SearchIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            <DialogTrigger asChild onClick={() => setShowNewRepoDialog(true)}>
              <Button className="flex items-center">
                <PlusIcon className="h-4 w-4 mr-1" />
                New
              </Button>
            </DialogTrigger>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
              <div className="flex justify-between items-start">
                <div className="space-y-2 w-full">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-full" />
                  <div className="flex items-center mt-3 space-x-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 text-center">
          <p className="text-muted-foreground">
            Failed to load repositories. Please try again later.
          </p>
        </div>
      ) : displayedRepositories.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 text-center">
          <p className="text-muted-foreground">
            {filter
              ? "No repositories match your filter."
              : "No repositories found. Create your first repository to get started."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedRepositories.map((repo) => (
            <div key={repo.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center flex-wrap gap-2">
                    <h2 className="text-lg font-medium text-foreground hover:text-primary">
                      <Link href={`/repository/${repo.id}`}>{repo.name}</Link>
                    </h2>
                    <span className={`ml-0 sm:ml-2 px-2 py-0.5 text-xs rounded-full ${repo.isPublic ? 'badge-primary' : 'badge-private'}`}>
                      {repo.isPublic ? "Public" : "Private"}
                    </span>
                    {repo.isVerified && (
                      <div className="ml-0 sm:ml-2 flex items-center text-sm text-green-700 dark:text-green-400">
                        <CheckCircleIcon className="h-3 w-3 mr-1" />
                        <span className="text-xs">Verified</span>
                      </div>
                    )}
                  </div>
                  {repo.description && (
                    <p className="text-muted-foreground text-sm mt-1">{repo.description}</p>
                  )}
                  <div className="flex flex-wrap items-center mt-3 text-sm">
                    <span className="flex items-center text-muted-foreground mr-4">
                      <GitBranchIcon className="h-3 w-3 mr-1" />
                      {repo.branches} branch{repo.branches !== 1 ? "es" : ""}
                    </span>
                    <span className="flex items-center text-muted-foreground mr-4">
                      <GitCommitIcon className="h-3 w-3 mr-1" />
                      {repo.commits} commit{repo.commits !== 1 ? "s" : ""}
                    </span>
                    <span className="flex items-center text-muted-foreground">
                      <StarIcon className="h-3 w-3 mr-1" />
                      {repo.stars} star{repo.stars !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" title="Repository actions">
                    <GitForkIcon className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVerticalIcon className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/repository/${repo.id}`} className="cursor-pointer">
                          <BookOpenIcon className="h-4 w-4 mr-2" />
                          View repository
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/repository/${repo.id}/settings`} className="cursor-pointer">
                          <SettingsIcon className="h-4 w-4 mr-2" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive cursor-pointer"
                        onClick={() => handleDeleteRepository(repo.id)}
                      >
                        <Trash2Icon className="h-4 w-4 mr-2" />
                        Delete repository
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                <div className="flex items-center">
                  <span
                    className={`inline-block h-3 w-3 rounded-full ${getLanguageColor(
                      repo.language
                    )} mr-1`}
                  ></span>
                  <span className="text-xs text-muted-foreground mr-3">
                    {repo.language || "Unknown"}
                  </span>
                  
                  <span className="text-xs text-muted-foreground flex items-center">
                    <RefreshCwIcon className="h-3 w-3 mr-1" />
                    Updated {formatTimeAgo(repo.updatedAt)}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs badge-success px-2 py-0.5 rounded flex items-center mr-2">
                    <UserIcon className="h-3 w-3 mr-1" />
                    8 peers sharing
                  </span>
                  <div className="flex -space-x-2">
                    <div className="h-6 w-6 rounded-full border-2 border-background bg-primary flex items-center justify-center text-xs text-white">
                      A
                    </div>
                    <div className="h-6 w-6 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-xs text-white">
                      B
                    </div>
                    <div className="h-6 w-6 rounded-full border-2 border-background bg-accent flex items-center justify-center text-xs text-white">
                      C
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={showNewRepoDialog} onOpenChange={setShowNewRepoDialog}>
        <NewRepositoryDialog onClose={() => setShowNewRepoDialog(false)} />
      </Dialog>
    </div>
  );
};

type NewRepositoryDialogProps = {
  onClose: () => void;
};

const NewRepositoryDialog = ({ onClose }: NewRepositoryDialogProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Repository name required",
        description: "Please enter a name for your repository.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await apiRequest("POST", "/api/repositories", {
        name,
        description: description || null,
        isPublic,
      });
      
      queryClient.invalidateQueries({ queryKey: ["/api/repositories"] });
      
      toast({
        title: "Repository created",
        description: "Your new repository has been created successfully.",
      });
      
      onClose();
    } catch (error) {
      console.error("Error creating repository:", error);
      toast({
        title: "Error creating repository",
        description: "There was an error creating your repository.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create a new repository</DialogTitle>
        <DialogDescription>
          A repository contains all project files, including revision history.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <label htmlFor="repo-name" className="text-sm font-medium">
              Repository name
            </label>
            <Input
              id="repo-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="my-awesome-project"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="repo-description" className="text-sm font-medium">
              Description <span className="text-muted-foreground">(optional)</span>
            </label>
            <Input
              id="repo-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description of your repository"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Visibility</label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  checked={isPublic}
                  onChange={() => setIsPublic(true)}
                  className="h-4 w-4 text-primary"
                />
                <span>Public</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  checked={!isPublic}
                  onChange={() => setIsPublic(false)}
                  className="h-4 w-4 text-primary"
                />
                <span>Private</span>
              </label>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {isPublic
                ? "Anyone on the network can see this repository."
                : "You choose who can see and contribute to this repository."}
            </p>
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create repository"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default RepositoryList;
