import { Todo } from "@/types/todo"
import { Badge } from "../ui/badge"

interface PriorityFormProps {
    todo: Todo
}


const PriorityForm = ({
    todo
}: PriorityFormProps) => {
    return (
        <Badge variant={"outline"}>{todo.priority}</Badge>
    )
}
export default PriorityForm