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




interface TitleFormProps {
    todo: Todo
}




const TitleForm = ({
    todo
}: TitleFormProps) => {

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const form = useForm<z.infer<typeof TodoTitleSchema>>({
        resolver: zodResolver(TodoTitleSchema),
        defaultValues: {
            title: todo.title
        }
    })

    const { isSubmitting, isValid } = form.formState
    const toggleEdit = () => setIsEditing((prev) => !prev)

    async function onSubmit(values: z.infer<typeof TodoTitleSchema>) {
        console.log(values)
    }



    return (
        <div className="flex items-start justify-between w-1/2">

            {/* DEFAULT DATA DISPLAY WHEN USER IS NOT EDITING  */}
            {!isEditing && (
                <DialogHeader className=" font-bold text-2xl">
                    {todo.title}
                </DialogHeader>
            )}


            {/* DISPLAY WHEN USER IS EDITING */}
            {isEditing && (
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-start  gap-5">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    {/* <FormLabel>Title</FormLabel> */}
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




                        <Button type="submit" className="flex items-center gap-3" >
                            <FaRegSave />

                            Save
                        </Button>

                    </form>


                </Form>
            )}



            {/* BUTTON TO EDIT / CANCLE  */}
            <div
                className=""
                onClick={toggleEdit}
            >
                {isEditing ? (
                    <Button className="flex items-center gap-3">
                        <MdClose />

                        Cancel
                    </Button>
                ) : (
                    <Button className="flex items-center gap-3">
                        <FiEdit2 />
                        <p>Edit</p>
                    </Button>
                )}
            </div>




        </div>
    )
}
export default TitleForm