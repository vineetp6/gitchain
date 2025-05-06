import { useLocation, Link } from "wouter";
import { Card } from "@/components/ui/card";
import {
  FolderIcon,
  StarIcon,
  GitPullRequestIcon,
  AlertCircleIcon,
  UsersIcon,
  HistoryIcon,
} from "lucide-react";

type NavigationPanelProps = {
  className?: string;
};

const NavigationPanel = ({ className = "" }: NavigationPanelProps) => {
  const [location] = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  const navigationItems = [
    {
      name: "My Repositories",
      path: "/",
      icon: <FolderIcon className="mr-3 h-4 w-4" />,
    },
    {
      name: "Starred Repositories",
      path: "/starred",
      icon: <StarIcon className="mr-3 h-4 w-4" />,
    },
    {
      name: "Pull Requests",
      path: "/pulls",
      icon: <GitPullRequestIcon className="mr-3 h-4 w-4" />,
    },
    {
      name: "Issues",
      path: "/issues",
      icon: <AlertCircleIcon className="mr-3 h-4 w-4" />,
    },
    {
      name: "Collaborations",
      path: "/collaborations",
      icon: <UsersIcon className="mr-3 h-4 w-4" />,
    },
    {
      name: "Activity Log",
      path: "/activity",
      icon: <HistoryIcon className="mr-3 h-4 w-4" />,
    },
  ];

  return (
    <Card className={`overflow-hidden ${className}`}>
      <div className="p-4 font-medium text-foreground border-b border-border">
        Quick Navigation
      </div>
      <nav className="p-2">
        {navigationItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <a
              className={`flex items-center px-3 py-2 text-sm rounded-md mt-1 ${
                isActive(item.path)
                  ? "bg-primary bg-opacity-10 text-primary"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </a>
          </Link>
        ))}
      </nav>
    </Card>
  );
};

export default NavigationPanel;
