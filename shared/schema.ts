import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Career goals table
export const careerGoals = pgTable("career_goals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  goal: text("goal").notNull(),
  skills: text("skills").notNull(),
  experienceLevel: text("experience_level").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCareerGoalSchema = createInsertSchema(careerGoals).pick({
  userId: true,
  goal: true,
  skills: true,
  experienceLevel: true,
});

export type InsertCareerGoal = z.infer<typeof insertCareerGoalSchema>;
export type CareerGoal = typeof careerGoals.$inferSelect;

// Learning paths table
export const learningPaths = pgTable("learning_paths", {
  id: serial("id").primaryKey(),
  careerGoalId: integer("career_goal_id").references(() => careerGoals.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  steps: jsonb("steps").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLearningPathSchema = createInsertSchema(learningPaths).pick({
  careerGoalId: true,
  title: true,
  description: true,
  steps: true,
});

export type InsertLearningPath = z.infer<typeof insertLearningPathSchema>;
export type LearningPath = typeof learningPaths.$inferSelect;

// AI Advice table
export const aiAdvice = pgTable("ai_advice", {
  id: serial("id").primaryKey(),
  careerGoalId: integer("career_goal_id").references(() => careerGoals.id),
  question: text("question"),
  advice: text("advice").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAiAdviceSchema = createInsertSchema(aiAdvice).pick({
  careerGoalId: true,
  question: true,
  advice: true,
});

export type InsertAiAdvice = z.infer<typeof insertAiAdviceSchema>;
export type AiAdvice = typeof aiAdvice.$inferSelect;
