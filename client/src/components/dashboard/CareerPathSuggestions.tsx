import { motion } from "framer-motion";
import { useCareer } from "@/context/CareerContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon, BookOpen, Code, Briefcase, Award, Layout, Package, Wrench, Database, BarChart2, Cpu, TrendingUp } from "lucide-react";

type Step = {
  icon: string;
  title: string;
  description: string;
  skills: string[];
};

// Map of icon names to Lucide icon components
const iconMap: Record<string, LucideIcon> = {
  book: BookOpen,
  code: Code,
  briefcase: Briefcase,
  award: Award,
  layout: Layout,
  package: Package,
  tool: Wrench,
  database: Database,
  "bar-chart-2": BarChart2,
  cpu: Cpu,
  "trending-up": TrendingUp,
};

export default function CareerPathSuggestions() {
  const { learningPath } = useCareer();
  
  if (!learningPath) {
    return null;
  }
  
  // Parse the steps from JSON if it's a string
  const steps: Step[] = typeof learningPath.steps === 'string'
    ? JSON.parse(learningPath.steps)
    : learningPath.steps;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">Recommended Career Path</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-0 h-full w-0.5 bg-gray-200"></div>
            
            {/* Timeline items */}
            <div className="space-y-6">
              {steps.map((step, index) => {
                const IconComponent = iconMap[step.icon] || BookOpen;
                
                return (
                  <motion.div 
                    key={index}
                    className="flex gap-4 relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                  >
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center z-10">
                      <IconComponent className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
                      <p className="text-gray-600 mt-1">{step.description}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {step.skills.map((skill, skillIndex) => (
                          <Badge 
                            key={skillIndex}
                            variant="secondary"
                            className="bg-primary-50 text-primary-700 hover:bg-primary-100"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}