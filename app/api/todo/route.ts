import { db } from "@/lib/db";
import { TodosTable } from "@/lib/db/schema";

export async function GET(request: Request) {
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
