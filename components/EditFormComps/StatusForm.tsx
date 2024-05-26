import { Todo } from "@/types/todo"
import { Badge } from "../ui/badge"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { TodoStatusSchema } from "@/lib/zod/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import axios from "axios"
import { toast } from "sonner"


interface StatusFormProps {
    todo: Todo
}


const StatusForm = ({
    todo
}: StatusFormProps) => {

    const router = useRouter()
    const [fieldValue, setFieldValue] = useState(todo.status)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const form = useForm<z.infer<typeof TodoStatusSchema>>({
        resolver: zodResolver(TodoStatusSchema),
        defaultValues: {
            status: fieldValue
        }
    })

    const { isSubmitting, isValid } = form.formState
    const toggleEdit = () => setIsEditing((prev) => !prev)


    async function onSubmit(values: z.infer<typeof TodoStatusSchema>) {
        try {

            await axios.patch(`/api/todo/${todo.id}`, values)
            toast.success("Todo updated")
            toggleEdit()
            setFieldValue(values.status)

        } catch (error) {
            toast.error("Something went wrong")
            console.log("ERROR WHILE UPDATING TODO ", error)
        }
    }


    return (
        <Badge variant={"outline"}>{todo.status}</Badge>
    )
}
export default StatusForm