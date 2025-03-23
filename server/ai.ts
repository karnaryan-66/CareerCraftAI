import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY
});

export async function generateAICareerAdvice(careerGoal: any, question?: string): Promise<string> {
  // Return mock responses if no OpenAI API key available
  if (!process.env.OPENAI_API_KEY) {
    if (question) {
      return `Here's my advice about "${question}" for your career goal as a ${careerGoal.goal}: Focus on building a strong portfolio and continuously learning new skills in this field.`;
    } else {
      return `Based on your goal to become a ${careerGoal.goal} with skills in ${careerGoal.skills} and ${careerGoal.experienceLevel} of experience, I recommend focusing on building practical projects and expanding your knowledge through online courses.`;
    }
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
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      max_tokens: 500,
    });
    
    return response.choices[0].message.content || "Sorry, I couldn't generate advice at this moment.";
  } catch (error) {
    console.error("Error generating AI career advice:", error);
    return "I'm sorry, but I couldn't generate career advice at this moment. Please try again later.";
  }
}
