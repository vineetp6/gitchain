import { GitBranchIcon, GithubIcon, TwitterIcon, GitPullRequestIcon } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

const Footer = () => {
  // Fetch network stats
  const { data: networkStats, isLoading } = useQuery({
    queryKey: ["/api/network/stats"],
    staleTime: 300000, // 5 minutes
  });

  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <GitBranchIcon className="text-primary text-2xl mr-2" />
              <span className="text-xl font-semibold text-white">GitMesh</span>
            </div>
            <p className="text-sm mb-4">
              A decentralized alternative to GitHub that works without central servers, supports Git workflows, and ensures data integrity.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <GithubIcon className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <GitPullRequestIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/docs" className="hover:text-white">Documentation</Link></li>
              <li><Link href="/docs/api" className="hover:text-white">API Reference</Link></li>
              <li><Link href="/docs/git" className="hover:text-white">Git Command Reference</Link></li>
              <li><Link href="/docs/p2p" className="hover:text-white">P2P Network Guide</Link></li>
              <li><Link href="/docs/crypto" className="hover:text-white">Cryptography Basics</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Network Status</h3>
            <div className="bg-gray-800 rounded-lg p-4">
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full bg-gray-700" />
                  <Skeleton className="h-4 w-full bg-gray-700" />
                  <Skeleton className="h-4 w-full bg-gray-700" />
                  <Skeleton className="h-4 w-full bg-gray-700" />
                </div>
              ) : networkStats ? (
                <>
                  <div className="flex items-center mb-3">
                    <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2 pulse"></span>
                    <span className="text-sm">Network is healthy</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Active Nodes:</span>
                    <span className="text-white">{networkStats.activePeers}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Total Repositories:</span>
                    <span className="text-white">{networkStats.totalRepositories}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Total Users:</span>
                    <span className="text-white">{networkStats.totalUsers}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Network Storage:</span>
                    <span className="text-white">{(networkStats.totalStorage / (1024 * 1024 * 1024)).toFixed(2)} GB</span>
                  </div>
                </>
              ) : (
                <div className="text-center text-sm py-2">
                  Unable to fetch network stats
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">© {new Date().getFullYear()} GitMesh. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6 text-sm">
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
