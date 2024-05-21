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





const FormNewTodo = () => {
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


    function onSubmit(values: z.infer<typeof NewTodoFormSchema>) {
        console.log(values)
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
                                    <Input placeholder="enter a title for your todo" {...field} />
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
                                    <Input placeholder=" . . ." {...field} />
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
                                    <ComboboxStatus status={field.value} onChange={field.onChange} />
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
                                    <ComboboxPriority prirority={field.value} onChange={field.onChange} />
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
                                        <DueDatePicker value={field.value} onChange={field.onChange} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit" className=" mt-10 h-12 flex items-center gap-2 text-lg group ">
                    <IoIosAddCircleOutline size={25} />
                    Add
                </Button>

            </form>
        </Form>
    )
}
export default FormNewTodo