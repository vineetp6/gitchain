import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import {
  GitBranchIcon,
  BookIcon,
  CodeIcon,
  NetworkIcon,
  ShieldIcon,
  FileTextIcon,
  LockIcon,
  GlobeIcon,
  PhoneIcon,
} from "lucide-react";

const Documentation = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-lg mb-3">Resources</h3>
            <nav className="space-y-2">
              <Link href="/docs" className="flex items-center text-primary hover:underline">
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
            <h1 className="text-3xl font-bold mb-6">Documentation</h1>
            
            <Tabs defaultValue="getting-started">
              <TabsList className="mb-4">
                <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
                <TabsTrigger value="concepts">Core Concepts</TabsTrigger>
                <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>
              
              <TabsContent value="getting-started">
                <ScrollArea className="h-[60vh]">
                  <div className="space-y-6 pr-4">
                    <section>
                      <h2 className="text-2xl font-bold mb-3">Introduction to GitMesh</h2>
                      <p className="text-muted-foreground mb-4">
                        GitMesh is a decentralized alternative to GitHub that enables Git workflows without central servers while ensuring data integrity through cryptographic verification.
                      </p>
                      <p className="text-muted-foreground mb-4">
                        Unlike traditional Git hosting platforms, GitMesh operates on a peer-to-peer network where repositories are distributed across multiple nodes, providing resilience, censorship resistance, and eliminating single points of failure.
                      </p>
                    </section>
                    
                    <Separator />
                    
                    <section>
                      <h2 className="text-2xl font-bold mb-3">Creating Your First Repository</h2>
                      <p className="text-muted-foreground mb-4">
                        To get started with GitMesh, you'll need to create a repository that will be shared across the network.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                          <h3 className="font-semibold mb-2">Step 1: Create a GitMesh Account</h3>
                          <p className="text-sm text-muted-foreground">
                            Sign up for GitMesh using the registration form. Your account will be associated with a cryptographic key pair that secures your identity on the network.
                          </p>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                          <h3 className="font-semibold mb-2">Step 2: Create a New Repository</h3>
                          <p className="text-sm text-muted-foreground">
                            Click on the "New Repository" button from your dashboard and fill in the repository details.
                          </p>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                          <h3 className="font-semibold mb-2">Step 3: Clone the Repository</h3>
                          <p className="text-sm text-muted-foreground">
                            After creating your repository, you can clone it to your local machine using the GitMesh CLI:
                          </p>
                          <pre className="mt-2 p-2 bg-black text-white text-sm rounded-md overflow-x-auto">
                            gitmesh clone username/repository
                          </pre>
                        </div>
                      </div>
                    </section>
                    
                    <Separator />
                    
                    <section>
                      <h2 className="text-2xl font-bold mb-3">Working with Peers</h2>
                      <p className="text-muted-foreground mb-4">
                        One of the core features of GitMesh is its peer-to-peer nature. Here's how to connect and collaborate with peers:
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                          <h3 className="font-semibold mb-2">Connecting to Peers</h3>
                          <p className="text-sm text-muted-foreground">
                            GitMesh automatically discovers peers on the network, but you can also manually connect to specific peers:
                          </p>
                          <pre className="mt-2 p-2 bg-black text-white text-sm rounded-md overflow-x-auto">
                            gitmesh peer connect &lt;peer-id&gt;
                          </pre>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                          <h3 className="font-semibold mb-2">Sharing Repositories</h3>
                          <p className="text-sm text-muted-foreground">
                            Share your repositories with specific peers:
                          </p>
                          <pre className="mt-2 p-2 bg-black text-white text-sm rounded-md overflow-x-auto">
                            gitmesh repo share &lt;repo-name&gt; --peer &lt;peer-id&gt;
                          </pre>
                        </div>
                      </div>
                    </section>
                    
                    <Separator />
                    
                    <section>
                      <h2 className="text-2xl font-bold mb-3">Next Steps</h2>
                      <p className="text-muted-foreground mb-4">
                        Now that you're familiar with the basics, explore these additional resources:
                      </p>
                      
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li><Link href="/api-reference" className="text-primary hover:underline">API Reference</Link> - Learn about the GitMesh API</li>
                        <li><Link href="/git-reference" className="text-primary hover:underline">Git Command Reference</Link> - Common Git commands used with GitMesh</li>
                        <li><Link href="/p2p-guide" className="text-primary hover:underline">P2P Network Guide</Link> - Understand the peer-to-peer architecture</li>
                        <li><Link href="/crypto-basics" className="text-primary hover:underline">Cryptography Basics</Link> - Learn about the cryptographic principles used in GitMesh</li>
                      </ul>
                    </section>
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="concepts">
                <ScrollArea className="h-[60vh]">
                  <div className="space-y-6 pr-4">
                    <section>
                      <h2 className="text-2xl font-bold mb-3">Decentralized Architecture</h2>
                      <p className="text-muted-foreground mb-4">
                        GitMesh's architecture is built on the principles of decentralization, ensuring that no single entity controls the network or has the power to censor content.
                      </p>
                      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                        <h3 className="font-semibold mb-2">Key Components</h3>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                          <li><strong>Peer Nodes:</strong> Individual participants in the GitMesh network</li>
                          <li><strong>Distributed Hash Table (DHT):</strong> System for locating resources across the network</li>
                          <li><strong>Content-Addressable Storage:</strong> Method for storing and retrieving data based on its content</li>
                          <li><strong>Cryptographic Identity:</strong> Public/private key pairs that secure user identity and access</li>
                        </ul>
                      </div>
                    </section>
                    
                    <Separator />
                    
                    <section>
                      <h2 className="text-2xl font-bold mb-3">Cryptographic Verification</h2>
                      <p className="text-muted-foreground mb-4">
                        Every commit, merge, and change in GitMesh is cryptographically signed, ensuring data integrity and authenticity.
                      </p>
                      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                        <h3 className="font-semibold mb-2">How It Works</h3>
                        <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
                          <li>When you create an account, GitMesh generates a cryptographic key pair</li>
                          <li>Your public key is shared with the network, while your private key remains secure on your device</li>
                          <li>All actions you perform are signed with your private key</li>
                          <li>Other peers can verify the authenticity of your actions using your public key</li>
                        </ol>
                      </div>
                    </section>
                    
                    <Separator />
                    
                    <section>
                      <h2 className="text-2xl font-bold mb-3">Mesh Network</h2>
                      <p className="text-muted-foreground mb-4">
                        GitMesh creates a resilient mesh network that continues to function even if parts of the network become unavailable.
                      </p>
                      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                        <h3 className="font-semibold mb-2">Benefits of the Mesh Network</h3>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                          <li><strong>Resilience:</strong> No single point of failure</li>
                          <li><strong>Geographic Distribution:</strong> Data is replicated across multiple regions</li>
                          <li><strong>Censorship Resistance:</strong> Content remains available even if some nodes are blocked</li>
                          <li><strong>Scalability:</strong> Network capacity increases with each new node</li>
                        </ul>
                      </div>
                    </section>
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="tutorials">
                <ScrollArea className="h-[60vh]">
                  <div className="space-y-6 pr-4">
                    <section>
                      <h2 className="text-2xl font-bold mb-3">Setting Up a GitMesh Node</h2>
                      <p className="text-muted-foreground mb-4">
                        Learn how to set up and configure your own GitMesh node to contribute to the network.
                      </p>
                      <div className="space-y-4">
                        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                          <h3 className="font-semibold mb-2">Prerequisites</h3>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                            <li>Git installed on your system</li>
                            <li>Node.js 14 or higher</li>
                            <li>At least 1GB of available storage</li>
                          </ul>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                          <h3 className="font-semibold mb-2">Installation Steps</h3>
                          <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
                            <li>
                              Install the GitMesh CLI:
                              <pre className="mt-1 p-2 bg-black text-white text-sm rounded-md overflow-x-auto">
                                npm install -g gitmesh-cli
                              </pre>
                            </li>
                            <li>
                              Initialize your node:
                              <pre className="mt-1 p-2 bg-black text-white text-sm rounded-md overflow-x-auto">
                                gitmesh init
                              </pre>
                            </li>
                            <li>
                              Start your node:
                              <pre className="mt-1 p-2 bg-black text-white text-sm rounded-md overflow-x-auto">
                                gitmesh node start
                              </pre>
                            </li>
                          </ol>
                        </div>
                      </div>
                    </section>
                    
                    <Separator />
                    
                    <section>
                      <h2 className="text-2xl font-bold mb-3">Collaborating on a Project</h2>
                      <p className="text-muted-foreground mb-4">
                        Learn how to collaborate effectively with others on GitMesh.
                      </p>
                      <div className="space-y-4">
                        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                          <h3 className="font-semibold mb-2">Forking a Repository</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Forking creates a copy of a repository under your account:
                          </p>
                          <pre className="p-2 bg-black text-white text-sm rounded-md overflow-x-auto">
                            gitmesh fork username/repository
                          </pre>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                          <h3 className="font-semibold mb-2">Creating a Pull Request</h3>
                          <ol className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground">
                            <li>Make your changes and commit them</li>
                            <li>Push your changes to your fork</li>
                            <li>Navigate to the original repository on the GitMesh web interface</li>
                            <li>Click "New Pull Request" and select your fork as the source</li>
                            <li>Fill in the details and submit</li>
                          </ol>
                        </div>
                      </div>
                    </section>
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="faq">
                <ScrollArea className="h-[60vh]">
                  <div className="space-y-6 pr-4">
                    <section>
                      <h2 className="text-2xl font-bold mb-3">Frequently Asked Questions</h2>
                      
                      <div className="space-y-4">
                        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                          <h3 className="font-semibold mb-2">How is GitMesh different from GitHub or GitLab?</h3>
                          <p className="text-sm text-muted-foreground">
                            GitMesh is decentralized, meaning there's no central server or company controlling your repositories. Your code is distributed across a network of peers, providing greater resilience and freedom from corporate control.
                          </p>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                          <h3 className="font-semibold mb-2">Is my code private on GitMesh?</h3>
                          <p className="text-sm text-muted-foreground">
                            GitMesh supports both public and private repositories. Private repositories are encrypted and only shared with peers you explicitly authorize.
                          </p>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                          <h3 className="font-semibold mb-2">What happens if my computer goes offline?</h3>
                          <p className="text-sm text-muted-foreground">
                            Your repositories are replicated across multiple peers in the network, so they remain available even when your computer is offline. However, for optimal availability, we recommend running a GitMesh node on a server with high uptime.
                          </p>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                          <h3 className="font-semibold mb-2">Can I use standard Git commands with GitMesh?</h3>
                          <p className="text-sm text-muted-foreground">
                            Yes, GitMesh is fully compatible with standard Git commands. You can use your favorite Git client to interact with GitMesh repositories.
                          </p>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                          <h3 className="font-semibold mb-2">How do I backup my GitMesh identity?</h3>
                          <p className="text-sm text-muted-foreground">
                            Your GitMesh identity is tied to your cryptographic keys. You can export your keys for backup using:
                            <pre className="mt-1 p-2 bg-black text-white text-sm rounded-md overflow-x-auto">
                              gitmesh identity export --file backup.key
                            </pre>
                            Keep this file secure as it contains your private key.
                          </p>
                        </div>
                      </div>
                    </section>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
            
            <div className="mt-8 flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/">
                  Back to Home
                </Link>
              </Button>
              <Button asChild>
                <Link href="/api-reference">
                  API Reference
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;