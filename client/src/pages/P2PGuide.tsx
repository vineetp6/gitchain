import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
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
  WifiIcon,
  ServerIcon,
  RefreshCwIcon,
  DatabaseIcon,
} from "lucide-react";

const P2PGuide = () => {
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
              <Link href="/p2p-guide" className="flex items-center text-primary hover:underline">
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
            <h1 className="text-3xl font-bold mb-6">P2P Network Guide</h1>
            
            <ScrollArea className="h-[70vh]">
              <div className="space-y-8 pr-4">
                <section>
                  <div className="flex items-center mb-3">
                    <NetworkIcon className="h-6 w-6 mr-2 text-primary" />
                    <h2 className="text-2xl font-bold">Understanding Peer-to-Peer Networks</h2>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    Peer-to-peer (P2P) networks are distributed systems where participants (peers) share resources directly with each other without requiring a central server. 
                    GitMesh leverages P2P technology to create a decentralized alternative to traditional Git hosting platforms.
                  </p>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-lg">
                    <h3 className="font-semibold mb-3">Key Benefits of P2P Networks</h3>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      <li><strong>Resilience:</strong> No single point of failure means the network continues to function even if some nodes go offline</li>
                      <li><strong>Censorship Resistance:</strong> Data is stored across multiple nodes, making it difficult to censor or remove content</li>
                      <li><strong>Reduced Infrastructure Costs:</strong> Resources are shared among peers rather than requiring large central servers</li>
                      <li><strong>Scalability:</strong> Network capacity grows as more peers join, with each new peer adding resources</li>
                      <li><strong>Ownership:</strong> Users maintain direct control over their data</li>
                    </ul>
                  </div>
                </section>
                
                <Separator />
                
                <section>
                  <div className="flex items-center mb-3">
                    <WifiIcon className="h-6 w-6 mr-2 text-primary" />
                    <h2 className="text-2xl font-bold">GitMesh P2P Architecture</h2>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    GitMesh is built on a hybrid P2P architecture that combines the reliability of distributed hash tables (DHT) with direct peer connections for efficient data transfer.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Peer Discovery</h3>
                      <p className="text-sm text-muted-foreground">
                        GitMesh uses several mechanisms to help peers find each other:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mt-2">
                        <li><strong>Bootstrap Nodes:</strong> Well-known servers that help new peers join the network</li>
                        <li><strong>Distributed Hash Table (DHT):</strong> A decentralized key-value store that maps repository IDs to peer addresses</li>
                        <li><strong>Local Network Discovery:</strong> Automatic discovery of peers on the same local network</li>
                        <li><strong>Peer Exchange (PEX):</strong> Peers share their known peers with each other</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Data Storage and Replication</h3>
                      <p className="text-sm text-muted-foreground">
                        GitMesh distributes repository data across multiple peers:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mt-2">
                        <li><strong>Content-Addressable Storage:</strong> Data is addressed by its cryptographic hash, ensuring integrity</li>
                        <li><strong>Intelligent Replication:</strong> Popular repositories are automatically replicated to more peers</li>
                        <li><strong>Selective Replication:</strong> Users can choose which repositories to store locally</li>
                        <li><strong>Pinning:</strong> Critical repositories can be "pinned" to ensure they're always available</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Network Connectivity</h3>
                      <p className="text-sm text-muted-foreground">
                        GitMesh employs several techniques to establish connections between peers:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mt-2">
                        <li><strong>WebRTC:</strong> Browser-based peer-to-peer communication</li>
                        <li><strong>STUN/TURN:</strong> NAT traversal to connect peers behind firewalls</li>
                        <li><strong>Relay Nodes:</strong> Help facilitate connections when direct peer-to-peer communication isn't possible</li>
                        <li><strong>Persistent Connections:</strong> Long-lived connections to frequently accessed peers</li>
                      </ul>
                    </div>
                  </div>
                </section>
                
                <Separator />
                
                <section>
                  <div className="flex items-center mb-3">
                    <ServerIcon className="h-6 w-6 mr-2 text-primary" />
                    <h2 className="text-2xl font-bold">Running a GitMesh Node</h2>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    By running a GitMesh node, you contribute to the network's resilience and help distribute the repositories you care about.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Setting Up a Node</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Basic setup of a GitMesh node:
                      </p>
                      <ol className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>Install the GitMesh CLI: <code>npm install -g gitmesh-cli</code></li>
                        <li>Initialize your node: <code>gitmesh init</code></li>
                        <li>Start your node: <code>gitmesh node start</code></li>
                      </ol>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Node Configuration</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Key configuration options for your GitMesh node:
                      </p>
                      <pre className="p-2 bg-black text-white text-sm rounded-md overflow-x-auto">
{`# ~/.gitmesh/config.json
{
  "storage": {
    "path": "/path/to/storage",
    "maxSize": "10GB"
  },
  "network": {
    "port": 4001,
    "bootstrapNodes": [
      "/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeY",
      "/ip4/104.236.176.52/tcp/4001/p2p/QmSoLnSGccFuZQJz"
    ],
    "enableRelay": true,
    "enableDHT": true
  },
  "replication": {
    "minPeers": 3,
    "maxPeers": 10
  }
}`}
                      </pre>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Running a Dedicated Node</h3>
                      <p className="text-sm text-muted-foreground">
                        For optimal contribution to the network, consider running a dedicated GitMesh node on a server with high uptime:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mt-2">
                        <li>Create a systemd service for automatic startup</li>
                        <li>Allocate adequate storage space (recommended: at least 20GB)</li>
                        <li>Ensure good network connectivity (recommended: at least 10Mbps upload)</li>
                        <li>Set up monitoring to ensure node health</li>
                        <li>Consider running a node with public IP for better network connectivity</li>
                      </ul>
                    </div>
                  </div>
                </section>
                
                <Separator />
                
                <section>
                  <div className="flex items-center mb-3">
                    <DatabaseIcon className="h-6 w-6 mr-2 text-primary" />
                    <h2 className="text-2xl font-bold">Repository Distribution</h2>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    GitMesh distributes repository data across the network to ensure availability and redundancy.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Content Addressing</h3>
                      <p className="text-sm text-muted-foreground">
                        All Git objects (commits, trees, blobs) are stored using content-addressable storage, where the object's hash serves as its identifier. This ensures:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mt-2">
                        <li>Data integrity (content cannot be modified without changing its identifier)</li>
                        <li>Deduplication (identical objects are stored only once across the network)</li>
                        <li>Efficient synchronization (peers can verify which objects they need to exchange)</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Repository Subscriptions</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Peers can subscribe to repositories they want to help distribute:
                      </p>
                      <pre className="p-2 bg-black text-white text-sm rounded-md overflow-x-auto">
                        gitmesh repo subscribe username/repository
                      </pre>
                      <p className="text-sm text-muted-foreground mt-2">
                        This commands tells your node to maintain a complete copy of the repository and help distribute it to other peers, even when you're not actively working with it.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Private Repositories</h3>
                      <p className="text-sm text-muted-foreground">
                        For private repositories, GitMesh uses encrypted distribution:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mt-2">
                        <li>Repository data is encrypted with a symmetric key</li>
                        <li>The symmetric key is encrypted with each authorized user's public key</li>
                        <li>Encrypted data can be distributed through the same P2P network</li>
                        <li>Only authorized users with the proper private key can decrypt the repository contents</li>
                        <li>Peers can help distribute private repositories without being able to read their contents</li>
                      </ul>
                    </div>
                  </div>
                </section>
                
                <Separator />
                
                <section>
                  <div className="flex items-center mb-3">
                    <RefreshCwIcon className="h-6 w-6 mr-2 text-primary" />
                    <h2 className="text-2xl font-bold">Network Synchronization</h2>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    GitMesh ensures repositories stay in sync across the distributed network.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Pub/Sub for Real-time Updates</h3>
                      <p className="text-sm text-muted-foreground">
                        GitMesh uses a publish-subscribe system to notify peers about repository changes:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mt-2">
                        <li>When you push changes, your node publishes an update to the topic <code>repo:username/repository</code></li>
                        <li>Peers subscribed to this repository receive the notification</li>
                        <li>Upon notification, peers request the new objects from the network</li>
                        <li>Updates propagate across the network in near real-time</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Conflict Resolution</h3>
                      <p className="text-sm text-muted-foreground">
                        In a distributed network, conflicts can occur when changes are made concurrently. GitMesh handles conflicts using:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mt-2">
                        <li>Git's built-in merge mechanisms</li>
                        <li>Cryptographic signatures to verify change authorship</li>
                        <li>Timestamp verification to establish sequence</li>
                        <li>Consensus algorithms for repository references (branches, tags)</li>
                      </ul>
                    </div>
                  </div>
                </section>
                
                <section>
                  <div className="bg-primary/5 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3">Getting Involved</h3>
                    <p className="text-muted-foreground mb-4">
                      The GitMesh network grows stronger with each participant. Here's how you can contribute:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      <li><strong>Run a Node:</strong> Dedicate resources to the network by running a GitMesh node</li>
                      <li><strong>Share Repositories:</strong> Make your repositories available to others</li>
                      <li><strong>Subscribe to Projects:</strong> Help distribute projects you care about</li>
                      <li><strong>Develop GitMesh:</strong> Contribute to the GitMesh open source project</li>
                      <li><strong>Spread the Word:</strong> Tell others about decentralized collaboration with GitMesh</li>
                    </ul>
                    <div className="mt-4">
                      <Button asChild>
                        <Link href="/docs">
                          Learn More in the Documentation
                        </Link>
                      </Button>
                    </div>
                  </div>
                </section>
              </div>
            </ScrollArea>
            
            <div className="mt-8 flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/git-reference">
                  Git Command Reference
                </Link>
              </Button>
              <Button asChild>
                <Link href="/crypto-basics">
                  Cryptography Basics
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default P2PGuide;