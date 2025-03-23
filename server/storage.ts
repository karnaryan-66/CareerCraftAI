import { users, type User, type InsertUser, careerGoals, type CareerGoal, type InsertCareerGoal, learningPaths, type LearningPath, type InsertLearningPath, aiAdvice, type AiAdvice, type InsertAiAdvice } from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Career Goal operations
  getCareerGoal(id: number): Promise<CareerGoal | undefined>;
  getCareerGoalsByUserId(userId: number): Promise<CareerGoal[]>;
  createCareerGoal(careerGoal: InsertCareerGoal): Promise<CareerGoal>;
  
  // Learning Path operations
  getLearningPath(id: number): Promise<LearningPath | undefined>;
  getLearningPathsByCareerGoalId(careerGoalId: number): Promise<LearningPath[]>;
  createLearningPath(learningPath: InsertLearningPath): Promise<LearningPath>;
  
  // AI Advice operations
  getAiAdvice(id: number): Promise<AiAdvice | undefined>;
  getAiAdviceByCareerGoalId(careerGoalId: number): Promise<AiAdvice[]>;
  createAiAdvice(aiAdvice: InsertAiAdvice): Promise<AiAdvice>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private careerGoals: Map<number, CareerGoal>;
  private learningPaths: Map<number, LearningPath>;
  private aiAdvice: Map<number, AiAdvice>;
  
  private userId: number;
  private careerGoalId: number;
  private learningPathId: number;
  private aiAdviceId: number;

  constructor() {
    this.users = new Map();
    this.careerGoals = new Map();
    this.learningPaths = new Map();
    this.aiAdvice = new Map();
    
    this.userId = 1;
    this.careerGoalId = 1;
    this.learningPathId = 1;
    this.aiAdviceId = 1;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Career Goal operations
  async getCareerGoal(id: number): Promise<CareerGoal | undefined> {
    return this.careerGoals.get(id);
  }
  
  async getCareerGoalsByUserId(userId: number): Promise<CareerGoal[]> {
    return Array.from(this.careerGoals.values()).filter(
      (careerGoal) => careerGoal.userId === userId,
    );
  }
  
  async createCareerGoal(insertCareerGoal: InsertCareerGoal): Promise<CareerGoal> {
    const id = this.careerGoalId++;
    const createdAt = new Date();
    // Ensure userId is not undefined
    const userId = insertCareerGoal.userId === undefined ? null : insertCareerGoal.userId;
    const careerGoal: CareerGoal = { ...insertCareerGoal, id, createdAt, userId };
    this.careerGoals.set(id, careerGoal);
    return careerGoal;
  }
  
  // Learning Path operations
  async getLearningPath(id: number): Promise<LearningPath | undefined> {
    return this.learningPaths.get(id);
  }
  
  async getLearningPathsByCareerGoalId(careerGoalId: number): Promise<LearningPath[]> {
    return Array.from(this.learningPaths.values()).filter(
      (learningPath) => learningPath.careerGoalId === careerGoalId,
    );
  }
  
  async createLearningPath(insertLearningPath: InsertLearningPath): Promise<LearningPath> {
    const id = this.learningPathId++;
    const createdAt = new Date();
    // Ensure careerGoalId is not undefined
    const careerGoalId = insertLearningPath.careerGoalId === undefined ? null : insertLearningPath.careerGoalId;
    const learningPath: LearningPath = { 
      ...insertLearningPath, 
      id, 
      createdAt, 
      careerGoalId 
    };
    this.learningPaths.set(id, learningPath);
    return learningPath;
  }
  
  // AI Advice operations
  async getAiAdvice(id: number): Promise<AiAdvice | undefined> {
    return this.aiAdvice.get(id);
  }
  
  async getAiAdviceByCareerGoalId(careerGoalId: number): Promise<AiAdvice[]> {
    return Array.from(this.aiAdvice.values()).filter(
      (advice) => advice.careerGoalId === careerGoalId,
    );
  }
  
  async createAiAdvice(insertAiAdvice: InsertAiAdvice): Promise<AiAdvice> {
    const id = this.aiAdviceId++;
    const createdAt = new Date();
    // Ensure careerGoalId and question are not undefined
    const careerGoalId = insertAiAdvice.careerGoalId === undefined ? null : insertAiAdvice.careerGoalId;
    const question = insertAiAdvice.question === undefined ? null : insertAiAdvice.question;
    const advice: AiAdvice = { 
      ...insertAiAdvice, 
      id, 
      createdAt,
      careerGoalId,
      question
    };
    this.aiAdvice.set(id, advice);
    return advice;
  }
}

export const storage = new MemStorage();
