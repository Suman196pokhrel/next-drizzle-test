import { Todo } from "@/types/todo";
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { CiSearch } from "react-icons/ci";
import { Dispatch, FormEvent, SetStateAction, useCallback, useEffect, useState } from "react";
import _ from "lodash"


interface SearchBarProps {
    todoData: Todo[] | undefined
    setSearchQuery: Dispatch<SetStateAction<string>>
    searchQuery: string
}

const SearchBar = ({ todoData, searchQuery, setSearchQuery }: SearchBarProps) => {


    return (
        <div className="flex items-center gap-5 w-full relative group">
            <Input
                type="search"
                value={searchQuery}
                disabled={!todoData}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="search for your todos . . ."
                className="pl-14 h-14 focus-visible:ring-0 text-lg peer focus-visible:pl-5 transition-all duration-200 bg-white drop-shadow-md  rounded-lg" />

            <div className="absolute top-4 left-5 transition-transform duration-200 peer-focus:scale-0 ">
                <CiSearch size={25} />
            </div>
            {/* <Button type="submit">Search</Button> */}
        </div>
    )
}
export default SearchBar