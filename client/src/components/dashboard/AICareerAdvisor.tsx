import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCareer } from "@/context/CareerContext";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Cpu, User, Loader2, SendIcon, Sparkles, BrainCog, Bot } from "lucide-react";

export default function AICareerAdvisor() {
  const { toast } = useToast();
  const { careerGoal, advice, setAdvice } = useCareer();
  const [userQuestion, setUserQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef(null);
  const chatEndRef = useRef(null);
  
  if (!careerGoal || !advice) {
    return null;
  }
  
  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [advice, isLoading]);
  
  const handleAskQuestion = async () => {
    if (!userQuestion.trim() || isLoading) return;
    
    setIsLoading(true);
    
    try {
      // Add the user question to the chat
      const userMessage = {
        id: Date.now(),
        careerGoalId: careerGoal.id,
        question: userQuestion,
        advice: "", // Empty for user messages
        createdAt: new Date(),
        isUser: true // Custom property to identify user messages
      };
      
      setAdvice([...advice, userMessage]);
      
      // Send the question to the API
      const response = await apiRequest("POST", "/api/ai-advice", {
        careerGoalId: careerGoal.id,
        question: userQuestion
      });
      
      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }
      
      const aiResponse = await response.json();
      
      // Add the AI response to the chat
      setAdvice([...advice, userMessage, aiResponse]);
      
      // Clear the input
      setUserQuestion("");
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to get career advice. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full"
    >
      <Card className="border-none shadow-lg overflow-hidden">
        <CardHeader className="pb-3 border-b bg-gradient-to-r from-primary/5 to-pink-500/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shadow-inner">
              <BrainCog className="h-5 w-5 text-primary animate-pulse" />
            </div>
            <div>
              <CardTitle className="flex items-center gap-2 text-xl font-bold">
                AI Career Mentor
                <span className="text-xs font-normal py-0.5 px-2 bg-primary/10 text-primary rounded-full">
                  Powered by AI
                </span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Ask personalized questions about your career path
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-500/5 rounded-full blur-3xl opacity-50"></div>
            
            <ScrollArea 
              ref={scrollAreaRef} 
              className="h-[400px] p-4 pt-5"
            >
              <div className="space-y-4 max-w-3xl mx-auto">
                {/* Welcome message card with gradient background */}
                <motion.div 
                  className="w-full p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/20 mb-8"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                        Career AI Assistant
                        <span className="inline-flex animate-pulse items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Online
                        </span>
                      </h3>
                      <p className="text-gray-700 text-sm">
                        I've analyzed your career goal as a <span className="font-medium">{careerGoal.goal}</span>. 
                        Ask me specific questions about skills to develop, learning resources, or career advancement strategies.
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                {/* Advice Chat Messages */}
                <div className="space-y-6">
                  {advice.map((message, index) => {
                    // Skip the first message as we display it separately above
                    if (index === 0 && !message.question) return null;
                    
                    if (message.isUser) {
                      // User message
                      return (
                        <motion.div 
                          key={message.id || index}
                          className="flex items-end gap-3 justify-end"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="bg-primary/10 p-3 rounded-2xl rounded-br-none shadow-sm max-w-[80%] text-primary-foreground">
                            <p className="text-gray-800">{message.question}</p>
                          </div>
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-100">
                            <User className="h-4 w-4 text-gray-600" />
                          </div>
                        </motion.div>
                      );
                    } else {
                      // AI message
                      return (
                        <motion.div 
                          key={message.id}
                          className="flex items-end gap-3"
                          initial={{ opacity: 0, scale: 0.97, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                        >
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                          <div className="glass-effect p-4 rounded-2xl rounded-bl-none max-w-[80%] shadow-md">
                            <p className="text-gray-800 whitespace-pre-line">
                              {message.advice}
                            </p>
                          </div>
                        </motion.div>
                      );
                    }
                  })}

                  {/* Loading indicator */}
                  <AnimatePresence>
                    {isLoading && (
                      <motion.div 
                        className="flex items-end gap-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-white border border-gray-100 p-3 rounded-xl shadow-sm">
                          <div className="flex space-x-2 items-center">
                            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }}></div>
                            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }}></div>
                            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "600ms" }}></div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Invisible element to scroll to */}
                <div ref={chatEndRef} />
              </div>
            </ScrollArea>
            
            {/* Message input with glass effect */}
            <div className="p-4 border-t border-gray-100 glass-effect">
              <div className="flex items-center gap-2 max-w-3xl mx-auto">
                <Input 
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  placeholder="Ask about skills, resources, or career strategies..." 
                  onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
                  className="shadow-sm border-gray-200 focus-visible:ring-primary/50"
                />
                <Button 
                  onClick={handleAskQuestion}
                  disabled={!userQuestion.trim() || isLoading}
                  className="button-glow shadow-md gap-2 px-4"
                  size="icon"
                >
                  {isLoading ? 
                    <Loader2 className="h-4 w-4 animate-spin" /> : 
                    <SendIcon className="h-4 w-4" />
                  }
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
