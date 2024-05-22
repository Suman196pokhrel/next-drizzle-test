import { Todo } from "@/types/todo"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Badge } from "./ui/badge"



interface TodoCardProps {
    todo: Todo
}



const TodoCard = ({
    todo
}: TodoCardProps) => {
    return (
        <Card className=" cursor-pointer bg-white hover:drop-shadow-xl transition-all ease-in-out duration-150 hover:scale-105 h-44 ">
            <CardHeader className="pb-3">
                <h2 className="font-bold text-2xl capitalize">{todo.title}</h2>
            </CardHeader>
            <CardContent className="">
                <p className=" text-gray-500 text-sm line-clamp-2">{todo.description}</p>
            </CardContent>
            <CardFooter className="flex items-center space-x-4 ">

                <Badge variant={"outline"}>{todo.status}</Badge>
                <Badge variant={"outline"}>{todo.priority}</Badge>

                <div className="w-1/3 ">
                    <p className=" text-slate-500 text-xs">{todo.dueDate}</p>
                </div>

            </CardFooter>
        </Card>
    )
}
export default TodoCard