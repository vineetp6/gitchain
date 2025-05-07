import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
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
} from "lucide-react";

const ApiReference = () => {
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
              <Link href="/api-reference" className="flex items-center text-primary hover:underline">
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
              <Link href="/network" className="flex items-center text-muted-foreground hover:text-primary">
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
            <h1 className="text-3xl font-bold mb-6">API Reference</h1>
            
            <Tabs defaultValue="auth">
              <TabsList className="mb-4">
                <TabsTrigger value="auth">Authentication</TabsTrigger>
                <TabsTrigger value="repositories">Repositories</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="network">Network</TabsTrigger>
              </TabsList>
              
              <TabsContent value="auth">
                <ScrollArea className="h-[60vh]">
                  <div className="space-y-6 pr-4">
                    <section>
                      <h2 className="text-2xl font-bold mb-3">Authentication</h2>
                      <p className="text-muted-foreground mb-4">
                        GitMesh API uses session-based authentication. All authenticated API requests should include the user's session cookie.
                      </p>
                    </section>
                    
                    <Separator />
                    
                    <section>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-semibold">Register a New User</h3>
                        <Badge variant="outline" className="text-blue-500 border-blue-500">POST</Badge>
                      </div>
                      
                      <pre className="p-2 bg-gray-50 dark:bg-gray-900 rounded-md mb-3 text-sm">POST /api/auth/register</pre>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-1">Request Body</h4>
                          <pre className="p-2 bg-gray-50 dark:bg-gray-900 rounded-md text-sm">
{`{
  "username": "string",     // Required: Unique username
  "password": "string",     // Required: Password (min 8 characters)
  "displayName": "string"   // Required: User's display name
}`}
                          </pre>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-1">Response (201 Created)</h4>
                          <pre className="p-2 bg-gray-50 dark:bg-gray-900 rounded-md text-sm">
{`{
  "id": 1,
  "username": "example_user",
  "displayName": "Example User",
  "publicKey": "string",
  "avatarUrl": null,
  "storageUsed": 0,
  "storageLimit": 2000000000,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}`}
                          </pre>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-1">Errors</h4>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <Badge className="mr-2">400</Badge>
                              <span className="text-sm text-muted-foreground">Bad Request - Invalid input data</span>
                            </div>
                            <div className="flex items-center">
                              <Badge className="mr-2">409</Badge>
                              <span className="text-sm text-muted-foreground">Conflict - Username already exists</span>
                            </div>
                            <div className="flex items-center">
                              <Badge className="mr-2">500</Badge>
                              <span className="text-sm text-muted-foreground">Internal Server Error</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    
                    <Separator />
                    
                    <section>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-semibold">Log In</h3>
                        <Badge variant="outline" className="text-blue-500 border-blue-500">POST</Badge>
                      </div>
                      
                      <pre className="p-2 bg-gray-50 dark:bg-gray-900 rounded-md mb-3 text-sm">POST /api/auth/login</pre>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-1">Request Body</h4>
                          <pre className="p-2 bg-gray-50 dark:bg-gray-900 rounded-md text-sm">
{`{
  "username": "string",     // Required: Username
  "password": "string"      // Required: Password
}`}
                          </pre>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-1">Response (200 OK)</h4>
                          <pre className="p-2 bg-gray-50 dark:bg-gray-900 rounded-md text-sm">
{`{
  "id": 1,
  "username": "example_user",
  "displayName": "Example User",
  "publicKey": "string",
  "avatarUrl": null,
  "storageUsed": 0,
  "storageLimit": 2000000000,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}`}
                          </pre>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-1">Errors</h4>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <Badge className="mr-2">401</Badge>
                              <span className="text-sm text-muted-foreground">Unauthorized - Invalid credentials</span>
                            </div>
                            <div className="flex items-center">
                              <Badge className="mr-2">500</Badge>
                              <span className="text-sm text-muted-foreground">Internal Server Error</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    
                    <Separator />
                    
                    <section>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-semibold">Log Out</h3>
                        <Badge variant="outline" className="text-blue-500 border-blue-500">POST</Badge>
                      </div>
                      
                      <pre className="p-2 bg-gray-50 dark:bg-gray-900 rounded-md mb-3 text-sm">POST /api/auth/logout</pre>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-1">Response (200 OK)</h4>
                          <pre className="p-2 bg-gray-50 dark:bg-gray-900 rounded-md text-sm">
{`{
  "message": "Logged out successfully"
}`}
                          </pre>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-1">Errors</h4>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <Badge className="mr-2">500</Badge>
                              <span className="text-sm text-muted-foreground">Internal Server Error</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    
                    <Separator />
                    
                    <section>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-semibold">Get Current Session</h3>
                        <Badge variant="outline" className="text-green-500 border-green-500">GET</Badge>
                      </div>
                      
                      <pre className="p-2 bg-gray-50 dark:bg-gray-900 rounded-md mb-3 text-sm">GET /api/auth/session</pre>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-1">Response (200 OK)</h4>
                          <pre className="p-2 bg-gray-50 dark:bg-gray-900 rounded-md text-sm">
{`{
  "id": 1,
  "username": "example_user",
  "displayName": "Example User",
  "publicKey": "string",
  "avatarUrl": null,
  "storageUsed": 0,
  "storageLimit": 2000000000,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}`}
                          </pre>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-1">Errors</h4>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <Badge className="mr-2">401</Badge>
                              <span className="text-sm text-muted-foreground">Unauthorized - Not authenticated</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="repositories">
                <ScrollArea className="h-[60vh]">
                  <div className="space-y-6 pr-4">
                    <section>
                      <h2 className="text-2xl font-bold mb-3">Repositories</h2>
                      <p className="text-muted-foreground mb-4">
                        API endpoints for working with GitMesh repositories, including creating, updating, and managing repositories.
                      </p>
                    </section>
                    
                    <Separator />
                    
                    <section>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-semibold">List Repositories</h3>
                        <Badge variant="outline" className="text-green-500 border-green-500">GET</Badge>
                      </div>
                      
                      <pre className="p-2 bg-gray-50 dark:bg-gray-900 rounded-md mb-3 text-sm">GET /api/repositories</pre>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-1">Query Parameters</h4>
                          <div className="space-y-2">
                            <div className="flex items-start">
                              <span className="font-mono text-xs min-w-[100px] pt-1">search</span>
                              <div>
                                <span className="text-sm text-muted-foreground">Optional search query to filter repositories</span>
                                <div className="text-xs text-muted-foreground">Example: ?search=react</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-1">Response (200 OK)</h4>
                          <pre className="p-2 bg-gray-50 dark:bg-gray-900 rounded-md text-sm">
{`[
  {
    "id": 1,
    "name": "project-name",
    "description": "Project description",
    "isPublic": true,
    "isVerified": false,
    "ownerId": 1,
    "language": "JavaScript",
    "stars": 0,
    "forks": 0,
    "branches": 1,
    "commits": 5,
    "localPath": "/repos/1_1641034800000",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z",
    "owner": {
      "id": 1,
      "username": "example_user",
      "displayName": "Example User",
      "avatarUrl": null
    }
  }
]`}
                          </pre>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-1">Notes</h4>
                          <p className="text-sm text-muted-foreground">
                            If the user is authenticated, this endpoint returns both public repositories and the user's private repositories. 
                            If not authenticated, only public repositories are returned.
                          </p>
                        </div>
                      </div>
                    </section>
                    
                    <Separator />
                    
                    <section>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-semibold">Create Repository</h3>
                        <Badge variant="outline" className="text-blue-500 border-blue-500">POST</Badge>
                      </div>
                      
                      <pre className="p-2 bg-gray-50 dark:bg-gray-900 rounded-md mb-3 text-sm">POST /api/repositories</pre>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-1">Request Body</h4>
                          <pre className="p-2 bg-gray-50 dark:bg-gray-900 rounded-md text-sm">
{`{
  "name": "string",           // Required: Repository name
  "description": "string",    // Optional: Repository description
  "isPublic": true,           // Optional: Is the repository public? (default: true)
  "language": "string"        // Optional: Primary language of the repository
}`}
                          </pre>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-1">Response (201 Created)</h4>
                          <pre className="p-2 bg-gray-50 dark:bg-gray-900 rounded-md text-sm">
{`{
  "id": 1,
  "name": "project-name",
  "description": "Project description",
  "isPublic": true,
  "isVerified": false,
  "ownerId": 1,
  "language": "JavaScript",
  "stars": 0,
  "forks": 0,
  "branches": 0,
  "commits": 0,
  "localPath": "/repos/1_1641034800000",
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}`}
                          </pre>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-1">Authentication</h4>
                          <p className="text-sm text-muted-foreground">
                            Requires authentication: <Badge variant="outline">Required</Badge>
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-1">Errors</h4>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <Badge className="mr-2">400</Badge>
                              <span className="text-sm text-muted-foreground">Bad Request - Invalid input data</span>
                            </div>
                            <div className="flex items-center">
                              <Badge className="mr-2">401</Badge>
                              <span className="text-sm text-muted-foreground">Unauthorized - Authentication required</span>
                            </div>
                            <div className="flex items-center">
                              <Badge className="mr-2">500</Badge>
                              <span className="text-sm text-muted-foreground">Internal Server Error</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="users">
                <ScrollArea className="h-[60vh]">
                  <div className="space-y-6 pr-4">
                    <section>
                      <h2 className="text-2xl font-bold mb-3">Users</h2>
                      <p className="text-muted-foreground mb-4">
                        API endpoints for working with GitMesh user accounts and profiles.
                      </p>
                    </section>
                    
                    <Separator />
                    
                    <section>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-semibold">Get Current User</h3>
                        <Badge variant="outline" className="text-green-500 border-green-500">GET</Badge>
                      </div>
                      
                      <pre className="p-2 bg-gray-50 dark:bg-gray-900 rounded-md mb-3 text-sm">GET /api/users/current</pre>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-1">Response (200 OK)</h4>
                          <pre className="p-2 bg-gray-50 dark:bg-gray-900 rounded-md text-sm">
{`{
  "id": 1,
  "username": "example_user",
  "displayName": "Example User",
  "publicKey": "string",
  "avatarUrl": null,
  "storageUsed": 0,
  "storageLimit": 2000000000,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}`}
                          </pre>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-1">Authentication</h4>
                          <p className="text-sm text-muted-foreground">
                            Requires authentication: <Badge variant="outline">Required</Badge>
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-1">Errors</h4>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <Badge className="mr-2">401</Badge>
                              <span className="text-sm text-muted-foreground">Unauthorized - Authentication required</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    
                    <Separator />
                    
                    <section>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-semibold">Get User by ID</h3>
                        <Badge variant="outline" className="text-green-500 border-green-500">GET</Badge>
                      </div>
                      
                      <pre className="p-2 bg-gray-50 dark:bg-gray-900 rounded-md mb-3 text-sm">GET /api/users/:id</pre>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-1">Path Parameters</h4>
                          <div className="space-y-2">
                            <div className="flex items-start">
                              <span className="font-mono text-xs min-w-[100px] pt-1">id</span>
                              <div>
                                <span className="text-sm text-muted-foreground">User ID (integer)</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-1">Response (200 OK)</h4>
                          <pre className="p-2 bg-gray-50 dark:bg-gray-900 rounded-md text-sm">
{`{
  "id": 1,
  "username": "example_user",
  "displayName": "Example User",
  "publicKey": "string",
  "avatarUrl": null,
  "storageUsed": 0,
  "storageLimit": 2000000000,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}`}
                          </pre>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-1">Errors</h4>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <Badge className="mr-2">404</Badge>
                              <span className="text-sm text-muted-foreground">Not Found - User not found</span>
                            </div>
                            <div className="flex items-center">
                              <Badge className="mr-2">500</Badge>
                              <span className="text-sm text-muted-foreground">Internal Server Error</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="network">
                <ScrollArea className="h-[60vh]">
                  <div className="space-y-6 pr-4">
                    <section>
                      <h2 className="text-2xl font-bold mb-3">Network</h2>
                      <p className="text-muted-foreground mb-4">
                        API endpoints for working with the GitMesh peer-to-peer network.
                      </p>
                    </section>
                    
                    <Separator />
                    
                    <section>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-semibold">Get Network Statistics</h3>
                        <Badge variant="outline" className="text-green-500 border-green-500">GET</Badge>
                      </div>
                      
                      <pre className="p-2 bg-gray-50 dark:bg-gray-900 rounded-md mb-3 text-sm">GET /api/network/stats</pre>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-1">Response (200 OK)</h4>
                          <pre className="p-2 bg-gray-50 dark:bg-gray-900 rounded-md text-sm">
{`{
  "totalUsers": "25",
  "totalRepositories": "57",
  "totalSharedData": "1250000000",  // In bytes
  "activePeers": "12"
}`}
                          </pre>
                        </div>
                      </div>
                    </section>
                    
                    <Separator />
                    
                    <section>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-semibold">Get Active Peers</h3>
                        <Badge variant="outline" className="text-green-500 border-green-500">GET</Badge>
                      </div>
                      
                      <pre className="p-2 bg-gray-50 dark:bg-gray-900 rounded-md mb-3 text-sm">GET /api/peers</pre>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-1">Response (200 OK)</h4>
                          <pre className="p-2 bg-gray-50 dark:bg-gray-900 rounded-md text-sm">
{`[
  {
    "id": 1,
    "peerId": "QmPeerid1",
    "lastSeen": "2025-01-01T00:00:00.000Z",
    "metadata": {
      "name": "peer-node-1",
      "version": "1.0.0",
      "location": "US-East"
    },
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
]`}
                          </pre>
                        </div>
                      </div>
                    </section>
                    
                    <Separator />
                    
                    <section>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-semibold">Share Repository with Peer</h3>
                        <Badge variant="outline" className="text-blue-500 border-blue-500">POST</Badge>
                      </div>
                      
                      <pre className="p-2 bg-gray-50 dark:bg-gray-900 rounded-md mb-3 text-sm">POST /api/repositories/:id/share</pre>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-1">Path Parameters</h4>
                          <div className="space-y-2">
                            <div className="flex items-start">
                              <span className="font-mono text-xs min-w-[100px] pt-1">id</span>
                              <div>
                                <span className="text-sm text-muted-foreground">Repository ID (integer)</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-1">Request Body</h4>
                          <pre className="p-2 bg-gray-50 dark:bg-gray-900 rounded-md text-sm">
{`{
  "peerId": "string"  // Required: ID of the peer to share with
}`}
                          </pre>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-1">Response (201 Created)</h4>
                          <pre className="p-2 bg-gray-50 dark:bg-gray-900 rounded-md text-sm">
{`{
  "id": 1,
  "repositoryId": 1,
  "peerId": "QmPeerid1",
  "sharedAt": "2025-01-01T00:00:00.000Z"
}`}
                          </pre>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-1">Authentication</h4>
                          <p className="text-sm text-muted-foreground">
                            Requires authentication: <Badge variant="outline">Required</Badge>
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-1">Errors</h4>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <Badge className="mr-2">400</Badge>
                              <span className="text-sm text-muted-foreground">Bad Request - Invalid input data</span>
                            </div>
                            <div className="flex items-center">
                              <Badge className="mr-2">401</Badge>
                              <span className="text-sm text-muted-foreground">Unauthorized - Authentication required</span>
                            </div>
                            <div className="flex items-center">
                              <Badge className="mr-2">404</Badge>
                              <span className="text-sm text-muted-foreground">Not Found - Repository or peer not found</span>
                            </div>
                            <div className="flex items-center">
                              <Badge className="mr-2">500</Badge>
                              <span className="text-sm text-muted-foreground">Internal Server Error</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
            
            <div className="mt-8 flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/docs">
                  Documentation
                </Link>
              </Button>
              <Button asChild>
                <Link href="/git-reference">
                  Git Command Reference
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiReference;