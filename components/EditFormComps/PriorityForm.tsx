import { Badge } from "../ui/badge"

interface PriorityFormProps {
    priority: string
}


const PriorityForm = ({
    priority
}: PriorityFormProps) => {
    return (
        <Badge variant={"outline"}>{priority}</Badge>
    )
}
export default PriorityForm