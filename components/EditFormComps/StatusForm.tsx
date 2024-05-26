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
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "../ui/command"
import { cn } from "@/lib/utils"
import { ArrowUpCircle, CheckCircle2, Circle, LucideIcon, XCircle } from "lucide-react"


type Status = {
    value: string
    label: string
    icon: LucideIcon
}

const statuses: Status[] = [
    {
        value: "Pending",
        label: "Pending",
        icon: Circle,
    },
    {
        value: "InProgress",
        label: "InProgress",
        icon: ArrowUpCircle,
    },
    {
        value: "Completed",
        label: "Completed",
        icon: CheckCircle2,
    },
    {
        value: "Canceled",
        label: "Canceled",
        icon: XCircle,
    },
]

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
    const [open, setOpen] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState<Status | null>(null)

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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-[150px] justify-start"
                                            disabled={isSubmitting}
                                        >
                                            {selectedStatus ? (
                                                <>
                                                    <selectedStatus.icon className="mr-2 h-4 w-4 shrink-0" />
                                                    {selectedStatus.label}
                                                </>
                                            ) : (
                                                <>+ Set status</>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0" side="right" align="start">
                                        <Command>
                                            {/* <CommandInput placeholder="Change status..." /> */}
                                            <CommandList>
                                                <CommandEmpty>No results found.</CommandEmpty>
                                                <CommandGroup >
                                                    {statuses.map((status) => (
                                                        <CommandItem
                                                            key={status.value}
                                                            value={status.value}
                                                            onSelect={(value) => {
                                                                const selected = statuses.find(s => s.value === value) || null
                                                                setSelectedStatus(selected)
                                                                // onChange(value) // call onChange provided via react-hook-form
                                                                setOpen(false)
                                                            }}
                                                        >
                                                            <status.icon
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    status.value === selectedStatus?.value
                                                                        ? "opacity-100"
                                                                        : "opacity-40"
                                                                )}
                                                            />
                                                            <span>{status.label}</span>
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}
export default StatusForm