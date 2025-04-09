
import { useState } from 'react';
import { Menu, History, Home, User, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggleSwitch } from '@/components/ThemeToggleSwitch';

interface DashboardHeaderProps {
  toggleSidebar: () => void;
}

const DashboardHeader = ({ toggleSidebar }: DashboardHeaderProps) => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-30 transition-colors duration-200">
      <div className="container max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle history sidebar"
          >
            <History size={20} className="text-gray-700 dark:text-gray-300" />
          </button>
          
          <Link to="/" className="group flex items-center">
            <div className="mr-2 text-primary text-3xl font-bold transition-transform duration-300 group-hover:scale-110">Y</div>
            <h1 className="font-display text-xl font-bold tracking-tight">
              <span className="text-youlearn-blue">You</span>
              <span className="dark:text-white">Learn</span>
            </h1>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/dashboard" className="px-3 py-2 text-sm font-medium rounded-md text-youlearn-blue dark:text-youlearn-blue">
            Dashboard
          </Link>
          <Link to="/" className="px-3 py-2 text-sm font-medium rounded-md text-youlearn-dark dark:text-gray-300 hover:text-youlearn-blue dark:hover:text-youlearn-blue">
            Home
          </Link>
        </nav>
        
        <div className="flex items-center gap-3">
          {/* Theme Toggle Switch */}
          <ThemeToggleSwitch />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 p-0 overflow-hidden border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-youlearn-blue transition-all duration-300">
                <Avatar className="h-full w-full">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback className="bg-youlearn-blue text-white">YL</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 dark:bg-gray-800 dark:border-gray-700">
              <DropdownMenuLabel className="dark:text-white">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="dark:border-gray-700" />
              <DropdownMenuItem className="dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="dark:border-gray-700" />
              <DropdownMenuItem className="dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
