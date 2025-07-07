
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Search, LogIn, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from '@/components/auth/LoginModal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-2xl gradient-text">PricePeeker</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:flex">
            <Button variant="ghost" size="icon" className="text-foreground/80">
              <Search className="h-5 w-5" />
            </Button>
          </div>
          
          <ThemeToggle />
          
          {user ? (
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border border-primary/10">
                  {user.picture ? (
                    <AvatarImage src={user.picture} alt={user.name} />
                  ) : (
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  )}
                </Avatar>
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button 
              className="hidden md:flex items-center gap-1" 
              onClick={() => setLoginModalOpen(true)}
              size="sm"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Button>
          )}
          
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden py-4 px-4 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/icons" 
              className="text-sm font-medium px-2 py-2 hover:bg-accent rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Icons
            </Link>
            <Link 
              to="/illustrations" 
              className="text-sm font-medium px-2 py-2 hover:bg-accent rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Illustrations
            </Link>
            <Link 
              to="/ui-kits" 
              className="text-sm font-medium px-2 py-2 hover:bg-accent rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              UI Kits
            </Link>
            <Link 
              to="/pricing" 
              className="text-sm font-medium px-2 py-2 hover:bg-accent rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            
            {user ? (
              <div className="flex flex-col space-y-2 pt-2 border-t">
                <div className="flex items-center gap-2 px-2 py-2">
                  <Avatar className="h-8 w-8">
                    {user.picture ? (
                      <AvatarImage src={user.picture} alt={user.name} />
                    ) : (
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    )}
                  </Avatar>
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                <Button variant="outline" size="sm" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                className="mt-2" 
                onClick={() => {
                  setLoginModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                size="sm"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            )}
          </div>
        </div>
      )}
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
