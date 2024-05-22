"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { IconType } from "react-icons"
import { TbCircleLetterH, TbCircleLetterL, TbCircleLetterM } from "react-icons/tb"

type Priority = {
    value: string
    label: string
    icon: IconType
}

const priorities: Priority[] = [
    {
        value: "Low",
        label: "Low",
        icon: TbCircleLetterL,
    },
    {
        value: "Medium",
        label: "Medium",
        icon: TbCircleLetterM,
    },
    {
        value: "High",
        label: "High",
        icon: TbCircleLetterH,
    },

]

export function ComboboxPriority({
    prirority,
    onChange,
    isSubmitting
}: { prirority: string, onChange: (...event: any[]) => void, isSubmitting: boolean }) {
    const [open, setOpen] = React.useState(false)
    const [selectedPriority, setSelectedPriority] = React.useState<Priority | null>(null)


    React.useEffect(() => {
        if (prirority) {
            // CHECK WHICH STATUS IS PROVIDED BY PARENT
            const initialPriority = priorities.find(s => s.value === prirority) || null


            // set that status as selected status 
            setSelectedPriority(initialPriority)

        }
    }, [prirority])


    return (
        <div className="flex items-center space-x-4 w-1/3">
            {/* <p className="text-sm text-muted-foreground">Status</p> */}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-[150px] justify-start"
                        disabled={isSubmitting}

                    >
                        {selectedPriority ? (
                            <>
                                <selectedPriority.icon className="mr-2 h-4 w-4 shrink-0" />
                                {selectedPriority.label}
                            </>
                        ) : (
                            <>+ Set priority</>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" side="right" align="start">
                    <Command>
                        {/* <CommandInput placeholder="Change status..." /> */}
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                                {priorities.map((item) => (
                                    <CommandItem
                                        key={item.value}
                                        value={item.value}
                                        onSelect={(value) => {
                                            // const selected = statuses.find((priority) => priority.value === value) || null
                                            const selected = priorities.find(s => s.value === value) || null
                                            setSelectedPriority(selected)
                                            onChange(value)
                                            setOpen(false)
                                        }}
                                    >
                                        <item.icon
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                item.value === selectedPriority?.value
                                                    ? "opacity-100"
                                                    : "opacity-40"
                                            )}
                                        />
                                        <span>{item.label}</span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
