import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY
});

export async function generateAICareerAdvice(careerGoal: any, question?: string): Promise<string> {
  // Check if OpenAI API key is available or valid
  if (!process.env.OPENAI_API_KEY) {
    console.log("No OpenAI API key provided. Using fallback advice.");
    return generateFallbackAdvice(careerGoal, question);
  }

  try {
    const systemPrompt = `You are an AI career advisor specialized in providing personalized learning paths and career advice. 
    Be insightful, practical, and encouraging. Provide specific, actionable recommendations.`;
    
    let userPrompt = "";
    
    if (question) {
      userPrompt = `I want to become a ${careerGoal.goal}. My current skills are ${careerGoal.skills} and I have ${careerGoal.experienceLevel} of experience.
      My question is: ${question}`;
    } else {
      userPrompt = `I want to become a ${careerGoal.goal}. My current skills are ${careerGoal.skills} and I have ${careerGoal.experienceLevel} of experience.
      Please provide me with personalized career advice and recommendations for next steps.`;
    }
    
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        max_tokens: 500,
      });
      
      return response.choices[0].message.content || "Sorry, I couldn't generate advice at this moment.";
    } catch (apiError) {
      console.error("Error calling OpenAI API:", apiError);
      
      // Check if it's a rate limit or quota error
      if (apiError.code === 'insufficient_quota' || apiError.status === 429) {
        console.log("OpenAI API quota exceeded. Using fallback advice.");
        return generateFallbackAdvice(careerGoal, question);
      }
      
      return "I'm sorry, but I couldn't generate career advice at this moment. There might be an issue with the AI service. Please try again later.";
    }
  } catch (error) {
    console.error("Unexpected error generating AI career advice:", error);
    return "I apologize for the inconvenience. An unexpected error occurred while generating your career advice. Please try again later.";
  }
}

// Helper function to generate fallback advice when API is unavailable
function generateFallbackAdvice(careerGoal: any, question?: string): string {
  const careerField = careerGoal.goal.toLowerCase();
  const skills = careerGoal.skills;
  const experience = careerGoal.experienceLevel.toLowerCase();
  
  // Base advice templates depending on experience level
  const beginnerAdvice = `For someone just starting in ${careerField}, focus on building foundational skills through online courses and tutorials. Create small projects to apply what you learn, and consider joining communities or forums related to ${careerField} to connect with others in the field.`;
  
  const intermediateAdvice = `With your intermediate experience in ${careerField}, now is a great time to work on more complex projects that demonstrate your skills. Consider contributing to open-source projects, attending industry workshops, and expanding your professional network. Focus on specializing in specific areas of ${careerField} that interest you most.`;
  
  const advancedAdvice = `As an experienced professional in ${careerField}, focus on leadership opportunities, mentoring juniors, and staying at the cutting edge of industry trends. Consider speaking at conferences, writing technical articles, or developing innovative projects that showcase your expertise. Your goal should be to become recognized as a thought leader in your specialization.`;
  
  let baseAdvice = "";
  
  // Select appropriate base advice based on experience level
  if (experience.includes("beginner") || experience.includes("entry") || experience.includes("junior")) {
    baseAdvice = beginnerAdvice;
  } else if (experience.includes("intermediate") || experience.includes("mid")) {
    baseAdvice = intermediateAdvice;
  } else {
    baseAdvice = advancedAdvice;
  }
  
  // If there's a specific question, add targeted advice
  if (question) {
    const questionLower = question.toLowerCase();
    
    if (questionLower.includes("certification") || questionLower.includes("course")) {
      return `Regarding your question about ${question}, certifications can significantly boost your credentials in ${careerField}. Look for industry-recognized certifications that align with your career goals and current skill level. ${baseAdvice}`;
    }
    
    if (questionLower.includes("salary") || questionLower.includes("pay") || questionLower.includes("compensation")) {
      return `About your question on ${question}, salary in ${careerField} varies based on location, experience, and specialization. To maximize your earning potential, focus on in-demand skills like ${skills} and consider specializing in high-growth areas. ${baseAdvice}`;
    }
    
    if (questionLower.includes("interview") || questionLower.includes("resume") || questionLower.includes("hiring")) {
      return `Regarding your question about ${question}, make sure your resume highlights your experience with ${skills}. In interviews for ${careerField} positions, be prepared to discuss practical examples of your work and how you've solved problems. ${baseAdvice}`;
    }
    
    // General response for other questions
    return `Regarding your question about "${question}" for your career as a ${careerField}: ${baseAdvice} Additionally, continue to develop your skills in ${skills} as these are crucial for success in this field.`;
  }
  
  // General advice if no specific question
  return `Based on your goal to become a ${careerField} with skills in ${skills} and ${experience} experience: ${baseAdvice} Focus on strengthening your skills in ${skills} through practical projects and continuous learning.`;
}
