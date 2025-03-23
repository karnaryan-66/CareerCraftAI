import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertCareerGoalSchema, insertLearningPathSchema, insertAiAdviceSchema } from "@shared/schema";
import { generateAICareerAdvice } from "./ai";

export async function registerRoutes(app: Express): Promise<Server> {
  const apiRouter = express.Router();
  
  // Career Goals API
  apiRouter.post("/career-goals", async (req: Request, res: Response) => {
    try {
      const validatedData = insertCareerGoalSchema.parse(req.body);
      const careerGoal = await storage.createCareerGoal(validatedData);
      res.status(201).json(careerGoal);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create career goal" });
    }
  });
  
  apiRouter.get("/career-goals", async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }
      const careerGoals = await storage.getCareerGoalsByUserId(userId);
      res.json(careerGoals);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch career goals" });
    }
  });
  
  apiRouter.get("/career-goals/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const careerGoal = await storage.getCareerGoal(id);
      if (!careerGoal) {
        return res.status(404).json({ error: "Career goal not found" });
      }
      res.json(careerGoal);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch career goal" });
    }
  });
  
  // Learning Paths API
  apiRouter.post("/learning-paths", async (req: Request, res: Response) => {
    try {
      const validatedData = insertLearningPathSchema.parse(req.body);
      const learningPath = await storage.createLearningPath(validatedData);
      res.status(201).json(learningPath);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create learning path" });
    }
  });
  
  apiRouter.get("/learning-paths", async (req: Request, res: Response) => {
    try {
      const careerGoalId = req.query.careerGoalId ? parseInt(req.query.careerGoalId as string) : undefined;
      if (!careerGoalId) {
        return res.status(400).json({ error: "Career goal ID is required" });
      }
      const learningPaths = await storage.getLearningPathsByCareerGoalId(careerGoalId);
      res.json(learningPaths);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch learning paths" });
    }
  });
  
  // AI Advice API
  apiRouter.post("/ai-advice", async (req: Request, res: Response) => {
    try {
      const { careerGoalId, question } = req.body;
      
      if (!careerGoalId) {
        return res.status(400).json({ error: "Career goal ID is required" });
      }
      
      const careerGoal = await storage.getCareerGoal(careerGoalId);
      if (!careerGoal) {
        return res.status(404).json({ error: "Career goal not found" });
      }
      
      // Generate AI advice based on career goal and question
      const aiResponse = await generateAICareerAdvice(careerGoal, question);
      
      // Store the advice
      const aiAdviceData = {
        careerGoalId,
        question: question || null,
        advice: aiResponse,
      };
      
      const validatedData = insertAiAdviceSchema.parse(aiAdviceData);
      const advice = await storage.createAiAdvice(validatedData);
      
      res.status(201).json(advice);
    } catch (error) {
      res.status(500).json({ error: "Failed to generate AI career advice" });
    }
  });
  
  apiRouter.get("/ai-advice", async (req: Request, res: Response) => {
    try {
      const careerGoalId = req.query.careerGoalId ? parseInt(req.query.careerGoalId as string) : undefined;
      if (!careerGoalId) {
        return res.status(400).json({ error: "Career goal ID is required" });
      }
      const advice = await storage.getAiAdviceByCareerGoalId(careerGoalId);
      res.json(advice);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch AI advice" });
    }
  });
  
  // Use the API router with the /api prefix
  app.use("/api", apiRouter);

  const httpServer = createServer(app);
  
  return httpServer;
}


