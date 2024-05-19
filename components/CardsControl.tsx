"use client"
import { Button } from "./ui/button"
import { IoIosAddCircleOutline } from "react-icons/io";
import { Separator } from "@/components/ui/separator"
import { CiViewTable } from "react-icons/ci";
import { CiGrid41 } from "react-icons/ci";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { useState } from "react";
import { Todo } from "@/types/todo";
import { Skeleton } from "./ui/skeleton";



const CardsControl = ({
    todoData
}: {
    todoData: Todo[] | undefined
}) => {

    const [viewMode, setViewMode] = useState("cards")



    return (
        <section className="flex items-center space-x-5 border-[1px] border-gray-200 rounded-lg p-2">
            <TooltipProvider>

                {/* NEW TODO  */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant={"outline"} disabled={!todoData} className="flex items-center gap-2">
                            <IoIosAddCircleOutline size={25} />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className=" font-medium">Create new todo</p>
                    </TooltipContent>
                </Tooltip>




                <Separator orientation="vertical" className=" h-10" />


                {/* VIEW MODE TOGGLE BUTTON  */}

                {todoData ? (
                    <>
                        <ToggleGroup type="single" value={viewMode} onValueChange={(value) => setViewMode(value)} className="border-2 rounded-md ">


                            <ToggleGroupItem value="cards">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div>
                                            <CiGrid41 size={25} />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Cards view</p>
                                    </TooltipContent>
                                </Tooltip>
                            </ToggleGroupItem>


                            <ToggleGroupItem value="table">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div>
                                            <CiViewTable size={25} />
                                        </div>

                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>table view</p>
                                    </TooltipContent>
                                </Tooltip>
                            </ToggleGroupItem>



                        </ToggleGroup>
                    </>
                ) : (
                    <div className="flex items-center gap-2">
                        <Skeleton className="w-12 h-12" />
                        <Skeleton className="w-12 h-12" />
                    </div>
                )}




                <Separator orientation="vertical" className=" h-10" />






            </TooltipProvider>


        </section>
    )
}
export default CardsControl