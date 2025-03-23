import { useCareer } from "@/context/CareerContext";
import CareerInputForm from "@/components/dashboard/CareerInputForm";
import UserCareerSummary from "@/components/dashboard/UserCareerSummary";
import CareerPathSuggestions from "@/components/dashboard/CareerPathSuggestions";
import AICareerAdvisor from "@/components/dashboard/AICareerAdvisor";

export default function Dashboard() {
  const { careerGoal } = useCareer();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Career Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Career Profile Form */}
        <div className="lg:col-span-1">
          <CareerInputForm />
        </div>
        
        {/* Right Column - Dashboard Content */}
        <div className="lg:col-span-2 space-y-6">
          {careerGoal && (
            <>
              <UserCareerSummary />
              <CareerPathSuggestions />
              <AICareerAdvisor />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
