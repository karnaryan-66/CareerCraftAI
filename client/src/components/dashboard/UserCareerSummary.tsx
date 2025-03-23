import { motion } from "framer-motion";
import { useCareer } from "@/context/CareerContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function UserCareerSummary() {
  const { careerGoal } = useCareer();
  
  if (!careerGoal) {
    return null;
  }
  
  // Split skills into an array
  const skillsArray = careerGoal.skills.split(',').map(skill => skill.trim()).filter(Boolean);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Your Career Profile</h2>
            <Badge variant="outline" className="bg-primary-100 text-primary-800 hover:bg-primary-100">
              {careerGoal.experienceLevel}
            </Badge>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Career Goal</h3>
              <p className="text-lg font-medium text-gray-900">{careerGoal.goal}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Skills</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {skillsArray.map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary"
                    className="bg-gray-100 text-gray-800 hover:bg-gray-200"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
