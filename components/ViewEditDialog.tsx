import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { Todo } from "@/types/todo"
import TodoCard from "./TodoCard"
import ViewEditDialogContent from "./ViewEditDialogContent"

interface ViewEditDialogProps {
    todo: Todo
}

const ViewEditDialog = ({
    todo
}: ViewEditDialogProps) => {


    return (
        <Dialog >
            <DialogTrigger asChild >
                <div>
                    <TodoCard todo={todo} />
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
                <ViewEditDialogContent todo={todo} />
            </DialogContent>
        </Dialog>
    )
}
export default ViewEditDialog