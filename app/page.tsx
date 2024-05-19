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

export default function Home() {

  const [todos, setTodos] = useState<Todo[] | undefined>(undefined)
  const [isFetching, setIsFetching] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  async function fetchTodos() {
    try {
      setIsFetching(true)
      // MOCK OPERATION THAT TAKES 2 SECONDS 
      await delay(2000)

      // SET TODOS DATA TO LOCAL STATE
      setTodos(todoData)
    } catch (error) {
      console.log("PROBLEM FETCHING TODOS")
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

      <div className="border-2 rounded-lg flex flex-col gap-16 p-10">
        <SearchBar todoData={todos} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <CardsControl />


        {!isFetching && todos && <Cards todoData={todos} searchQuery={searchQuery} />}

        {isFetching && <CardsSkeleton />}

      </div>
    </main>
  );
}
