import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
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
  MapPinIcon,
  MailIcon,
  SendIcon,
  GithubIcon,
  TwitterIcon,
  LinkedinIcon,
} from "lucide-react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message sent",
        description: "We've received your message and will respond soon.",
      });
      setName("");
      setEmail("");
      setCategory("");
      setMessage("");
      setIsLoading(false);
    }, 1500);
  };

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
              <Link href="/network" className="flex items-center text-muted-foreground hover:text-primary">
                <GlobeIcon className="h-4 w-4 mr-2" />
                Network Status
              </Link>
              <Link href="/contact" className="flex items-center text-primary hover:underline">
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
              <PhoneIcon className="h-8 w-8 mr-3 text-primary" />
              <h1 className="text-3xl font-bold">Contact Us</h1>
            </div>
            
            <p className="text-muted-foreground mb-8">
              Have questions or feedback about GitMesh? We'd love to hear from you. Fill out the form below or reach out through one of our channels.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="Your name" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="Your email address" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory} required>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="feedback">Product Feedback</SelectItem>
                        <SelectItem value="bug">Bug Report</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      value={message} 
                      onChange={(e) => setMessage(e.target.value)} 
                      placeholder="How can we help you?" 
                      className="min-h-32" 
                      required 
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <SendIcon className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Card>
              
              {/* Contact Info */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MailIcon className="h-5 w-5 mr-3 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-muted-foreground">support@gitmesh.example.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <GlobeIcon className="h-5 w-5 mr-3 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Website</h3>
                        <p className="text-muted-foreground">www.gitmesh.example.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPinIcon className="h-5 w-5 mr-3 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Distributed Headquarters</h3>
                        <p className="text-muted-foreground">GitMesh operates globally through our distributed team.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Community</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-md">
                      <div className="flex items-center">
                        <GithubIcon className="h-5 w-5 mr-3 text-primary" />
                        <span>GitHub</span>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href="https://github.com/gitmesh" target="_blank" rel="noopener noreferrer">
                          Follow
                        </a>
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-md">
                      <div className="flex items-center">
                        <TwitterIcon className="h-5 w-5 mr-3 text-primary" />
                        <span>Twitter</span>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href="https://twitter.com/gitmesh" target="_blank" rel="noopener noreferrer">
                          Follow
                        </a>
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-md">
                      <div className="flex items-center">
                        <LinkedinIcon className="h-5 w-5 mr-3 text-primary" />
                        <span>LinkedIn</span>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href="https://linkedin.com/company/gitmesh" target="_blank" rel="noopener noreferrer">
                          Connect
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-5 bg-primary/5 rounded-lg">
                  <h3 className="font-semibold mb-2">Support Hours</h3>
                  <p className="text-muted-foreground mb-2">
                    Our community support team is available Monday through Friday, 9am to 6pm UTC.
                  </p>
                  <p className="text-muted-foreground">
                    For critical issues, please include "URGENT" in your message subject.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/network">
                  Network Status
                </Link>
              </Button>
              <Button asChild>
                <Link href="/">
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;