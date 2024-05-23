import { db } from "@/lib/db";
import { TodosTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// UPDATE EXISTING TODO
export async function PATCH(
  request: Request,
  { params }: { params: { todoId: string } }
) {
  try {
    const formData = await request.json();
    const { todoId } = params;
    // TODO : server side validation for request body

    try {
      await db
        .update(TodosTable)
        .set(formData)
        .where(eq(TodosTable.id, todoId));
      return new Response(
        JSON.stringify({
          message: "SUccessfully updated  Todo",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (dbError) {
      console.log("Database updation error: ", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to update new Todo" }),
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
