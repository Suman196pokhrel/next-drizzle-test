import { Badge } from "../ui/badge"


interface StatusFormProps {
    status: string
}


const StatusForm = ({
    status
}: StatusFormProps) => {
    return (
        <Badge variant={"outline"}>{status}</Badge>
    )
}
export default StatusForm