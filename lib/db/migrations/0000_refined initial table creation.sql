DO $$ BEGIN
 CREATE TYPE "public"."PriorityEnum" AS ENUM('Low', 'Medium', 'High');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."StatusEnum" AS ENUM('Pending', 'Completed', 'InProgress');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "todos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"due_date" date NOT NULL,
	"status" "StatusEnum" DEFAULT 'Pending' NOT NULL,
	"priority" "PriorityEnum" DEFAULT 'Medium' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
