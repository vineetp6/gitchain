import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  StarIcon,
  SearchIcon,
  GitBranchIcon,
  GitCommitIcon,
  CheckCircleIcon,
  RefreshCwIcon,
  GitForkIcon,
  UserIcon,
} from "lucide-react";

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
  owner: {
    id: number;
    username: string;
    displayName: string;
    avatarUrl: string | null;
  };
};

const Discover = () => {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [sortBy, setSortBy] = useState("stars");

  // Parse query params
  useEffect(() => {
    const params = new URLSearchParams(location.split("?")[1]);
    const q = params.get("q");
    const tag = params.get("tag");
    
    if (q) {
      setSearchQuery(q);
    }
    
    if (tag) {
      // In a real application, you would fetch repositories by tag
      setSearchQuery(tag);
    }
  }, [location]);

  // Fetch all public repositories
  const {
    data: repositories,
    isLoading,
    isError,
    refetch,
  } = useQuery<Repository[]>({
    queryKey: ["/api/repositories", searchQuery],
    staleTime: 60000, // 1 minute
  });

  // Fetch available tags
  const { data: tags } = useQuery({
    queryKey: ["/api/tags"],
    staleTime: 300000, // 5 minutes
  });

  // Get unique languages from repositories
  const languages = repositories
    ? Array.from(
        new Set(
          repositories
            .map((repo) => repo.language)
            .filter((lang): lang is string => !!lang)
        )
      )
    : [];

  // Filter and sort repositories
  const filteredRepositories = repositories
    ? repositories
        .filter(
          (repo) =>
            (searchQuery
              ? repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (repo.description &&
                  repo.description.toLowerCase().includes(searchQuery.toLowerCase()))
              : true) &&
            (languageFilter !== "all"
              ? repo.language === languageFilter
              : true)
        )
        .sort((a, b) => {
          switch (sortBy) {
            case "stars":
              return b.stars - a.stars;
            case "forks":
              return b.forks - a.forks;
            case "recent":
              return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
            default:
              return 0;
          }
        })
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
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

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">Discover Repositories</h1>
        <p className="text-muted-foreground mb-6">
          Find repositories across the decentralized network that match your interests.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-2/3">
            <form onSubmit={handleSearch} className="flex w-full">
              <div className="relative flex-grow">
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search repositories..."
                  className="pl-10 pr-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" className="ml-2">
                Search
              </Button>
            </form>
          </div>
          
          <div className="flex gap-2 md:w-1/3">
            <Select value={languageFilter} onValueChange={setLanguageFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stars">Stars</SelectItem>
                <SelectItem value="forks">Forks</SelectItem>
                <SelectItem value="recent">Recently Updated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {tags && tags.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Popular Tags:</p>
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 10).map((tag: { id: number; name: string }) => (
                <Button
                  key={tag.id}
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery(tag.name)}
                  className="text-xs"
                >
                  {tag.name}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-8 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center p-10">
          <p className="text-lg text-muted-foreground">
            An error occurred while fetching repositories. Please try again later.
          </p>
          <Button onClick={() => refetch()} className="mt-4">
            Retry
          </Button>
        </div>
      ) : filteredRepositories.length === 0 ? (
        <div className="text-center p-10">
          <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium mb-2">No repositories found</p>
          <p className="text-muted-foreground mb-4">
            {searchQuery
              ? `No repositories match "${searchQuery}"`
              : "No repositories available for the selected filters"}
          </p>
          <Button onClick={() => {
            setSearchQuery("");
            setLanguageFilter("all");
          }}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRepositories.map((repo) => (
            <Card key={repo.id} className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg hover:text-primary">
                      <Link href={`/repository/${repo.id}`}>{repo.name}</Link>
                    </CardTitle>
                    <div className="flex items-center mt-1 text-sm">
                      <Link href={`/profile/${repo.owner.username}`}>
                        <div className="flex items-center text-muted-foreground hover:text-primary">
                          <UserIcon className="h-3 w-3 mr-1" />
                          {repo.owner.displayName}
                        </div>
                      </Link>
                      {repo.isVerified && (
                        <div className="ml-2 flex items-center text-green-700 dark:text-green-400">
                          <CheckCircleIcon className="h-3 w-3 mr-1" />
                          <span className="text-xs">Verified</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 text-muted-foreground mr-1" />
                    <span className="text-sm text-muted-foreground">{repo.stars}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {repo.description || "No description provided"}
                </p>
                <div className="flex items-center space-x-4 text-xs">
                  <div className="flex items-center text-muted-foreground">
                    <GitBranchIcon className="h-3 w-3 mr-1" />
                    {repo.branches}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <GitCommitIcon className="h-3 w-3 mr-1" />
                    {repo.commits}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <GitForkIcon className="h-3 w-3 mr-1" />
                    {repo.forks}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-border pt-3">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    {repo.language && (
                      <>
                        <span className={`inline-block h-3 w-3 rounded-full ${getLanguageColor(repo.language)} mr-1`}></span>
                        <span className="text-xs text-muted-foreground">{repo.language}</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <RefreshCwIcon className="h-3 w-3 mr-1" />
                    <span className="text-xs">Updated recently</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Discover;
