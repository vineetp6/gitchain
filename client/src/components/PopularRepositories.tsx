import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { StarIcon } from "lucide-react";

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

type PopularRepositoriesProps = {
  className?: string;
};

const PopularRepositories = ({ className = "" }: PopularRepositoriesProps) => {
  // In a real app, we'd fetch popular repositories from the API
  const { data: repositories, isLoading, isError } = useQuery<Repository[]>({
    queryKey: ["/api/repositories"],
    staleTime: 300000, // 5 minutes
  });

  // Sort by stars (descending) and take the top 4
  const popularRepositories = repositories
    ? [...repositories].sort((a, b) => b.stars - a.stars).slice(0, 4)
    : [];

  return (
    <div className={className}>
      <h2 className="text-xl font-semibold text-foreground mb-4">Popular in Your Network</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="ml-3 flex-1 space-y-2">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-12" />
                        <Skeleton className="h-5 w-14" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        ) : isError ? (
          <div className="col-span-2 text-center text-muted-foreground">
            Failed to load popular repositories. Please try again later.
          </div>
        ) : popularRepositories.length === 0 ? (
          <div className="col-span-2 text-center text-muted-foreground">
            No repositories found in your network yet.
          </div>
        ) : (
          popularRepositories.map((repo) => (
            <Card key={repo.id}>
              <CardContent className="p-4">
                <div className="flex items-start">
                  {repo.owner.avatarUrl ? (
                    <img
                      className="h-10 w-10 rounded-full"
                      src={repo.owner.avatarUrl}
                      alt={repo.owner.displayName}
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-semibold">
                      {repo.owner.displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-foreground">
                        <Link
                          href={`/repository/${repo.id}`}
                          className="hover:text-primary"
                        >
                          {repo.owner.username}/{repo.name}
                        </Link>
                      </h3>
                      <div className="flex items-center text-sm">
                        <StarIcon className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-muted-foreground">{repo.stars}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {repo.description || "No description provided"}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {repo.language && (
                        <span className="tag">{repo.language}</span>
                      )}
                      {repo.stars > 10 && (
                        <span className="tag">popular</span>
                      )}
                      {repo.isVerified && (
                        <span className="tag text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900">verified</span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default PopularRepositories;
