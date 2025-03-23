import { useState } from "react";
import { motion } from "framer-motion";
import { useCareer } from "@/context/CareerContext";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Cpu, User, Loader2 } from "lucide-react";

export default function AICareerAdvisor() {
  const { toast } = useToast();
  const { careerGoal, advice, setAdvice } = useCareer();
  const [userQuestion, setUserQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  if (!careerGoal || !advice) {
    return null;
  }
  
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
    >
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <Cpu className="h-5 w-5 text-primary-600" />
            </div>
            <CardTitle className="text-xl font-semibold text-gray-900">AI Career Advisor</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="border border-gray-200 rounded-lg p-4 h-96 bg-gray-50 mb-4">
            <div className="space-y-4">
              {/* Initial AI Message */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Cpu className="h-4 w-4 text-primary-600" />
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm max-w-[85%]">
                  <p className="text-gray-800">
                    I've analyzed your career goal as a <span className="font-medium">{careerGoal.goal}</span>. 
                    Based on your current skills and experience level, here's my personalized advice:
                  </p>
                </div>
              </div>
              
              {/* Advice Chat Messages */}
              {advice.map((message, index) => {
                // Skip the first message as we display it separately above
                if (index === 0 && !message.question) return null;
                
                if (message.isUser) {
                  // User message
                  return (
                    <motion.div 
                      key={message.id || index}
                      className="flex items-start gap-3 justify-end"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-primary-50 p-3 rounded-lg shadow-sm max-w-[85%]">
                        <p className="text-gray-800">{message.question}</p>
                      </div>
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                    </motion.div>
                  );
                } else {
                  // AI message
                  return (
                    <motion.div 
                      key={message.id}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Cpu className="h-4 w-4 text-primary-600" />
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm max-w-[85%]">
                        <p className="text-gray-800">{message.advice}</p>
                      </div>
                    </motion.div>
                  );
                }
              })}
              
              {/* Loading indicator */}
              {isLoading && (
                <motion.div 
                  className="flex items-start gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Loader2 className="h-4 w-4 text-primary-600 animate-spin" />
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-gray-500">Thinking...</p>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>
          
          <div className="flex items-center gap-2">
            <Input 
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              placeholder="Ask a question about your career path..." 
              onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
            />
            <Button 
              onClick={handleAskQuestion}
              disabled={!userQuestion.trim() || isLoading}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Ask"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
