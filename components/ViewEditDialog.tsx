import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { Todo } from "@/types/todo"
import TodoCard from "./TodoCard"
import ViewEditDialogContent from "./ViewEditDialogContent"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

interface ViewEditDialogProps {
    todo: Todo
    listRouter: AppRouterInstance
}

const ViewEditDialog = ({
    todo,
    listRouter
}: ViewEditDialogProps) => {


    return (
        <Dialog onOpenChange={(value) => {
            listRouter.refresh()
            return !value
        }}>
            <DialogTrigger asChild >
                <div>
                    <TodoCard todo={todo} />
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-3xl h-[400px]">
                <ViewEditDialogContent todo={todo} />
            </DialogContent>
        </Dialog>
    )
}
export default ViewEditDialog