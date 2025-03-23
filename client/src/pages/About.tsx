import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Target, HelpCircle, Briefcase, Code, Brain, Sparkles } from "lucide-react";

export default function About() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  // Team members data
  const teamMembers = [
    {
      name: "Alex Morgan",
      role: "Founder & CEO",
      bio: "Former career counselor with 10+ years of experience helping professionals find their path.",
      image: "https://source.unsplash.com/random/300x300/?portrait&seed=1"
    },
    {
      name: "Samantha Chen",
      role: "Head of AI & Learning Paths",
      bio: "AI researcher specializing in personalized learning algorithms and career trajectory analysis.",
      image: "https://source.unsplash.com/random/300x300/?portrait&seed=2"
    },
    {
      name: "David Wilson",
      role: "Career Development Specialist",
      bio: "Certified career coach with expertise in helping people transition into tech careers.",
      image: "https://source.unsplash.com/random/300x300/?portrait&seed=3"
    },
    {
      name: "Mira Johnson",
      role: "UX/UI Designer",
      bio: "Award-winning designer focused on creating intuitive interfaces for learning applications.",
      image: "https://source.unsplash.com/random/300x300/?portrait&seed=4"
    }
  ];

  // Values data
  const values = [
    {
      icon: <Target className="h-8 w-8 text-primary-600" />,
      title: "Personalization",
      description: "We believe every career journey is unique. Our AI-powered platform creates truly personalized learning paths tailored to your specific goals and background."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary-600" />,
      title: "Innovation",
      description: "We continuously evolve our technology to provide cutting-edge career guidance that adapts to the rapidly changing job market."
    },
    {
      icon: <Users className="h-8 w-8 text-primary-600" />,
      title: "Inclusivity",
      description: "We're committed to making career growth accessible to everyone, regardless of background, experience level, or location."
    },
    {
      icon: <Award className="h-8 w-8 text-primary-600" />,
      title: "Excellence",
      description: "We strive for excellence in all aspects of our platform, from the accuracy of our AI recommendations to the quality of user experience."
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "How does CareerPathAI work?",
      answer: "CareerPathAI uses advanced artificial intelligence to analyze your current skills, experience, and career goals. Based on this analysis, our platform generates personalized learning paths and career advice tailored specifically to your professional journey."
    },
    {
      question: "Is CareerPathAI free to use?",
      answer: "We offer a free tier with basic functionality, allowing you to explore career options and receive general advice. Premium features, including detailed learning paths, AI-powered coaching, and priority support, are available through our subscription plans."
    },
    {
      question: "How accurate are the AI recommendations?",
      answer: "Our AI model is trained on extensive career development data and continuously improves with feedback. While no AI can replace human judgment, our recommendations are based on real-world career trajectories and industry best practices, providing valuable guidance for your career decisions."
    },
    {
      question: "Can I use CareerPathAI for any career field?",
      answer: "Yes! Our platform supports a wide range of career fields, from technology and healthcare to creative industries and business. The AI adapts its recommendations based on the specific requirements and trends in your chosen field."
    }
  ];

  return (
    <div className="container max-w-6xl py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
          About CareerPathAI
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're on a mission to revolutionize career development through AI-powered personalized learning paths and expert guidance.
        </p>
      </motion.div>

      {/* Our Story Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                CareerPathAI was born from a simple observation: traditional career guidance doesn't adapt to the rapidly evolving job market and individual needs.
              </p>
              <p>
                Founded in 2023, our team of career development experts and AI specialists came together with a shared vision: to create a platform that provides truly personalized career guidance at scale.
              </p>
              <p>
                We've since helped thousands of professionals navigate their career journeys with confidence, providing actionable learning paths and advice tailored to their unique goals and circumstances.
              </p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img 
              src="https://source.unsplash.com/random/600x400/?teamwork" 
              alt="Our team collaborating" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </motion.div>

      {/* Our Values Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-20"
      >
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-900">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary-50 p-3 rounded-full mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Our Team Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-20"
      >
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-900">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-1 text-gray-900">{member.name}</h3>
                    <p className="text-primary-600 font-medium mb-2">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-900">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <HelpCircle className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-gray-900">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center bg-gradient-to-r from-primary-100 to-primary-50 p-10 rounded-2xl"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Ready to accelerate your career growth?</h2>
        <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
          Join thousands of professionals who are using CareerPathAI to navigate their career journeys with confidence.
        </p>
        <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 text-lg">
          Get Started Now
        </button>
      </motion.div>
    </div>
  );
}