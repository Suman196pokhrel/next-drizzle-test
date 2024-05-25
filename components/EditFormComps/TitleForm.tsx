"use client"
import { Todo } from "@/types/todo"
import { DialogHeader } from "../ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { TodoTitleSchema } from "@/lib/zod/schema"
import { Button } from "../ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { FiEdit2 } from "react-icons/fi";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { MdClose } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import ToggleEditButton from "./ToggleEditButton"




interface TitleFormProps {
    todo: Todo
}




const TitleForm = ({
    todo
}: TitleFormProps) => {

    const router = useRouter()
    const [fieldValue, setFieldValue] = useState(todo.title)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const form = useForm<z.infer<typeof TodoTitleSchema>>({
        resolver: zodResolver(TodoTitleSchema),
        defaultValues: {
            title: fieldValue
        }
    })

    const { isSubmitting, isValid } = form.formState
    const toggleEdit = () => setIsEditing((prev) => !prev)

    async function onSubmit(values: z.infer<typeof TodoTitleSchema>) {
        try {

            await axios.patch(`/api/todo/${todo.id}`, values)
            toast.success("Todo updated")
            toggleEdit()
            setFieldValue(values.title)

        } catch (error) {
            toast.error("Something went wrong")
            console.log("ERROR WHILE UPDATING TODO ", error)
        }
    }



    return (
        <div className={`flex ${isEditing ? 'items-start' : 'items-center'} justify-between w-3/6`}>

            {/* DEFAULT DATA DISPLAY WHEN USER IS NOT EDITING  */}
            {!isEditing && (
                <DialogHeader className=" font-bold text-2xl">
                    {fieldValue}
                </DialogHeader>
            )}


            {/* DISPLAY WHEN USER IS EDITING */}
            {isEditing && (
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-start  gap-2">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g 'Advanced web development'"
                                            {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />




                        <Button
                            type="submit"
                            className="flex items-center gap-3"
                            variant={"outline"}
                            disabled={isSubmitting}
                        >
                            <FaRegSave />

                            Save
                        </Button>

                    </form>


                </Form>
            )}


            {/* BUTTON TO EDIT / CANCLE  */}
            <ToggleEditButton isEditing={isEditing} isSubmitting={isSubmitting} toggleEdit={toggleEdit} />






        </div>
    )
}
export default TitleForm