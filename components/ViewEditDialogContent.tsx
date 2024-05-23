import { Todo } from "@/types/todo"
import { DialogFooter, DialogHeader } from "./ui/dialog"
import { Badge } from "./ui/badge"

interface ViewEditDialogContentProps {
    todo: Todo
}


const ViewEditDialogContent = ({
    todo
}: ViewEditDialogContentProps) => {
    return (
        <div className="flex flex-col items-start gap-5">
            <DialogHeader className=" font-bold text-2xl">
                {todo.title}
            </DialogHeader>


            <div className=" text-slate-600 text-sm p-2 bg-gray-100 rounded-lg">
                {todo.description}
            </div>

            <DialogFooter className="flex items-center gap-5">
                <Badge variant={"outline"}>{todo.status}</Badge>
                <Badge variant={"outline"}>{todo.priority}</Badge>
                <div className="w-1/3 ">
                    <p className=" text-slate-500 text-xs">{todo.dueDate}</p>
                </div>
            </DialogFooter>
        </div>
    )
}
export default ViewEditDialogContent