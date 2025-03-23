import { createContext, useContext, useState, ReactNode } from "react";

// Context interface
interface CareerContextType {
  careerGoal: any | null;
  setCareerGoal: (careerGoal: any) => void;
  learningPath: any | null;
  setLearningPath: (learningPath: any) => void;
  advice: any[] | null;
  setAdvice: (advice: any[]) => void;
}

// Create context with default values
const CareerContext = createContext<CareerContextType>({
  careerGoal: null,
  setCareerGoal: () => {},
  learningPath: null,
  setLearningPath: () => {},
  advice: null,
  setAdvice: () => {},
});

// Context provider component
export const CareerProvider = ({ children }: { children: ReactNode }) => {
  const [careerGoal, setCareerGoal] = useState<any | null>(null);
  const [learningPath, setLearningPath] = useState<any | null>(null);
  const [advice, setAdvice] = useState<any[] | null>(null);
  
  return (
    <CareerContext.Provider value={{
      careerGoal,
      setCareerGoal,
      learningPath,
      setLearningPath,
      advice,
      setAdvice,
    }}>
      {children}
    </CareerContext.Provider>
  );
};

// Custom hook to use the context
export const useCareer = () => useContext(CareerContext);
