import { db } from "@/lib/db";
import { TodosTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

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
export async function POST(request: Request) {
  try {
    const res = await request.json();

    // TODO : server side validation for request body

    // INSERT NEW DATA IN DB
    try {
      const data = await db.insert(TodosTable).values(res).returning();
      return new Response(
        JSON.stringify({
          message: "SUccessfully inserted new Todo",
          newTodo: data,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (dbError) {
      console.log("Database insertion error: ", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to insert new Todo" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (error) {
    console.error("Request handling error:", error);
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

// UPDATE EXISTING TODO
export async function PUT(request: Request) {}

// DELETE A TODO
export async function DELETE() {}
