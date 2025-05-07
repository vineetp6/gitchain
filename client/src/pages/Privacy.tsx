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
  EyeIcon,
  ServerIcon,
  RefreshCwIcon,
  UserIcon,
} from "lucide-react";

const Privacy = () => {
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
              <Link href="/privacy" className="flex items-center text-primary hover:underline">
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
            <div className="flex items-center mb-6">
              <LockIcon className="h-8 w-8 mr-3 text-primary" />
              <h1 className="text-3xl font-bold">Privacy Policy</h1>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Last updated: May 1, 2025
            </p>
            
            <ScrollArea className="h-[70vh]">
              <div className="space-y-6 pr-4">
                <section>
                  <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
                  <p className="text-muted-foreground mb-4">
                    GitMesh ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information about you 
                    when you use our website, services, and software (collectively, the "Service").
                  </p>
                  <p className="text-muted-foreground">
                    As a decentralized platform, GitMesh has some unique privacy aspects compared to traditional centralized services. 
                    We've designed this policy to be transparent about both the data we collect centrally and how information flows through the peer-to-peer network.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <div className="flex items-center mb-3">
                    <UserIcon className="h-6 w-6 mr-2 text-primary" />
                    <h2 className="text-xl font-semibold">2. Information We Collect</h2>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    2.1. <strong>Information You Provide:</strong>
                  </p>
                  <ul className="list-disc pl-8 mb-4 text-muted-foreground">
                    <li><strong>Account Information:</strong> When you create an account, we collect your username, email address, and password.</li>
                    <li><strong>Profile Information:</strong> You may choose to provide additional information such as your name, avatar, and bio.</li>
                    <li><strong>Repository Content:</strong> We store the Git repositories you create, including code, documentation, and other files.</li>
                    <li><strong>Communications:</strong> If you contact us directly, we may collect information you provide in your communications.</li>
                  </ul>
                  
                  <p className="text-muted-foreground mb-4">
                    2.2. <strong>Information Collected Automatically:</strong>
                  </p>
                  <ul className="list-disc pl-8 mb-4 text-muted-foreground">
                    <li><strong>Device Information:</strong> We collect information about the device you use to access the Service, including IP address, browser type, 
                    operating system, and device identifiers.</li>
                    <li><strong>Usage Information:</strong> We collect information about how you interact with the Service, such as the pages you visit, features you use, 
                    and actions you take.</li>
                    <li><strong>Network Information:</strong> To facilitate the peer-to-peer network, we collect network-related data such as connection information, 
                    bandwidth usage, and node statistics.</li>
                  </ul>
                  
                  <p className="text-muted-foreground mb-4">
                    2.3. <strong>Cryptographic Keys:</strong>
                  </p>
                  <p className="text-muted-foreground mb-4">
                    When you create an account, we generate a cryptographic key pair (public and private keys) for you. The public key is shared with other users 
                    to verify your identity and the authenticity of your commits. Your private key is stored securely on your device and is not transmitted to our servers.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <div className="flex items-center mb-3">
                    <EyeIcon className="h-6 w-6 mr-2 text-primary" />
                    <h2 className="text-xl font-semibold">3. How We Use Your Information</h2>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc pl-8 mb-4 text-muted-foreground">
                    <li>Provide, maintain, and improve the Service;</li>
                    <li>Create and maintain your account;</li>
                    <li>Process and complete transactions;</li>
                    <li>Facilitate the peer-to-peer distribution of repositories;</li>
                    <li>Send technical notices, updates, security alerts, and support messages;</li>
                    <li>Respond to your comments, questions, and requests;</li>
                    <li>Monitor and analyze trends, usage, and activities in connection with the Service;</li>
                    <li>Detect, prevent, and address technical issues;</li>
                    <li>Protect the security and integrity of the Service.</li>
                  </ul>
                </section>
                
                <Separator />
                
                <section>
                  <div className="flex items-center mb-3">
                    <ServerIcon className="h-6 w-6 mr-2 text-primary" />
                    <h2 className="text-xl font-semibold">4. Distributed Information</h2>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    GitMesh is a decentralized platform that utilizes peer-to-peer technology. This means that certain information is distributed across the network:
                  </p>
                  <ul className="list-disc pl-8 mb-4 text-muted-foreground">
                    <li><strong>Public Repositories:</strong> Public repositories and all associated metadata (commit history, contributor information, comments, issues) are 
                    distributed to multiple nodes in the network.</li>
                    <li><strong>User Profiles:</strong> Your public profile information, including username and public key, is distributed across the network.</li>
                    <li><strong>Network Data:</strong> Information about nodes, peer connections, and network health is shared throughout the network.</li>
                  </ul>
                  
                  <p className="text-muted-foreground mb-4">
                    Due to the nature of the distributed ledger, information stored on the network may persist even if you close your account or delete specific content.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <div className="flex items-center mb-3">
                    <ShieldIcon className="h-6 w-6 mr-2 text-primary" />
                    <h2 className="text-xl font-semibold">5. Private Repositories</h2>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    Private repositories are encrypted before being distributed through the network. Only users with appropriate permission can decrypt and access the content. 
                    While encrypted data may be stored on various nodes, the content remains confidential without the proper decryption keys.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    However, metadata about private repositories (such as repository names, creation dates, and collaborator information) may be visible to nodes in the network 
                    to facilitate basic functionality.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">6. Sharing Your Information</h2>
                  <p className="text-muted-foreground mb-4">
                    We may share your information in the following circumstances:
                  </p>
                  <ul className="list-disc pl-8 mb-4 text-muted-foreground">
                    <li><strong>With Your Consent:</strong> We may share information when you direct us to do so.</li>
                    <li><strong>Service Providers:</strong> We may share information with third-party vendors who provide services on our behalf, such as hosting, 
                    analytics, and customer support.</li>
                    <li><strong>For Legal Reasons:</strong> We may share information if required by law, regulation, legal process, or governmental request.</li>
                    <li><strong>To Protect Rights and Safety:</strong> We may share information to protect the rights, property, and safety of GitMesh, our users, 
                    and the public.</li>
                    <li><strong>Business Transfers:</strong> If GitMesh is involved in a merger, acquisition, or sale of assets, your information may be transferred as 
                    part of that transaction.</li>
                  </ul>
                  <p className="text-muted-foreground mb-4">
                    We do not sell your personal information to third parties.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">7. Data Security</h2>
                  <p className="text-muted-foreground mb-4">
                    We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and 
                    destruction. However, no security system is impenetrable, and we cannot guarantee the security of our systems.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    GitMesh employs cryptographic technologies to secure your data:
                  </p>
                  <ul className="list-disc pl-8 mb-4 text-muted-foreground">
                    <li>User authentication is secured through cryptographic signatures</li>
                    <li>Commits are cryptographically signed to verify authorship</li>
                    <li>Private repositories are encrypted with strong cryptographic algorithms</li>
                    <li>Communications between nodes are encrypted using TLS</li>
                  </ul>
                </section>
                
                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">8. Your Rights and Choices</h2>
                  <p className="text-muted-foreground mb-4">
                    Depending on your location, you may have certain rights regarding your personal information:
                  </p>
                  <ul className="list-disc pl-8 mb-4 text-muted-foreground">
                    <li><strong>Access:</strong> You can access much of your information by logging into your account.</li>
                    <li><strong>Update:</strong> You can update your account information through your account settings.</li>
                    <li><strong>Delete:</strong> You can delete your account at any time. However, due to the distributed nature of GitMesh, certain information may persist 
                    on the network.</li>
                    <li><strong>Object or Restrict:</strong> You may have the right to object to or restrict certain processing of your personal information.</li>
                    <li><strong>Data Portability:</strong> You may have the right to request a copy of your personal information in a structured, machine-readable format.</li>
                  </ul>
                  <p className="text-muted-foreground mb-4">
                    To exercise these rights, please contact us using the information in Section 12.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">9. Children's Privacy</h2>
                  <p className="text-muted-foreground mb-4">
                    The Service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. 
                    If you are a parent or guardian and believe we have collected information from your child, please contact us.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">10. International Data Transfers</h2>
                  <p className="text-muted-foreground mb-4">
                    GitMesh is a global service. Your information may be transferred to and processed in countries other than the country you reside in, where privacy laws 
                    may be different. By using the Service, you consent to the transfer of your information to countries outside your country of residence.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Furthermore, due to the decentralized nature of GitMesh, your data may be stored on nodes located in various jurisdictions around the world.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">11. Changes to This Policy</h2>
                  <p className="text-muted-foreground mb-4">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the 
                    "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">12. Contact Us</h2>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <p className="text-muted-foreground">
                    <Link href="/contact" className="text-primary hover:underline">
                      Contact Page
                    </Link>
                  </p>
                </section>
              </div>
            </ScrollArea>
            
            <div className="mt-8 flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/terms">
                  Terms of Service
                </Link>
              </Button>
              <Button asChild>
                <Link href="/network">
                  Network Status
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;