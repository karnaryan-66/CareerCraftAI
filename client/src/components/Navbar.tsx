import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-primary-600 text-2xl font-bold">CareerPathAI</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className={`text-gray-700 hover:text-primary-600 font-medium ${location === '/' ? 'text-primary-600' : ''}`}>
              Home
            </Link>
            <Link href="/dashboard" className={`text-gray-700 hover:text-primary-600 font-medium ${location === '/dashboard' ? 'text-primary-600' : ''}`}>
              Dashboard
            </Link>
            <Link href="/resources" className={`text-gray-700 hover:text-primary-600 font-medium ${location === '/resources' ? 'text-primary-600' : ''}`}>
              Resources
            </Link>
            <Link href="/about" className={`text-gray-700 hover:text-primary-600 font-medium ${location === '/about' ? 'text-primary-600' : ''}`}>
              About
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center">
            <Link href="/signin">
              <Button className="ml-8" variant="default">Sign In</Button>
            </Link>
          </div>
          
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMobileMenu} 
              className="text-gray-700"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 ${location === '/' ? 'text-primary-600' : ''}`}>
              Home
            </Link>
            <Link href="/dashboard" className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 ${location === '/dashboard' ? 'text-primary-600' : ''}`}>
              Dashboard
            </Link>
            <Link href="/resources" className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 ${location === '/resources' ? 'text-primary-600' : ''}`}>
              Resources
            </Link>
            <Link href="/about" className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 ${location === '/about' ? 'text-primary-600' : ''}`}>
              About
            </Link>
            <Link href="/signin" className="block w-full mt-3">
              <Button className="w-full" variant="default">Sign In</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}