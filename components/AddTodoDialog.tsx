import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { IoIosAddCircleOutline } from "react-icons/io"
import { Todo } from "@/types/todo"
import FormNewTodo from "./FormNewTodo"

interface AddTodoDialogProps {
}



const AddTodoDialog = ({

}: AddTodoDialogProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} className="flex items-center gap-2">
                    <IoIosAddCircleOutline size={25} />
                </Button>
            </DialogTrigger>
            <DialogContent >
                <DialogHeader>
                    <DialogTitle>Create new todo</DialogTitle>
                </DialogHeader>

                <FormNewTodo />
            </DialogContent>
        </Dialog>

    )
}
export default AddTodoDialog