import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  // Track scroll position for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "bg-white/80 backdrop-blur-md shadow-md" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="mr-2 flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white">
                <Sparkles className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span className="animated-gradient-text text-2xl font-bold">CareerPathAI</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-1">
            {[
              { href: "/", label: "Home" },
              { href: "/dashboard", label: "Dashboard" },
              { href: "/resources", label: "Resources" },
              { href: "/about", label: "About" }
            ].map(item => (
              <Link 
                key={item.href} 
                href={item.href}
              >
                <div className="relative px-3 py-2 rounded-md">
                  <span className={`relative z-10 text-sm font-medium transition-colors duration-200 ${
                    location === item.href 
                      ? "text-primary" 
                      : "text-gray-700 hover:text-primary"
                  }`}>
                    {item.label}
                  </span>
                  {location === item.href && (
                    <motion.span
                      layoutId="navbar-indicator"
                      className="absolute inset-0 z-0 bg-primary/10 rounded-md"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>
              </Link>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center">
            <Link href="/signin">
              <Button 
                className="ml-8 button-glow font-medium" 
                variant="default"
              >
                Sign In
              </Button>
            </Link>
          </div>
          
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMobileMenu} 
              className={`p-2 rounded-full ${
                scrolled ? "bg-gray-100 text-gray-700" : "bg-white/80 text-gray-700 shadow-sm"
              }`}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={isMobileMenuOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu with animation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden glass-effect mx-4 my-2 rounded-xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {[
                { href: "/", label: "Home" },
                { href: "/dashboard", label: "Dashboard" },
                { href: "/resources", label: "Resources" },
                { href: "/about", label: "About" }
              ].map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    href={item.href} 
                    className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                      location === item.href 
                        ? "text-primary bg-primary/10" 
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link href="/signin" className="block w-full p-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full shadow-md" variant="default">Sign In</Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}