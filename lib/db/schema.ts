import {
  pgTable,
  timestamp,
  text,
  uuid,
  varchar,
  date,
  pgEnum,
} from "drizzle-orm/pg-core";

// Define and export enums
export const StatusEnum = pgEnum("StatusEnum", [
  "Pending",
  "Completed",
  "InProgress",
]);

export const PriorityEnum = pgEnum("PriorityEnum", ["Low", "Medium", "High"]);

// Define and export the table schema
export const TodosSchema = pgTable("todos", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  dueDate: date("due_date").notNull(),
  status: StatusEnum("status").notNull().default("Pending"),
  priority: PriorityEnum("priority").notNull().default("Medium"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
