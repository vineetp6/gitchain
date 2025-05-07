import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Repository from "@/pages/Repository";
import Discover from "@/pages/Discover";
import Profile from "@/pages/Profile";
import Documentation from "@/pages/Documentation";
import ApiReference from "@/pages/ApiReference";
import GitReference from "@/pages/GitReference";
import P2PGuide from "@/pages/P2PGuide";
import CryptoBasics from "@/pages/CryptoBasics";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import NetworkStatus from "@/pages/NetworkStatus";
import Contact from "@/pages/Contact";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { apiRequest } from "./lib/queryClient";

// User type definition
export type User = {
  id: number;
  username: string;
  displayName: string;
  publicKey: string;
  avatarUrl?: string;
  storageUsed: number;
  storageLimit: number;
  createdAt: string;
  updatedAt: string;
};

export type AppContextType = {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  refetchUser: () => Promise<void>;
};

// Create a context to share the user state
import { createContext } from "react";
export const AppContext = createContext<AppContextType | null>(null);

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/repository/:id" component={Repository} />
      <Route path="/discover" component={Discover} />
      <Route path="/profile/:username" component={Profile} />
      
      {/* Documentation pages */}
      <Route path="/docs" component={Documentation} />
      <Route path="/api-reference" component={ApiReference} />
      <Route path="/git-reference" component={GitReference} />
      <Route path="/p2p-guide" component={P2PGuide} />
      <Route path="/crypto-basics" component={CryptoBasics} />
      
      {/* About pages */}
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/network" component={NetworkStatus} />
      <Route path="/contact" component={Contact} />
      
      {/* 404 page - must be last */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch("/api/auth/session");
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error("Failed to fetch user session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const login = async (username: string, password: string): Promise<User> => {
    const response = await apiRequest("POST", "/api/auth/login", { username, password });
    const userData = await response.json();
    setUser(userData);
    return userData;
  };

  const logout = async (): Promise<void> => {
    await apiRequest("POST", "/api/auth/logout");
    setUser(null);
  };

  const refetchUser = async (): Promise<void> => {
    await fetchCurrentUser();
  };

  const appContext: AppContextType = {
    user,
    isLoading,
    login,
    logout,
    refetchUser,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={appContext}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="flex-grow">
            <Router />
          </div>
          <Footer />
        </div>
        <Toaster />
      </AppContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
