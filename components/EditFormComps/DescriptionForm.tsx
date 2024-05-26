import { TodoDescriptionSchema } from "@/lib/zod/schema"
import { Todo } from "@/types/todo"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "../ui/button"
import { MdClose } from "react-icons/md"
import { FiEdit2 } from "react-icons/fi"
import { FaRegSave } from "react-icons/fa"
import { DialogDescription } from "../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import ToggleEditButton from "./ToggleEditButton"

interface DescriptionFormProps {
    todo: Todo
}


const DescriptionForm = ({
    todo
}: DescriptionFormProps) => {

    const router = useRouter()
    const [fieldValue, setFieldValue] = useState(todo.description)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const form = useForm<z.infer<typeof TodoDescriptionSchema>>({
        resolver: zodResolver(TodoDescriptionSchema),
        defaultValues: {
            description: fieldValue
        }
    })

    const { isSubmitting, isValid } = form.formState
    const toggleEdit = () => setIsEditing((prev) => !prev)


    async function onSubmit(values: z.infer<typeof TodoDescriptionSchema>) {
        try {

            await axios.patch(`/api/todo/${todo.id}`, values)
            toast.success("Todo updated")
            toggleEdit()
            setFieldValue(values.description)

        } catch (error) {
            toast.error("Something went wrong")
            console.log("ERROR WHILE UPDATING TODO ", error)
        }
    }



    return (
        // <div className=" text-slate-600 text-sm p-2 bg-gray-100 rounded-lg">
        <div className={`flex ${isEditing ? 'items-start' : 'items-center'} justify-between  w-11/12`}>

            {/* DEFAULT DATA DISPLAY WHEN USER IS NOT EDITING  */}
            {!isEditing && (
                <DialogDescription className=" text-md text-gray-700 bg text-justify w-10/12">
                    {fieldValue}
                </DialogDescription>
            )}


            {/* DISPLAY WHEN USER IS EDITING */}
            {isEditing && (
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-start  gap-2">
                        <FormField
                            control={form.control}
                            name="description"
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
        // </div>
    )
}
export default DescriptionForm