import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function useAICareerAdvisor() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const getInitialAdvice = async (careerGoalId: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiRequest("POST", "/api/ai-advice", {
        careerGoalId,
      });
      
      if (!response.ok) {
        throw new Error("Failed to get AI career advice");
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      const errorMessage = "Failed to get AI career advice. Please try again.";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  const askQuestion = async (careerGoalId: number, question: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiRequest("POST", "/api/ai-advice", {
        careerGoalId,
        question,
      });
      
      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      const errorMessage = "Failed to get response from AI advisor. Please try again.";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    getInitialAdvice,
    askQuestion,
    isLoading,
    error,
  };
}
