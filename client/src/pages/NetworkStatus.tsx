import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import {
  BookIcon,
  CodeIcon,
  GitBranchIcon,
  NetworkIcon,
  ShieldIcon,
  FileTextIcon,
  LockIcon,
  GlobeIcon,
  PhoneIcon,
  UsersIcon,
  ServerIcon,
  DatabaseIcon,
  ClockIcon,
  WifiIcon,
  AreaChartIcon,
  RefreshCwIcon,
} from "lucide-react";

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const NetworkStatus = () => {
  const { data: networkStats, isLoading: statsLoading } = useQuery({
    queryKey: ['/api/network/stats'],
    queryFn: async () => {
      const res = await fetch('/api/network/stats');
      return res.json();
    },
  });
  
  const { data: peers, isLoading: peersLoading } = useQuery({
    queryKey: ['/api/peers'],
    queryFn: async () => {
      const res = await fetch('/api/peers');
      return res.json();
    },
  });
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-lg mb-3">Resources</h3>
            <nav className="space-y-2">
              <Link href="/docs" className="flex items-center text-muted-foreground hover:text-primary">
                <BookIcon className="h-4 w-4 mr-2" />
                Documentation
              </Link>
              <Link href="/api-reference" className="flex items-center text-muted-foreground hover:text-primary">
                <CodeIcon className="h-4 w-4 mr-2" />
                API Reference
              </Link>
              <Link href="/git-reference" className="flex items-center text-muted-foreground hover:text-primary">
                <GitBranchIcon className="h-4 w-4 mr-2" />
                Git Command Reference
              </Link>
              <Link href="/p2p-guide" className="flex items-center text-muted-foreground hover:text-primary">
                <NetworkIcon className="h-4 w-4 mr-2" />
                P2P Network Guide
              </Link>
              <Link href="/crypto-basics" className="flex items-center text-muted-foreground hover:text-primary">
                <ShieldIcon className="h-4 w-4 mr-2" />
                Cryptography Basics
              </Link>
            </nav>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-lg mb-3">About</h3>
            <nav className="space-y-2">
              <Link href="/terms" className="flex items-center text-muted-foreground hover:text-primary">
                <FileTextIcon className="h-4 w-4 mr-2" />
                Terms of Service
              </Link>
              <Link href="/privacy" className="flex items-center text-muted-foreground hover:text-primary">
                <LockIcon className="h-4 w-4 mr-2" />
                Privacy Policy
              </Link>
              <Link href="/network" className="flex items-center text-primary hover:underline">
                <GlobeIcon className="h-4 w-4 mr-2" />
                Network Status
              </Link>
              <Link href="/contact" className="flex items-center text-muted-foreground hover:text-primary">
                <PhoneIcon className="h-4 w-4 mr-2" />
                Contact
              </Link>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <GlobeIcon className="h-8 w-8 mr-3 text-primary" />
                <h1 className="text-3xl font-bold">Network Status</h1>
              </div>
              <Button size="sm" variant="outline" className="flex items-center gap-2">
                <RefreshCwIcon className="h-4 w-4" />
                Refresh
              </Button>
            </div>
            
            {(statsLoading || peersLoading) ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Network Overview */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Network Overview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center">
                          <UsersIcon className="h-5 w-5 mr-2 text-primary" />
                          <span className="text-2xl font-bold">{networkStats?.totalUsers || '0'}</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Active Peers</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center">
                          <ServerIcon className="h-5 w-5 mr-2 text-primary" />
                          <span className="text-2xl font-bold">{networkStats?.activePeers || '0'}</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Repositories</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center">
                          <GitBranchIcon className="h-5 w-5 mr-2 text-primary" />
                          <span className="text-2xl font-bold">{networkStats?.totalRepositories || '0'}</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Shared Data</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center">
                          <DatabaseIcon className="h-5 w-5 mr-2 text-primary" />
                          <span className="text-2xl font-bold">{formatBytes(Number(networkStats?.totalSharedData || 0))}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <Separator />
                
                {/* Network Health */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Network Health</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Storage Utilization</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Used Storage</span>
                              <span className="font-medium">{formatBytes(Number(networkStats?.totalSharedData || 0))}</span>
                            </div>
                            <Progress value={35} className="h-2" />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Network Redundancy</span>
                              <span className="font-medium">3.2x</span>
                            </div>
                            <Progress value={64} className="h-2" />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Repository Distribution</span>
                              <span className="font-medium">78%</span>
                            </div>
                            <Progress value={78} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Network Statistics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <WifiIcon className="h-5 w-5 mr-2 text-primary" />
                              <span className="text-muted-foreground">Connection Success Rate</span>
                            </div>
                            <span className="font-medium">98.2%</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <ClockIcon className="h-5 w-5 mr-2 text-primary" />
                              <span className="text-muted-foreground">Average Response Time</span>
                            </div>
                            <span className="font-medium">237ms</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <AreaChartIcon className="h-5 w-5 mr-2 text-primary" />
                              <span className="text-muted-foreground">Network Growth (7 days)</span>
                            </div>
                            <span className="font-medium text-green-500">+12.4%</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <DatabaseIcon className="h-5 w-5 mr-2 text-primary" />
                              <span className="text-muted-foreground">Data Transfer (24h)</span>
                            </div>
                            <span className="font-medium">248.3 GB</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <Separator />
                
                {/* Active Nodes */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Active Nodes</h2>
                  <Card>
                    <CardContent className="p-0">
                      <ScrollArea className="h-[300px]">
                        <div className="p-4">
                          <table className="w-full">
                            <thead>
                              <tr className="text-left border-b">
                                <th className="pb-3 text-muted-foreground font-medium">Node ID</th>
                                <th className="pb-3 text-muted-foreground font-medium">Location</th>
                                <th className="pb-3 text-muted-foreground font-medium">Last Seen</th>
                                <th className="pb-3 text-muted-foreground font-medium">Version</th>
                              </tr>
                            </thead>
                            <tbody>
                              {peers && peers.length > 0 ? (
                                peers.map((peer: any) => (
                                  <tr key={peer.id} className="border-b last:border-0">
                                    <td className="py-3 text-sm font-mono truncate max-w-[150px]">{peer.peerId}</td>
                                    <td className="py-3 text-sm">
                                      {peer.metadata?.location || 'Unknown'}
                                    </td>
                                    <td className="py-3 text-sm">
                                      {new Date(peer.lastSeen).toLocaleString()}
                                    </td>
                                    <td className="py-3 text-sm">
                                      {peer.metadata?.version || 'Unknown'}
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={4} className="py-3 text-center text-muted-foreground">
                                    No active peers found
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>
                
                <Separator />
                
                {/* Connection Guide */}
                <div className="bg-primary/5 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Join the Network</h3>
                  <p className="text-muted-foreground mb-4">
                    Want to contribute to the GitMesh network? Running a node helps distribute repositories and 
                    improves the network's resilience and performance.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild>
                      <Link href="/p2p-guide">
                        Node Setup Guide
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/docs">
                        Network Documentation
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-8 flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/privacy">
                  Privacy Policy
                </Link>
              </Button>
              <Button asChild>
                <Link href="/contact">
                  Contact
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkStatus;