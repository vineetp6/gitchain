import { useContext } from "react";
import { AppContext, AppContextType } from "@/App";
import NetworkStatus from "@/components/NetworkStatus";
import UserProfile from "@/components/UserProfile";
import NavigationPanel from "@/components/NavigationPanel";
import DiscoveryPanel from "@/components/DiscoveryPanel";
import RepositoryList from "@/components/RepositoryList";
import PopularRepositories from "@/components/PopularRepositories";
import ActivityFeed from "@/components/ActivityFeed";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { GitBranchIcon, UsersIcon, ShieldIcon } from "lucide-react";

const Home = () => {
  const appContext = useContext(AppContext);
  // Handle the case where context might not be available yet
  const user = appContext?.user || null;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Network Status Banner */}
      <NetworkStatus className="mb-6" />

      {user ? (
        <AuthenticatedHome userId={user.id} />
      ) : (
        <UnauthenticatedHome />
      )}
    </div>
  );
};

const AuthenticatedHome = ({ userId }: { userId: number }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left Sidebar */}
      <div className="lg:w-1/4">
        <UserProfile className="mb-6" />
        <NavigationPanel className="mb-6" />
        <DiscoveryPanel />
      </div>

      {/* Main Content */}
      <div className="lg:w-3/4">
        <RepositoryList userId={userId} />
        
        <PopularRepositories className="mt-8" />
        
        <ActivityFeed userId={userId} className="mt-8" />
      </div>
    </div>
  );
};

const UnauthenticatedHome = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center py-12 px-4">
        <GitBranchIcon className="h-16 w-16 text-primary mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Decentralized Git Collaboration
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          A peer-to-peer GitHub alternative that works without central servers,
          supports Git workflows, and ensures data integrity through cryptography.
        </p>
        <div className="flex justify-center space-x-4">
          <Button size="lg" asChild>
            <Link href="/discover">
              Explore Repositories
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/docs">
              Learn More
            </Link>
          </Button>
        </div>
      </div>

      {/* Feature Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
          <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <GitBranchIcon className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Decentralized Storage</h2>
          <p className="text-muted-foreground">
            Your repositories are shared across a network of peers, eliminating the need for a central server.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
          <div className="h-12 w-12 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldIcon className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Cryptographic Verification</h2>
          <p className="text-muted-foreground">
            Every commit and change is cryptographically signed, ensuring data integrity and authenticity.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
          <div className="h-12 w-12 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <UsersIcon className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Collaborative Workflow</h2>
          <p className="text-muted-foreground">
            All the collaboration features you expect: pull requests, issues, and code reviews, but decentralized.
          </p>
        </div>
      </div>

      {/* Popular Repositories Section */}
      <div className="px-4">
        <PopularRepositories />
      </div>

      {/* CTA Section */}
      <div className="bg-primary/5 py-12 px-4 text-center rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Ready to Join GitMesh?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Create an account to start hosting repositories, collaborating with others, and contributing to the decentralized code ecosystem.
        </p>
        <Button size="lg" onClick={() => {
          const registerButton = document.querySelector('button:has(span:contains("Sign up"))');
          if (registerButton instanceof HTMLElement) {
            registerButton.click();
          }
        }}>Get Started</Button>
      </div>
    </div>
  );
};

export default Home;
