import { motion } from "framer-motion";
import { Target, Cpu, Map } from "lucide-react";

const features = [
  {
    icon: <Target className="h-6 w-6" />,
    title: "Define Your Goals",
    description: "Share your career aspirations, current skills, and experience level to get personalized guidance."
  },
  {
    icon: <Cpu className="h-6 w-6" />,
    title: "AI Analysis",
    description: "Our advanced AI analyzes your profile and creates a tailored learning path to help you reach your goals."
  },
  {
    icon: <Map className="h-6 w-6" />,
    title: "Follow Your Path",
    description: "Get step-by-step guidance on skills to acquire, resources to use, and milestones to reach on your journey."
  }
];

export default function FeaturesSection() {
  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform helps you map out your career journey in three simple steps
          </p>
        </motion.div>
        
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-gray-50 p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
