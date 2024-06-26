import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { IoIosAddCircleOutline } from "react-icons/io"
import FormNewTodo from "./FormNewTodo"
import { Dispatch, SetStateAction, useState } from "react"
import { Todo } from "@/types/todo"

interface AddTodoDialogProps {
    todoData: Todo[] | undefined
    setTodos: Dispatch<SetStateAction<Todo[] | undefined>>
}



const AddTodoDialog = ({
    todoData,
    setTodos
}: AddTodoDialogProps) => {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <Dialog open={open} onOpenChange={() => setOpen(prev => !prev)}>
            <DialogTrigger asChild>
                <Button variant={"outline"} className="flex items-center gap-2">
                    <IoIosAddCircleOutline size={25} />
                </Button>
            </DialogTrigger>
            <DialogContent >
                <DialogHeader>
                    <DialogTitle>Create new todo</DialogTitle>
                </DialogHeader>

                <FormNewTodo setDialogState={setOpen} todoData={todoData} setTodos={setTodos} />
            </DialogContent>
        </Dialog>

    )
}
export default AddTodoDialog