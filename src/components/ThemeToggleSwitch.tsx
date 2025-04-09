import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export function ThemeToggleSwitch() {
  const { theme, toggleTheme } = useTheme();
  const [isChecked, setIsChecked] = useState(theme === 'dark');
  
  // Keep switch state in sync with theme
  useEffect(() => {
    setIsChecked(theme === 'dark');
  }, [theme]);

  const handleToggle = () => {
    toggleTheme();
    setIsChecked(!isChecked);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Sun size={16} className={`transition-opacity ${theme === 'light' ? 'text-yellow-500' : 'text-gray-400 opacity-50'}`} />
          
          <Switch 
            checked={isChecked} 
            onCheckedChange={handleToggle}
            className="data-[state=checked]:bg-youlearn-blue"
          />
          
          <Moon size={16} className={`transition-opacity ${theme === 'dark' ? 'text-blue-400' : 'text-gray-400 opacity-50'}`} />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Toggle {theme === 'light' ? 'dark' : 'light'} mode</p>
      </TooltipContent>
    </Tooltip>
  );
}
