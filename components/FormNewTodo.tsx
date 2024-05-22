"use client"
import { z } from "zod"
import { NewTodoFormSchema } from "../lib/zod/schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
// FORM UI COMPONENTS 
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ComboboxStatus } from "./ComboboxStatus"
import { ComboboxPriority } from "./ComboboxPriority"
import DueDatePicker from "./DatePicker"
// ICONS 
import { IoIosAddCircleOutline } from "react-icons/io";
import { toast } from "sonner"
import { delay } from "@/utils/mocks"
import { MoonLoader } from "react-spinners"
import { Dispatch, SetStateAction } from "react"
import { Todo } from "@/types/todo"


interface FormNewTodoProps {
    setDialogState: Dispatch<SetStateAction<boolean>>
    todoData: Todo[] | undefined
    setTodos: Dispatch<SetStateAction<Todo[] | undefined>>
}


const FormNewTodo = ({
    setDialogState,
    todoData,
    setTodos
}: FormNewTodoProps) => {
    const form = useForm<z.infer<typeof NewTodoFormSchema>>({
        resolver: zodResolver(NewTodoFormSchema),
        defaultValues: {
            title: "",
            description: "",
            status: "Pending",
            priority: "Medium",
            dueDate: new Date(),
        }
    })


    async function onSubmit(values: z.infer<typeof NewTodoFormSchema>) {
        try {

            // MOCK API CALL
            const response = await fetch("/api/todo", {
                method: "POST",
                headers: {
                    'Content-Type': 'application-json'
                },
                body: JSON.stringify(values)

            })

            const result = await response.json();
            form.reset()
            setTodos((prev) => {
                if (prev) {
                    return [...prev, ...result.newTodo]
                }
            })
            setDialogState((prev) => !prev)


            toast("Successfully added new todo.")
        } catch (error) {
            toast("Something went wrong while adding new todo!.")
            console.log("ERROR OCCOURED WHILE ADDING NEW TODO => ", error)
        }

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="gap-5 flex flex-col pt-3">


                <div className=" space-y-8">
                    {/* TITLE  */}
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="enter a title for your todo"
                                        disabled={form.formState.isSubmitting}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* DESCRIPTION  */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder=" . . ."
                                        disabled={form.formState.isSubmitting}
                                        {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* DETAILS  */}
                <div className="flex items-center">
                    {/* STATUS  */}
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <FormControl>
                                    <ComboboxStatus status={field.value} onChange={field.onChange} isSubmitting={form.formState.isSubmitting} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* PRIORITY  */}
                    <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Priority</FormLabel>
                                <FormControl>
                                    <ComboboxPriority prirority={field.value} onChange={field.onChange} isSubmitting={form.formState.isSubmitting} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* DUEDATE  */}
                    <FormField
                        control={form.control}
                        name="dueDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Due Date</FormLabel>
                                <FormControl>
                                    <div className="w-full ">
                                        <DueDatePicker value={field.value} onChange={field.onChange} isSubmitting={form.formState.isSubmitting} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="w-full mt-10 h-12 flex items-center gap-2 text-lg group ">
                    {form.formState.isSubmitting ? (<><MoonLoader size={25} color="white" /></>) : (<><IoIosAddCircleOutline size={25} /></>)}
                    Add
                </Button>

            </form>
        </Form>
    )
}
export default FormNewTodo