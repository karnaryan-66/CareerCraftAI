import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCareer } from "@/context/CareerContext";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Sparkles, Rocket, Lightbulb, Code, BookOpen, Target } from "lucide-react";

const formSchema = z.object({
  careerGoal: z.string().min(2, { message: "Career goal is required" }),
  skills: z.string().min(2, { message: "At least one skill is required" }),
  experienceLevel: z.string().min(2, { message: "Experience level is required" }),
});

type FormData = z.infer<typeof formSchema>;

export default function CareerInputForm() {
  const { toast } = useToast();
  const { setCareerGoal, setLearningPath, setAdvice } = useCareer();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      careerGoal: "",
      skills: "",
      experienceLevel: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Submit career goal
      const careerGoalResponse = await apiRequest("POST", "/api/career-goals", {
        userId: 1, // Using a default user ID
        goal: data.careerGoal,
        skills: data.skills,
        experienceLevel: data.experienceLevel,
      });
      
      if (!careerGoalResponse.ok) {
        throw new Error("Failed to submit career goal");
      }
      
      const careerGoal = await careerGoalResponse.json();
      setCareerGoal(careerGoal);
      
      // Generate learning path
      const steps = generateDefaultSteps(data.careerGoal);
      
      const learningPathResponse = await apiRequest("POST", "/api/learning-paths", {
        careerGoalId: careerGoal.id,
        title: `Learning Path for ${data.careerGoal}`,
        description: `Personalized learning path for becoming a ${data.careerGoal}`,
        steps,
      });
      
      if (!learningPathResponse.ok) {
        throw new Error("Failed to generate learning path");
      }
      
      const learningPath = await learningPathResponse.json();
      setLearningPath(learningPath);
      
      // Generate AI advice
      const aiAdviceResponse = await apiRequest("POST", "/api/ai-advice", {
        careerGoalId: careerGoal.id,
      });
      
      if (!aiAdviceResponse.ok) {
        throw new Error("Failed to generate AI advice");
      }
      
      const advice = await aiAdviceResponse.json();
      setAdvice([advice]);
      
      toast({
        title: "Success!",
        description: "Your career path has been generated.",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to generate career path. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to generate default steps based on career goal
  const generateDefaultSteps = (careerGoal: string) => {
    const goalLower = careerGoal.toLowerCase();
    
    if (goalLower.includes("frontend")) {
      return [
        {
          icon: "layout",
          title: "HTML & CSS Fundamentals",
          description: "Master the building blocks of web development.",
          skills: ["HTML5", "CSS3", "Responsive Design"]
        },
        {
          icon: "code",
          title: "JavaScript Proficiency",
          description: "Build interactive and dynamic web experiences.",
          skills: ["JavaScript ES6+", "DOM Manipulation", "Async Programming"]
        },
        {
          icon: "package",
          title: "Framework Expertise",
          description: "Learn modern frontend frameworks and libraries.",
          skills: ["React.js", "State Management", "Component Architecture"]
        },
        {
          icon: "wrench",
          title: "Advanced Frontend Skills",
          description: "Enhance your applications with advanced techniques.",
          skills: ["Performance Optimization", "Animations", "Testing"]
        }
      ];
    } else if (goalLower.includes("data")) {
      return [
        {
          icon: "database",
          title: "Data Fundamentals",
          description: "Build a strong foundation in data concepts and tools.",
          skills: ["SQL", "Data Structures", "Statistics"]
        },
        {
          icon: "bar-chart-2",
          title: "Data Analysis & Visualization",
          description: "Learn to extract insights and communicate findings.",
          skills: ["Python/R", "Data Visualization", "Exploratory Analysis"]
        },
        {
          icon: "cpu",
          title: "Machine Learning",
          description: "Apply algorithms to solve complex problems.",
          skills: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation"]
        },
        {
          icon: "trending-up",
          title: "Advanced Data Science",
          description: "Develop expertise in specific data science domains.",
          skills: ["Deep Learning", "NLP", "Production ML Systems"]
        }
      ];
    } else {
      return [
        {
          icon: "book",
          title: "Foundations",
          description: "Master the core concepts and tools required for your field.",
          skills: ["Core Principles", "Industry Standards", "Basic Tools"]
        },
        {
          icon: "code",
          title: "Technical Skills",
          description: "Build technical expertise specific to your career goal.",
          skills: ["Technical Foundation", "Practical Applications", "Problem Solving"]
        },
        {
          icon: "briefcase",
          title: "Professional Experience",
          description: "Apply your knowledge in real-world scenarios.",
          skills: ["Portfolio Building", "Professional Networking", "Industry Collaboration"]
        },
        {
          icon: "award",
          title: "Specialization",
          description: "Develop expertise in a specific area of your field.",
          skills: ["Advanced Techniques", "Specialized Tools", "Expert Knowledge"]
        }
      ];
    }
  };

  return (
    <motion.div 
      className="glass-effect rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-500/5 rounded-full blur-3xl opacity-50"></div>
        
        {/* Header with icon */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-xl">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Define Your Career Path</h2>
            <p className="text-gray-500 text-sm">Tell us about your career ambitions</p>
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
            <FormField
              control={form.control}
              name="careerGoal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 font-medium">
                    <div className="flex items-center gap-2">
                      <Rocket className="h-4 w-4 text-primary" />
                      Career Goal
                    </div>
                  </FormLabel>
                  <FormDescription>
                    What job title or role do you want to achieve?
                  </FormDescription>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Frontend Developer, Data Scientist" 
                      className="shadow-sm focus-visible:ring-primary/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 font-medium">
                    <div className="flex items-center gap-2">
                      <Code className="h-4 w-4 text-primary" />
                      Current Skills
                    </div>
                  </FormLabel>
                  <FormDescription>
                    List your existing skills separated by commas
                  </FormDescription>
                  <FormControl>
                    <Input 
                      placeholder="e.g., HTML, CSS, JavaScript, Python" 
                      className="shadow-sm focus-visible:ring-primary/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="experienceLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 font-medium">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      Experience Level
                    </div>
                  </FormLabel>
                  <FormDescription>
                    How much experience do you have in this field?
                  </FormDescription>
                  <Select 
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full shadow-sm focus:ring-primary/50">
                        <SelectValue placeholder="Select your experience" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0-1 years">0-1 years</SelectItem>
                      <SelectItem value="1-2 years">1-2 years</SelectItem>
                      <SelectItem value="2-3 years">2-3 years</SelectItem>
                      <SelectItem value="3-5 years">3-5 years</SelectItem>
                      <SelectItem value="5+ years">5+ years</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full relative overflow-hidden group button-glow"
                disabled={isSubmitting}
                size="lg"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating Your Path...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 transition-transform group-hover:scale-110" />
                      Generate AI Career Path
                    </>
                  )}
                </span>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </motion.div>
  );
}
