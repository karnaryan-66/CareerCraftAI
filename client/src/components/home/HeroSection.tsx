import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 md:pr-12 mb-10 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              AI Career Growth & Learning Path Builder
            </h1>
            <p className="mt-5 text-xl text-gray-600 max-w-2xl">
              Discover personalized learning paths to accelerate your career growth. 
              Powered by AI to help you reach your professional goals faster.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button 
                  size="lg" 
                  className="inline-flex items-center gap-2"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                asChild
              >
                <a href="#how-it-works">Learn More</a>
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80" 
              alt="Career planning professionals" 
              className="rounded-xl shadow-xl max-w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
