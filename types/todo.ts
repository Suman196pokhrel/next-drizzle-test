export interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "Pending" | "InProgress" | "Completed" | "Canceled";
  priority: string;
}
