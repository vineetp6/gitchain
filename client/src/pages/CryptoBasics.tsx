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
  KeyIcon,
  FileDigitIcon,
  CheckCircleIcon,
  EyeOffIcon,
} from "lucide-react";

const CryptoBasics = () => {
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
              <Link href="/crypto-basics" className="flex items-center text-primary hover:underline">
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
            <h1 className="text-3xl font-bold mb-6">Cryptography Basics</h1>
            
            <p className="text-muted-foreground mb-6">
              Cryptography is fundamental to GitMesh's security model. This guide explains the cryptographic principles that ensure data integrity, authentication, and privacy in a decentralized environment.
            </p>
            
            <ScrollArea className="h-[70vh]">
              <div className="space-y-8 pr-4">
                <section>
                  <div className="flex items-center mb-3">
                    <KeyIcon className="h-6 w-6 mr-2 text-primary" />
                    <h2 className="text-2xl font-bold">Public Key Cryptography</h2>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    At the heart of GitMesh's security is public key cryptography (also known as asymmetric cryptography). Each user has a key pair:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2 flex items-center">
                        <LockIcon className="h-4 w-4 mr-2 text-primary" />
                        Private Key
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>Kept secret and known only to you</li>
                        <li>Used to sign your commits and changes</li>
                        <li>Used to decrypt data that was encrypted with your public key</li>
                        <li>Never shared with other users or the network</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2 flex items-center">
                        <KeyIcon className="h-4 w-4 mr-2 text-primary" />
                        Public Key
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>Shared openly with everyone on the network</li>
                        <li>Used to verify signatures you create</li>
                        <li>Used to encrypt data that only you can decrypt</li>
                        <li>Linked to your GitMesh identity</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                    <h3 className="font-semibold mb-2">How Public Key Cryptography Works</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Public key cryptography relies on mathematical operations that are:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      <li><strong>Easy to compute in one direction:</strong> It's easy to create a signature using your private key</li>
                      <li><strong>Computationally infeasible to reverse:</strong> It's practically impossible to derive the private key from the public key</li>
                      <li><strong>Verifiable:</strong> Anyone with your public key can verify your signature</li>
                    </ul>
                  </div>
                </section>
                
                <Separator />
                
                <section>
                  <div className="flex items-center mb-3">
                    <FileDigitIcon className="h-6 w-6 mr-2 text-primary" />
                    <h2 className="text-2xl font-bold">Digital Signatures</h2>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    Digital signatures are used in GitMesh to verify the authenticity and integrity of commits, ensuring that changes to repositories are legitimate.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Signing Process</h3>
                      <ol className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>A cryptographic hash (SHA-256) of the commit data is generated</li>
                        <li>The hash is encrypted using the author's private key to create the signature</li>
                        <li>The signature is attached to the commit</li>
                      </ol>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Verification Process</h3>
                      <ol className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>The verifier calculates the hash of the commit data</li>
                        <li>The signature is decrypted using the author's public key</li>
                        <li>If the decrypted signature matches the calculated hash, the signature is valid</li>
                      </ol>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">What Digital Signatures Ensure</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li><strong>Authentication:</strong> Confirms that the commit was created by the owner of the private key</li>
                        <li><strong>Integrity:</strong> Proves that the commit hasn't been altered since it was signed</li>
                        <li><strong>Non-repudiation:</strong> The author cannot deny creating the commit</li>
                      </ul>
                    </div>
                  </div>
                </section>
                
                <Separator />
                
                <section>
                  <div className="flex items-center mb-3">
                    <CheckCircleIcon className="h-6 w-6 mr-2 text-primary" />
                    <h2 className="text-2xl font-bold">Content Integrity</h2>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    GitMesh ensures the integrity of all repository data through content-addressable storage and cryptographic hashing.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Cryptographic Hashing</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        GitMesh uses SHA-256 hash functions which have the following properties:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li><strong>Deterministic:</strong> The same input always produces the same hash</li>
                        <li><strong>Fast to compute:</strong> Generating a hash is quick and efficient</li>
                        <li><strong>Pre-image resistant:</strong> It's infeasible to derive the original data from just the hash</li>
                        <li><strong>Collision resistant:</strong> It's extremely unlikely that two different inputs produce the same hash</li>
                        <li><strong>Avalanche effect:</strong> A small change in input causes a large change in the hash</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Content-Addressable Storage</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        In GitMesh, objects are stored and retrieved based on their content hash:
                      </p>
                      <ol className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>When you add a file to a repository, a hash of its content is calculated</li>
                        <li>The file is stored with the hash as its identifier</li>
                        <li>When retrieving the file, the hash is recalculated to verify integrity</li>
                        <li>If a file is corrupted, the hash won't match and GitMesh will retrieve a valid copy from another peer</li>
                      </ol>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Merkle Trees</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        GitMesh uses Merkle trees (like Git) to efficiently verify the integrity of large datasets:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>Files are hashed individually (leaf nodes)</li>
                        <li>Hashes are paired and hashed again, creating parent nodes</li>
                        <li>This process continues until a single root hash is created</li>
                        <li>The root hash represents the entire repository state</li>
                        <li>Changes to any file result in a different root hash</li>
                      </ul>
                    </div>
                  </div>
                </section>
                
                <Separator />
                
                <section>
                  <div className="flex items-center mb-3">
                    <EyeOffIcon className="h-6 w-6 mr-2 text-primary" />
                    <h2 className="text-2xl font-bold">Privacy and Encryption</h2>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    GitMesh provides privacy for sensitive repositories through end-to-end encryption.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Private Repository Encryption</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Private repositories are encrypted using a hybrid approach:
                      </p>
                      <ol className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>A random symmetric key is generated for the repository</li>
                        <li>Repository data is encrypted using this symmetric key</li>
                        <li>The symmetric key is encrypted with each collaborator's public key</li>
                        <li>Each collaborator can decrypt the symmetric key using their private key</li>
                        <li>The encrypted data can be distributed through the P2P network</li>
                      </ol>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Access Control</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Access to private repositories is controlled through:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li><strong>Key-based access:</strong> Only users with the proper private key can decrypt the repository</li>
                        <li><strong>Permission management:</strong> Repository owners can grant and revoke access by adding or removing encrypted keys</li>
                        <li><strong>Key rotation:</strong> Repository keys can be rotated periodically for enhanced security</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Transport Security</h3>
                      <p className="text-sm text-muted-foreground">
                        Beyond repository encryption, GitMesh secures all peer-to-peer communications:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mt-2">
                        <li>Connections between peers are encrypted using TLS (Transport Layer Security)</li>
                        <li>Peer identities are verified through their public keys</li>
                        <li>Session keys are negotiated for each connection</li>
                        <li>Forward secrecy ensures past communications remain secure even if a private key is compromised</li>
                      </ul>
                    </div>
                  </div>
                </section>
                
                <Separator />
                
                <section>
                  <div className="bg-primary/5 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3">Security Best Practices</h3>
                    <p className="text-muted-foreground mb-4">
                      To maximize the security benefits of GitMesh's cryptographic features:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      <li><strong>Protect your private key:</strong> Never share it with anyone and keep secure backups</li>
                      <li><strong>Use strong passwords:</strong> Protect your GitMesh account with a strong, unique password</li>
                      <li><strong>Enable two-factor authentication:</strong> Add an extra layer of security to your account</li>
                      <li><strong>Verify signatures:</strong> Always check that commits are properly signed by trusted collaborators</li>
                      <li><strong>Keep your software updated:</strong> Ensure you're using the latest version of GitMesh with security fixes</li>
                      <li><strong>Review access permissions:</strong> Regularly audit who has access to your repositories</li>
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
                <Link href="/p2p-guide">
                  P2P Network Guide
                </Link>
              </Button>
              <Button asChild>
                <Link href="/terms">
                  Terms of Service
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoBasics;