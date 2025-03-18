
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 glass shadow-subtle' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="#" className="group flex items-center">
            <div className="mr-2 text-primary text-3xl font-bold transition-transform duration-300 group-hover:scale-110">Y</div>
            <h1 className="font-display text-xl md:text-2xl font-bold tracking-tight">
              <span className="text-youlearn-blue">You</span>Learn
            </h1>
          </a>
          <p className="hidden md:block ml-4 text-youlearn-gray text-sm font-light">Turn YouTube into Your Learning Hub</p>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink href="#" isActive>Home</NavLink>
          <NavLink href="#features">Features</NavLink>
          <div className="ml-4 flex items-center space-x-3">
            <Button variant="outline" size="sm" className="font-medium">
              Log In
            </Button>
            <Button size="sm" className="font-medium bg-youlearn-blue hover:bg-youlearn-lightBlue">
              Sign Up
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center text-gray-700 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass border-t border-gray-100 shadow-subtle">
          <div className="container max-w-7xl mx-auto py-4 px-4 flex flex-col space-y-3">
            <a href="#" className="px-4 py-2 rounded hover:bg-white/80 text-youlearn-dark font-medium">Home</a>
            <a href="#features" className="px-4 py-2 rounded hover:bg-white/80 text-youlearn-dark font-medium">Features</a>
            <a href="#signup" className="px-4 py-2 rounded hover:bg-white/80 text-youlearn-dark font-medium">Sign Up</a>
            <a href="#login" className="px-4 py-2 rounded hover:bg-white/80 text-youlearn-dark font-medium">Log In</a>
          </div>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ href, children, isActive = false }: { href: string; children: React.ReactNode; isActive?: boolean }) => (
  <a 
    href={href}
    className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
      isActive 
        ? 'text-youlearn-blue' 
        : 'text-youlearn-dark hover:text-youlearn-blue'
    }`}
  >
    {children}
  </a>
);

export default Header;
