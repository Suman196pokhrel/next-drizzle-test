import { db } from "@/lib/db";
import { TodosTable } from "@/lib/db/schema";

// FETCH ALL TODOS
export async function GET() {
  try {
    const todos = await db.select().from(TodosTable);
    return new Response(JSON.stringify(todos), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch todos" }), {
      status: 500,
      headers: {
        "Content-Type": "appliaction/json",
      },
    });
  }
}

// CREATE NEW TODO
export async function POST() {}

// UPDATE EXISTING TODO
export async function PUT() {}

// DELETE A TODO
export async function DELETE() {}
