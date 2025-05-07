import { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { AppContext, AppContextType } from "@/App";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { useMobile } from "@/hooks/use-mobile";
import {
  GitBranchIcon,
  SearchIcon,
  BellIcon,
  MenuIcon,
  LogOutIcon,
  UserIcon,
  SettingsIcon,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const [location, setLocation] = useLocation();
  const appContext = useContext(AppContext);
  // Handle the case where context might not be available yet
  const { user, logout } = appContext || { user: null, logout: async () => {} };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useMobile();
  const { toast } = useToast();

  // Fetch active peers
  const { data: peers } = useQuery({
    queryKey: ["/api/peers"],
    staleTime: 30000, // 30 seconds
    enabled: !!user,
  });

  const activePeersCount = Array.isArray(peers) ? peers.length : 0;

  const handleLogout = async () => {
    try {
      await logout();
      setLocation("/");
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error("Logout failed:", error);
      toast({
        title: "Logout failed",
        description: "There was an error logging out.",
        variant: "destructive",
      });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/discover?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <GitBranchIcon className="text-primary text-2xl mr-2" />
              <span className="text-xl font-semibold text-foreground">GitMesh</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden ml-10 md:flex space-x-8">
              <Link href="/" className={`nav-link ${location === "/" ? "nav-link-active" : ""}`}>
                Repositories
              </Link>
              <Link href="/discover" className={`nav-link ${location.startsWith("/discover") ? "nav-link-active" : ""}`}>
                Discover
              </Link>
              <Link href="/network" className={`nav-link ${location === "/network" ? "nav-link-active" : ""}`}>
                Network
              </Link>
              <Link href="/docs" className={`nav-link ${location === "/docs" ? "nav-link-active" : ""}`}>
                Documentation
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Network Status Indicator */}
            {user && (
              <div className="hidden md:flex items-center px-2 py-1 bg-muted rounded-full">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2 pulse"></span>
                <span className="text-xs text-muted-foreground">{activePeersCount} Peers</span>
              </div>
            )}
            
            {/* Notifications */}
            {user && (
              <div className="relative">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary focus:ring-primary">
                  <BellIcon className="h-5 w-5" />
                </Button>
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-destructive"></span>
              </div>
            )}
            
            {/* Search bar */}
            <div className="hidden md:block">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Search repositories..."
                  className="w-64 pr-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <SearchIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </form>
            </div>
            
            {/* User Profile */}
            {user ? (
              <div className="relative ml-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      {user.avatarUrl ? (
                        <img
                          src={user.avatarUrl}
                          alt={user.displayName}
                          className="h-8 w-8 rounded-full"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                          {user.displayName.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span>{user.displayName}</span>
                        <span className="text-xs text-muted-foreground">@{user.username}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/profile/${user.username}`} className="cursor-pointer">
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="cursor-pointer">
                        <SettingsIcon className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                      <LogOutIcon className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Log in</Button>
                  </DialogTrigger>
                  <LoginDialog />
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Sign up</Button>
                  </DialogTrigger>
                  <RegisterDialog />
                </Dialog>
              </div>
            )}
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <MenuIcon className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className={`block px-3 py-2 rounded-md text-base font-medium ${location === "/" ? "nav-link-active" : "nav-link"}`}>
              Repositories
            </Link>
            <Link href="/discover" className={`block px-3 py-2 rounded-md text-base font-medium ${location.startsWith("/discover") ? "nav-link-active" : "nav-link"}`}>
              Discover
            </Link>
            <Link href="/network" className={`block px-3 py-2 rounded-md text-base font-medium ${location === "/network" ? "nav-link-active" : "nav-link"}`}>
              Network
            </Link>
            <Link href="/docs" className={`block px-3 py-2 rounded-md text-base font-medium ${location === "/docs" ? "nav-link-active" : "nav-link"}`}>
              Documentation
            </Link>
            
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="mt-2">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search repositories..."
                  className="w-full pr-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <SearchIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

const LoginDialog = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const appContext = useContext(AppContext);
  const login = appContext?.login || (async () => ({ id: 0 } as any));
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(username, password);
      setLocation("/");
      toast({
        title: "Logged in",
        description: "You have successfully logged in.",
      });
    } catch (error) {
      console.error("Login failed:", error);
      toast({
        title: "Login failed",
        description: "Invalid username or password.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Log in to GitMesh</DialogTitle>
        <DialogDescription>
          Enter your username and password to access your account.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleLogin}>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Logging in..." : "Log in"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

const RegisterDialog = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const appContext = useContext(AppContext);
  const login = appContext?.login || (async () => ({ id: 0 } as any));
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log("Starting registration with:", { username, displayName });
      
      // Register the user
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          displayName,
        }),
      });
      
      // Get response details for better error handling
      const responseData = await response.json();
      
      if (!response.ok) {
        console.error("Registration response not OK:", response.status, responseData);
        throw new Error(responseData.message || "Registration failed");
      }
      
      console.log("Registration successful, logging in...");
      
      // Log in automatically after registration
      await login(username, password);
      setLocation("/");
      toast({
        title: "Account created",
        description: "Your account has been created and you're now logged in.",
      });
    } catch (error) {
      console.error("Registration failed:", error);
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An error occurred during registration.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create an account</DialogTitle>
        <DialogDescription>
          Join GitMesh to share and collaborate on repositories in a decentralized network.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleRegister}>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <label htmlFor="displayName" className="text-sm font-medium">
              Display Name
            </label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
            <p className="text-xs text-muted-foreground">
              Password must be at least 8 characters long.
            </p>
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default Header;
