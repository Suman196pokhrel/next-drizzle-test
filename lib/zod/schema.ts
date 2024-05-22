"use client";
import { z } from "zod";

const StatusEnum = z.enum(["Pending", "Completed", "InProgress"]);
const PriorityEnum = z.enum(["Low", "Medium", "High"]);

export const NewTodoFormSchema = z.object({
  title: z
    .string()
    .min(5, "Title should have at least 5 characters")
    .max(100, "TItle cannot be longer than 100 characters"),
  description: z
    .string()
    .min(5, "Description should have at least 5 characters")
    .max(500, "Description canoot be more than 500 characters"),
  dueDate: z
    .date()
    .refine((date) => date >= new Date(new Date().setHours(0, 0, 0, 0)), {
      // Allow today and future dates
      message: "Due date cannot be in the past",
    }),
  status: StatusEnum.default("Pending"),
  priority: PriorityEnum.default("Medium"),
});
