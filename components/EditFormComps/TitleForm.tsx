import { DialogHeader } from "../ui/dialog"

interface TitleFormProps {
    title: string
}



const TitleForm = ({
    title
}: TitleFormProps) => {
    return (
        <DialogHeader className=" font-bold text-2xl">
            {title}
        </DialogHeader>
    )
}
export default TitleForm