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

type Status = {
    value: string
    label: string
    icon: IconType
}

const statuses: Status[] = [
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
    prirority
}: { prirority: string }) {
    const [open, setOpen] = React.useState(false)
    const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(null)


    React.useEffect(() => {
        if (prirority) {
            // CHECK WHICH STATUS IS PROVIDED BY PARENT
            const initialPriority = statuses.find(s => s.value === prirority) || null


            // set that status as selected status 
            setSelectedStatus(initialPriority)

        }
    }, [prirority])


    return (
        <div className="flex items-center space-x-4">
            {/* <p className="text-sm text-muted-foreground">Status</p> */}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-[150px] justify-start"
                    >
                        {selectedStatus ? (
                            <>
                                <selectedStatus.icon className="mr-2 h-4 w-4 shrink-0" />
                                {selectedStatus.label}
                            </>
                        ) : (
                            <>+ Set priority</>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" side="right" align="start">
                    <Command>
                        <CommandInput placeholder="Change status..." />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                                {statuses.map((status) => (
                                    <CommandItem
                                        key={status.value}
                                        value={status.value}
                                        onSelect={(value) => {
                                            setSelectedStatus(
                                                statuses.find((priority) => priority.value === value) ||
                                                null
                                            )
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
        </div>
    )
}
