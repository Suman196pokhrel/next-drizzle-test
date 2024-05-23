import { Todo } from "@/types/todo"

interface DescriptionFormProps {
    todo: Todo
}


const DescriptionForm = ({
    todo
}: DescriptionFormProps) => {
    return (
        <div className=" text-slate-600 text-sm p-2 bg-gray-100 rounded-lg">
            {todo.description}
        </div>
    )
}
export default DescriptionForm