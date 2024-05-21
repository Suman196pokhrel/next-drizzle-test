import { Todo } from "@/types/todo"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { ComboboxStatus } from "./ComboboxStatus"
import { ComboboxPriority } from "./ComboboxPriority"
import { motion } from "framer-motion"



interface TodoCardProps {
    todo: Todo
}



const TodoCard = ({
    todo
}: TodoCardProps) => {
    return (
        <Card className=" cursor-pointer bg-white hover:drop-shadow-xl transition-all ease-in-out duration-200 hover:scale-105 ">
            <CardHeader className="pb-3">
                <h2 className="font-bold text-2xl capitalize">{todo.title}</h2>
            </CardHeader>
            <CardContent className=" ">
                <p className=" text-gray-500 text-sm line-clamp-2">{todo.description}</p>
            </CardContent>
            <CardFooter className="flex items-center space-x-4  mt-3 ">

                {/* TODO: remove combobox component , we dont allow users to edit it directly from here , instead use badges to show details */}
                {/* <ComboboxStatus status={todo.status} /> */}
                {/* <ComboboxPriority prirority={todo.priority} /> */}
                <div className="w-1/3 ">
                    <p className=" text-slate-500 text-xs">{todo.dueDate}</p>
                </div>

            </CardFooter>
        </Card>
    )
}
export default TodoCard