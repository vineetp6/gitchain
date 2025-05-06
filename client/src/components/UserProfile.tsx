import { useContext } from "react";
import { AppContext, AppContextType } from "@/App";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CopyIcon, ShieldCheckIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

type UserProfileProps = {
  className?: string;
};

const UserProfile = ({ className = "" }: UserProfileProps) => {
  const appContext = useContext(AppContext) as AppContextType;
  const { user, isLoading } = appContext;
  const { toast } = useToast();

  const handleCopyPublicKey = () => {
    if (user?.publicKey) {
      navigator.clipboard.writeText(user.publicKey);
      toast({
        title: "Public key copied",
        description: "Your public key has been copied to the clipboard.",
      });
    }
  };

  const formatStorageUsed = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    } else if (bytes < 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    } else {
      return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
    }
  };

  const formatStorageLimit = (bytes: number) => {
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  const storagePercentage = user ? (user.storageUsed / user.storageLimit) * 100 : 0;

  return (
    <Card className={`${className}`}>
      <CardContent className="p-5">
        {isLoading ? (
          <div className="space-y-4">
            <div className="flex items-center">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="ml-4 space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
            <Skeleton className="h-4 w-full mt-4" />
            <div className="space-y-2 mt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ) : user ? (
          <>
            <div className="flex items-center">
              {user.avatarUrl ? (
                <img
                  className="h-16 w-16 rounded-full"
                  src={user.avatarUrl}
                  alt={user.displayName}
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-semibold">
                  {user.displayName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="ml-4">
                <h2 className="text-foreground font-medium text-lg">{user.displayName}</h2>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span className="truncate">
                    {user.publicKey.substring(0, 10)}...{user.publicKey.substring(user.publicKey.length - 4)}
                  </span>
                  <button
                    className="ml-1 text-gray-400 hover:text-primary focus:outline-none"
                    title="Copy public key"
                    onClick={handleCopyPublicKey}
                  >
                    <CopyIcon className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Storage Used</span>
                <span className="text-sm font-medium text-foreground">
                  {formatStorageUsed(user.storageUsed)} / {formatStorageLimit(user.storageLimit)}
                </span>
              </div>
              <Progress value={storagePercentage} className="h-2" />
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <h3 className="font-medium text-foreground mb-3">Your Identity</h3>
              <div className="flex items-center text-sm bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 p-2 rounded-md mb-3">
                <ShieldCheckIcon className="h-4 w-4 mr-1" />
                <span>Cryptographically verified</span>
              </div>
              <div className="mb-2 text-sm">
                <span className="text-muted-foreground mr-2">Trusted by:</span>
                <span className="text-foreground font-medium">18 peers</span>
              </div>
              <Button variant="link" className="text-sm text-primary p-0 h-auto hover:text-primary-foreground">
                Manage identity keys →
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <h3 className="font-medium text-foreground mb-2">Welcome to GitMesh</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Log in or create an account to start using decentralized Git.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserProfile;
