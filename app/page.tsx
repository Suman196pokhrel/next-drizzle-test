"use client"
import Cards from "@/components/Cards";
import NavBar from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import todoData from "../mock-data/todos.json"
import { useEffect, useState } from "react";
import { Todo } from "@/types/todo";
import CardsSkeleton from "@/components/CardsSkeleton";
import { delay } from "@/utils/mocks";
import CardsControl from "@/components/CardsControl";
import { toast } from "sonner"


export default function Home() {

  const [todos, setTodos] = useState<Todo[] | undefined>(undefined)
  const [isFetching, setIsFetching] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  async function fetchTodos() {
    try {
      setIsFetching(true)
      // MOCK OPERATION THAT TAKES 2 SECONDS 
      // await delay(2000)
      const response = await fetch("http://localhost:3000/api/todo", {
        method: "GET"
      })


      // Parse the JSON data from the response
      const data = await response.json();


      // SET TODOS DATA TO LOCAL STATE
      setTodos(data)
      toast("Todos fetched successfully.")
    } catch (error) {
      console.log("PROBLEM FETCHING TODOS", error)
      toast("Error while fetching todos.")

    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])


  return (
    <main className="flex flex-col min-h-screen  p-2 space-y-20">
      <NavBar />

      <div className=" rounded-lg flex  w-full justify-center ">

        <div className="flex flex-col  gap-20 p-10  w-full xl:w-5/6">
          <SearchBar todoData={todos} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          <div className="flex flex-col gap-7">
            <CardsControl todoData={todos} />


            {!isFetching && todos && <Cards todoData={todos} searchQuery={searchQuery} />}

            {isFetching && <CardsSkeleton />}
          </div>

        </div>
      </div>
    </main>
  );
}
