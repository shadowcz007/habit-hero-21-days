
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

const ProgressBar = ({ current, total, className }: ProgressBarProps) => {
  const percentage = Math.min(Math.round((current / total) * 100), 100);
  
  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>第 {current} 天</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-habit-purple to-habit-dark-purple"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-500">0</span>
        <span className="text-xs text-gray-500">21</span>
      </div>
    </div>
  );
};

export default ProgressBar;
