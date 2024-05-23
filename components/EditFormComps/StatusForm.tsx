import { Todo } from "@/types/todo"
import { Badge } from "../ui/badge"


interface StatusFormProps {
    todo: Todo
}


const StatusForm = ({
    todo
}: StatusFormProps) => {
    return (
        <Badge variant={"outline"}>{todo.status}</Badge>
    )
}
export default StatusForm