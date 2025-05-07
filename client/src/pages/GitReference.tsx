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
  GitCommitIcon,
  GitMergeIcon,
  GitPullRequestIcon,
} from "lucide-react";

const GitReference = () => {
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
              <Link href="/git-reference" className="flex items-center text-primary hover:underline">
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
            <h1 className="text-3xl font-bold mb-6">Git Command Reference</h1>
            
            <p className="text-muted-foreground mb-6">
              This reference guide covers common Git commands used with GitMesh, including some GitMesh-specific commands that extend Git functionality for decentralized workflows.
            </p>
            
            <ScrollArea className="h-[70vh]">
              <div className="space-y-8 pr-4">
                <section>
                  <div className="flex items-center mb-3">
                    <GitBranchIcon className="h-6 w-6 mr-2 text-primary" />
                    <h2 className="text-2xl font-bold">Setting Up</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Configure Git with Your Identity</h3>
                      <pre className="p-2 bg-black text-white text-sm rounded-md overflow-x-auto">
                        git config --global user.name "Your Name"
                        git config --global user.email "your.email@example.com"
                      </pre>
                      <p className="text-sm text-muted-foreground mt-2">
                        Sets your identity for all Git repositories on your machine. In GitMesh, this information is linked to your GitMesh account.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Initialize a New Repository</h3>
                      <pre className="p-2 bg-black text-white text-sm rounded-md overflow-x-auto">
                        git init
                      </pre>
                      <p className="text-sm text-muted-foreground mt-2">
                        Creates a new Git repository in the current directory.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Clone a Repository from GitMesh</h3>
                      <pre className="p-2 bg-black text-white text-sm rounded-md overflow-x-auto">
                        git clone gitmesh://username/repository
                      </pre>
                      <p className="text-sm text-muted-foreground mt-2">
                        Clones a repository from GitMesh using the GitMesh protocol.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Link an Existing Repository to GitMesh</h3>
                      <pre className="p-2 bg-black text-white text-sm rounded-md overflow-x-auto">
                        gitmesh init
                        gitmesh remote add origin username/repository
                      </pre>
                      <p className="text-sm text-muted-foreground mt-2">
                        Initializes GitMesh in an existing Git repository and links it to a remote repository on GitMesh.
                      </p>
                    </div>
                  </div>
                </section>
                
                <Separator />
                
                <section>
                  <div className="flex items-center mb-3">
                    <GitCommitIcon className="h-6 w-6 mr-2 text-primary" />
                    <h2 className="text-2xl font-bold">Basic Workflow</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Check Status</h3>
                      <pre className="p-2 bg-black text-white text-sm rounded-md overflow-x-auto">
                        git status
                      </pre>
                      <p className="text-sm text-muted-foreground mt-2">
                        Shows the status of changes as untracked, modified, or staged.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Add Files to Staging Area</h3>
                      <pre className="p-2 bg-black text-white text-sm rounded-md overflow-x-auto">
                        git add filename.js        # Add specific file
                        git add .                  # Add all changes
                      </pre>
                      <p className="text-sm text-muted-foreground mt-2">
                        Stages changes for the next commit.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Commit Changes</h3>
                      <pre className="p-2 bg-black text-white text-sm rounded-md overflow-x-auto">
                        git commit -m "Description of changes"
                      </pre>
                      <p className="text-sm text-muted-foreground mt-2">
                        Records changes to the repository. In GitMesh, commits are also cryptographically signed with your GitMesh private key.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Push Changes to GitMesh</h3>
                      <pre className="p-2 bg-black text-white text-sm rounded-md overflow-x-auto">
                        git push origin main
                      </pre>
                      <p className="text-sm text-muted-foreground mt-2">
                        Uploads your commits to the GitMesh network. In GitMesh, this also initiates the peer-to-peer distribution of your changes.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Pull Changes from GitMesh</h3>
                      <pre className="p-2 bg-black text-white text-sm rounded-md overflow-x-auto">
                        git pull origin main
                      </pre>
                      <p className="text-sm text-muted-foreground mt-2">
                        Downloads changes from the GitMesh network and integrates them into your local repository.
                      </p>
                    </div>
                  </div>
                </section>
                
                <Separator />
                
                <section>
                  <div className="flex items-center mb-3">
                    <GitBranchIcon className="h-6 w-6 mr-2 text-primary" />
                    <h2 className="text-2xl font-bold">Branching and Merging</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Create and Switch to a New Branch</h3>
                      <pre className="p-2 bg-black text-white text-sm rounded-md overflow-x-auto">
                        git checkout -b feature-branch
                      </pre>
                      <p className="text-sm text-muted-foreground mt-2">
                        Creates a new branch and switches to it.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">List All Branches</h3>
                      <pre className="p-2 bg-black text-white text-sm rounded-md overflow-x-auto">
                        git branch             # Local branches
                        git branch -r          # Remote branches
                        git branch -a          # All branches
                      </pre>
                      <p className="text-sm text-muted-foreground mt-2">
                        Shows the list of branches in your repository.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Switch to an Existing Branch</h3>
                      <pre className="p-2 bg-black text-white text-sm rounded-md overflow-x-auto">
                        git checkout branch-name
                      </pre>
                      <p className="text-sm text-muted-foreground mt-2">
                        Switches to the specified branch.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Merge a Branch</h3>
                      <pre className="p-2 bg-black text-white text-sm rounded-md overflow-x-auto">
                        git checkout main
                        git merge feature-branch
                      </pre>
                      <p className="text-sm text-muted-foreground mt-2">
                        Incorporates changes from feature-branch into main.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Delete a Branch</h3>
                      <pre className="p-2 bg-black text-white text-sm rounded-md overflow-x-auto">
                        git branch -d branch-name        # Safe delete (fails if branch has unmerged changes)
                        git branch -D branch-name        # Force delete
                      </pre>
                      <p className="text-sm text-muted-foreground mt-2">
                        Removes a branch from your local repository.
                      </p>
                    </div>
                  </div>
                </section>
                
                <Separator />
                
                <section>
                  <div className="flex items-center mb-3">
                    <GitPullRequestIcon className="h-6 w-6 mr-2 text-primary" />
                    <h2 className="text-2xl font-bold">Collaboration with GitMesh</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Fork a Repository on GitMesh</h3>
                      <pre className="p-2 bg-black text-white text-sm rounded-md overflow-x-auto">
                        gitmesh fork username/repository
                      </pre>
                      <p className="text-sm text-muted-foreground mt-2">
                        Creates a copy of a repository under your GitMesh account.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Add a Peer-to-Peer Remote</h3>
                      <pre className="p-2 bg-black text-white text-sm rounded-md overflow-x-auto">
                        gitmesh remote add peer-name peer-id
                      </pre>
                      <p className="text-sm text-muted-foreground mt-2">
                        Adds a direct peer-to-peer connection to another GitMesh user.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Create a Pull Request</h3>
                      <pre className="p-2 bg-black text-white text-sm rounded-md overflow-x-auto">
                        gitmesh pr create --base main --head feature-branch
                      </pre>
                      <p className="text-sm text-muted-foreground mt-2">
                        Creates a pull request to merge your changes into the original repository.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Review and Merge Pull Requests</h3>
                      <pre className="p-2 bg-black text-white text-sm rounded-md overflow-x-auto">
                        gitmesh pr list
                        gitmesh pr checkout 123
                        gitmesh pr merge 123
                      </pre>
                      <p className="text-sm text-muted-foreground mt-2">
                        List, check out, and merge pull requests from collaborators.
                      </p>
                    </div>
                  </div>
                </section>
                
                <Separator />
                
                <section>
                  <div className="flex items-center mb-3">
                    <GitMergeIcon className="h-6 w-6 mr-2 text-primary" />
                    <h2 className="text-2xl font-bold">Advanced Commands</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">View Commit History</h3>
                      <pre className="p-2 bg-black text-white text-sm rounded-md overflow-x-auto">
                        git log                     # Full history
                        git log --oneline           # Condensed history
                        git log --graph --oneline   # Graphical view
                      </pre>
                      <p className="text-sm text-muted-foreground mt-2">
                        Shows the commit history of your repository.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Verify Signatures in GitMesh</h3>
                      <pre className="p-2 bg-black text-white text-sm rounded-md overflow-x-auto">
                        gitmesh verify commit-hash
                      </pre>
                      <p className="text-sm text-muted-foreground mt-2">
                        Verifies the cryptographic signature of a commit using the author's public key from GitMesh.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Rebase Commits</h3>
                      <pre className="p-2 bg-black text-white text-sm rounded-md overflow-x-auto">
                        git rebase main feature-branch
                      </pre>
                      <p className="text-sm text-muted-foreground mt-2">
                        Reapplies commits from feature-branch on top of main.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Create and Apply Patches</h3>
                      <pre className="p-2 bg-black text-white text-sm rounded-md overflow-x-auto">
                        git format-patch main                 # Create patches for all commits not in main
                        git am /path/to/patch.patch           # Apply a patch
                      </pre>
                      <p className="text-sm text-muted-foreground mt-2">
                        Useful for sharing changes via email or other means outside of GitMesh.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </ScrollArea>
            
            <div className="mt-8 flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/api-reference">
                  API Reference
                </Link>
              </Button>
              <Button asChild>
                <Link href="/p2p-guide">
                  P2P Network Guide
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitReference;