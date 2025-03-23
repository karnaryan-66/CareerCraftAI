import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Sparkles, BarChart, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Background gradient blur effect */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/30 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-pink-500/30 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        
        <div className="flex flex-col md:flex-row items-center relative z-10">
          <motion.div 
            className="md:w-1/2 md:pr-12 mb-10 md:mb-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center px-3 py-1.5 mb-4 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium animate-pulse">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered Career Development
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="animated-gradient-text">AI Career Growth</span> & Learning Path Builder
            </h1>
            
            <p className="mt-6 text-xl text-gray-600 max-w-2xl">
              Discover personalized learning paths to accelerate your career growth. 
              Powered by AI to help you reach your professional goals faster.
            </p>
            
            <div className="mt-8 space-y-4 sm:space-y-0 sm:flex sm:gap-4">
              <Link href="/dashboard">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto inline-flex items-center gap-2 button-glow shadow-lg"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto gradient-border"
                asChild
              >
                <a href="#how-it-works">Learn More</a>
              </Button>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <div className="rounded-full p-2 bg-primary/10 text-primary">
                  <BarChart className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Career Analytics</h3>
                  <p className="text-sm text-gray-500">Track your growth over time</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="rounded-full p-2 bg-primary/10 text-primary">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Learning Paths</h3>
                  <p className="text-sm text-gray-500">Curated for your goals</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <div className="relative z-10">
              <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-primary/20 to-pink-500/20 blur-2xl rounded-3xl transform -rotate-3"></div>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80" 
                alt="Career planning professionals" 
                className="rounded-2xl shadow-2xl max-w-full h-auto transform hover:scale-[1.02] transition-transform duration-500 ease-in-out"
              />
              
              {/* Floating card effect */}
              <div className="absolute -bottom-10 -left-10 bg-white rounded-xl p-4 shadow-lg glass-effect animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-600">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">AI Recommendations</div>
                    <div className="text-xs text-gray-500">Personalized for you</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
