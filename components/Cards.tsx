import { Todo } from "@/types/todo"
import TodoCard from "./TodoCard"
import { motion, AnimatePresence } from "framer-motion"


interface CardsProps {
    todoData: Todo[]
    searchQuery: string
}

const Cards = ({ todoData, searchQuery }: CardsProps) => {


    const filteredItems = todoData.filter((item) => item.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()))


    return (
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 ">
            <AnimatePresence>
                {filteredItems.map((data, index) => (
                    <motion.div
                        key={index}
                        initial={{ y: 50, opacity: 0, scale: 0 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: -50, scale: 0, transition: { duration: 0.2 } }}
                        transition={{ delay: index * (0.1 / Math.min(filteredItems.length, 20)) }}

                    >
                        <TodoCard todo={data} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </section>
    )
}
export default Cards


// LOGIC EXPLAINED 
// when the searchQuery state changes in the Home component(as a result of user input in the SearchBar component), React re - renders the Home component and passes the updated searchQuery value to the Cards component as a prop.
// 
// Since the searchQuery prop in the Cards component changes, React re - evaluates the expression that calculates the filteredItems every time the searchQuery changes.