import { Todo } from "@/types/todo"

interface DueDateFormProps {
    todo: Todo
}


const DueDateForm = ({
    todo
}: DueDateFormProps) => {
    return (
        <div className="w-1/3 ">
            <p className=" text-slate-500 text-xs">{todo.dueDate}</p>
        </div>
    )
}
export default DueDateForm