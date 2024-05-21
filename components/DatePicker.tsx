"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


interface DueDatePickerProps {
    value: Date
    onChange: (...event: any[]) => void
    isSubmitting: boolean
}


function DueDatePicker({
    value,
    onChange,
    isSubmitting
}: DueDatePickerProps) {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    disabled={isSubmitting}
                    className={cn(
                        " min-w-40 justify-start text-left font-normal",
                        !value && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value ? format(value, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={onChange}
                    disabled={(value) => {
                        const today = new Date();
                        const dateToCheck = new Date(value);

                        // Set both dates to the start of the day (midnight)
                        today.setHours(0, 0, 0, 0);
                        dateToCheck.setHours(0, 0, 0, 0);

                        // Disable past dates
                        return dateToCheck < today;
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}


export default DueDatePicker
