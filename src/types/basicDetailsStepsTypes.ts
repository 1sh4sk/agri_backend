import { LucideIcon } from "lucide-react"; // If using lucide-react icons

// Define individual tab type
interface SubTab {
  id: string;
  label: string;
}

// Define step type with specific icon type
interface Step {
  id: string;
  label: string;
  icon: React.ComponentType<any> | LucideIcon; // More specific icon type
  subTabs?: SubTab[];
}

// Define the steps array type
type Steps = Step[];

// Props interface
export interface StepTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  completedTabs?: string[];
  steps?: Steps;
}
