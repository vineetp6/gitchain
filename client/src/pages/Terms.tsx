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
} from "lucide-react";

const Terms = () => {
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
              <Link href="/terms" className="flex items-center text-primary hover:underline">
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
            <div className="flex items-center mb-6">
              <FileTextIcon className="h-8 w-8 mr-3 text-primary" />
              <h1 className="text-3xl font-bold">Terms of Service</h1>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Last updated: May 1, 2025
            </p>
            
            <ScrollArea className="h-[70vh]">
              <div className="space-y-6 pr-4">
                <section>
                  <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
                  <p className="text-muted-foreground mb-4">
                    Welcome to GitMesh ("we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of the GitMesh platform, 
                    including our website, services, and software (collectively, the "Service"). By using GitMesh, you agree to these Terms. If you do not agree to these Terms, 
                    please do not use the Service.
                  </p>
                  <p className="text-muted-foreground">
                    GitMesh is a decentralized platform for Git repository hosting and collaboration. Unlike traditional centralized services, 
                    GitMesh operates on a peer-to-peer network where repositories are distributed across multiple nodes. 
                    These Terms are designed to account for this decentralized nature.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">2. Your Account</h2>
                  <p className="text-muted-foreground mb-4">
                    2.1. <strong>Account Creation.</strong> To use certain features of the Service, you may need to create an account. You agree to provide accurate, 
                    current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    2.2. <strong>Account Security.</strong> You are responsible for safeguarding your account credentials and for all activities that occur under your account. 
                    You agree to notify us immediately of any unauthorized use of your account. Due to the cryptographic nature of GitMesh, we may not be able to 
                    restore access to accounts with lost private keys or credentials.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    2.3. <strong>Age Requirement.</strong> You must be at least 13 years old to use the Service. If you are under 18, you represent that you have 
                    your parent or guardian's permission to use the Service.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">3. User Content</h2>
                  <p className="text-muted-foreground mb-4">
                    3.1. <strong>Ownership.</strong> You retain ownership of any content you submit, post, or display on or through the Service ("User Content"). 
                    By uploading User Content, you grant GitMesh a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, 
                    transmit, and distribute your User Content for the purpose of operating and providing the Service.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    3.2. <strong>Responsibility for User Content.</strong> You are solely responsible for your User Content and the consequences of sharing it. 
                    By uploading User Content, you represent and warrant that:
                  </p>
                  <ul className="list-disc pl-8 mb-4 text-muted-foreground">
                    <li>You own or have the necessary rights to share your User Content;</li>
                    <li>Your User Content does not violate the rights of any third party, including copyright, trademark, privacy, or other personal or proprietary rights;</li>
                    <li>Your User Content does not contain malicious code, such as viruses or malware;</li>
                    <li>Your User Content complies with these Terms and all applicable laws and regulations.</li>
                  </ul>
                  <p className="text-muted-foreground mb-4">
                    3.3. <strong>Decentralized Nature.</strong> Due to the distributed nature of GitMesh, User Content may be replicated across multiple nodes in the network. 
                    You understand that even if you delete User Content from your node, copies may remain on other nodes in the network.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">4. Acceptable Use</h2>
                  <p className="text-muted-foreground mb-4">
                    4.1. <strong>Compliance with Laws.</strong> You agree to use the Service in compliance with all applicable laws, regulations, and these Terms.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    4.2. <strong>Prohibited Conduct.</strong> You agree not to:
                  </p>
                  <ul className="list-disc pl-8 mb-4 text-muted-foreground">
                    <li>Use the Service for any illegal purpose or to violate any laws;</li>
                    <li>Post, upload, or distribute any content that is unlawful, defamatory, harassing, abusive, fraudulent, infringing, or otherwise objectionable;</li>
                    <li>Interfere with or disrupt the integrity or performance of the Service;</li>
                    <li>Attempt to gain unauthorized access to the Service or other accounts;</li>
                    <li>Use the Service to distribute malware, spyware, or other harmful code;</li>
                    <li>Use the Service to send unsolicited communications, promotions, or advertisements;</li>
                    <li>Scrape, crawl, or otherwise extract data from the Service except as permitted by our API terms;</li>
                    <li>Impersonate any person or entity or misrepresent your affiliation with a person or entity.</li>
                  </ul>
                  <p className="text-muted-foreground mb-4">
                    4.3. <strong>Network Resources.</strong> You agree to use network resources responsibly. This includes avoiding excessive bandwidth usage, 
                    storage consumption, or computational demands that could degrade the experience for other users.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">5. Intellectual Property</h2>
                  <p className="text-muted-foreground mb-4">
                    5.1. <strong>GitMesh Content.</strong> The Service and its original content, features, and functionality are owned by GitMesh and are protected by 
                    international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    5.2. <strong>Open Source.</strong> Certain components of GitMesh are open source and are subject to open source licenses. 
                    Nothing in these Terms prevents you from using, modifying, or distributing those components in accordance with their respective licenses.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    5.3. <strong>Feedback.</strong> If you provide us with any feedback or suggestions regarding the Service, you hereby assign to us all rights in such 
                    feedback and agree that we have the right to use such feedback for any purpose without restriction or compensation to you.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">6. Privacy</h2>
                  <p className="text-muted-foreground mb-4">
                    6.1. <strong>Privacy Policy.</strong> Our Privacy Policy describes how we handle the information you provide to us when you use the Service. 
                    You understand that by using the Service, you consent to the collection, use, and sharing of your information as set forth in the Privacy Policy.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    6.2. <strong>Decentralized Data.</strong> Due to the decentralized nature of GitMesh, information associated with your account and repositories may be 
                    distributed across multiple nodes in the network. This distribution is essential to the functioning of the platform.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">7. Third-Party Links and Services</h2>
                  <p className="text-muted-foreground mb-4">
                    7.1. <strong>Third-Party Links.</strong> The Service may contain links to third-party websites or services. These links are provided solely as a 
                    convenience to you and do not imply any endorsement or relationship with the linked site. We are not responsible for the content or practices of 
                    any third-party websites or services.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    7.2. <strong>Third-Party Integrations.</strong> You may choose to enable integrations with third-party services through the Service. 
                    By doing so, you grant us permission to share information with those third parties as necessary to provide the integration.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">8. Disclaimer of Warranties</h2>
                  <p className="text-muted-foreground mb-4">
                    THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, 
                    IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    GitMesh does not warrant that: (a) the Service will function uninterrupted, secure or available at any particular time or location; (b) any errors or 
                    defects will be corrected; (c) the Service is free of viruses or other harmful components; or (d) the results of using the Service will meet your requirements.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    You understand that, due to the distributed nature of the platform, we cannot guarantee the availability of your repositories or other content 
                    stored on the network.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">9. Limitation of Liability</h2>
                  <p className="text-muted-foreground mb-4">
                    TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL GITMESH, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES 
                    BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, 
                    GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM: (a) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE; (b) ANY CONDUCT OR 
                    CONTENT OF ANY THIRD PARTY ON THE SERVICE; (c) ANY CONTENT OBTAINED FROM THE SERVICE; AND (d) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR 
                    TRANSMISSIONS OR CONTENT, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE 
                    BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">10. Changes to Terms</h2>
                  <p className="text-muted-foreground mb-4">
                    We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on the Service, 
                    updating the "Last updated" date at the top of these Terms, or through other appropriate communication channels.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    By continuing to access or use the Service after those revisions become effective, you agree to be bound by the revised Terms. If you do not agree 
                    to the new Terms, please stop using the Service.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">11. Governing Law</h2>
                  <p className="text-muted-foreground mb-4">
                    These Terms shall be governed and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is 
                    held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
                  </p>
                </section>
                
                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">12. Contact Us</h2>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions about these Terms, please contact us at:
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
                <Link href="/crypto-basics">
                  Cryptography Basics
                </Link>
              </Button>
              <Button asChild>
                <Link href="/privacy">
                  Privacy Policy
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;