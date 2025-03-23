import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY
});

export async function generateCareerAdvice(
  careerGoal: string,
  skills: string,
  experienceLevel: string,
  question?: string
): Promise<string> {
  try {
    const systemPrompt = `You are an AI career advisor specialized in providing personalized learning paths and career advice. 
    Be insightful, practical, and encouraging. Provide specific, actionable recommendations.`;
    
    let userPrompt = "";
    
    if (question) {
      userPrompt = `I want to become a ${careerGoal}. My current skills are ${skills} and I have ${experienceLevel} of experience.
      My question is: ${question}`;
    } else {
      userPrompt = `I want to become a ${careerGoal}. My current skills are ${skills} and I have ${experienceLevel} of experience.
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

export async function generateLearningPath(
  careerGoal: string,
  skills: string,
  experienceLevel: string
): Promise<any> {
  try {
    const prompt = `Create a detailed learning path for someone who wants to become a ${careerGoal}, 
    has skills in ${skills}, and has ${experienceLevel} of experience. 
    
    Return the response in JSON format with the following structure:
    {
      "title": "Learning Path for [Career Goal]",
      "description": "Brief description of the learning path",
      "steps": [
        {
          "icon": "icon-name",
          "title": "Step Title",
          "description": "Step description",
          "skills": ["Skill 1", "Skill 2", "Skill 3"]
        }
      ]
    }
    
    For icon names, use one of: book, code, briefcase, award, layout, package, wrench, database, bar-chart-2, cpu, trending-up.
    Include 4-5 steps in the learning path.`;
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { 
          role: "system", 
          content: "You are a career path expert that creates detailed learning paths in JSON format."
        },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
    });
    
    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    console.error("Error generating learning path:", error);
    
    // Return default learning path on error
    return {
      title: `Learning Path for ${careerGoal}`,
      description: `A learning path to help you become a ${careerGoal}`,
      steps: [
        {
          icon: "book",
          title: "Foundations",
          description: "Master the core concepts and tools required for your field.",
          skills: ["Core Principles", "Industry Standards", "Basic Tools"]
        },
        {
          icon: "code",
          title: "Technical Skills",
          description: "Build technical expertise specific to your career goal.",
          skills: ["Technical Foundation", "Practical Applications", "Problem Solving"]
        },
        {
          icon: "briefcase",
          title: "Professional Experience",
          description: "Apply your knowledge in real-world scenarios.",
          skills: ["Portfolio Building", "Professional Networking", "Industry Collaboration"]
        },
        {
          icon: "award",
          title: "Specialization",
          description: "Develop expertise in a specific area of your field.",
          skills: ["Advanced Techniques", "Specialized Tools", "Expert Knowledge"]
        }
      ]
    };
  }
}
