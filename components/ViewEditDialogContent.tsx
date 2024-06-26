import { Todo } from "@/types/todo"
import { DialogFooter, DialogHeader } from "./ui/dialog"
import { Badge } from "./ui/badge"
import TitleForm from "./EditFormComps/TitleForm"
import DescriptionForm from "./EditFormComps/DescriptionForm"
import StatusForm from "./EditFormComps/StatusForm"
import PriorityForm from "./EditFormComps/PriorityForm"
import DueDateForm from "./EditFormComps/DueDateForm"

interface ViewEditDialogContentProps {
    todo: Todo
}


const ViewEditDialogContent = ({
    todo
}: ViewEditDialogContentProps) => {
    return (
        <div className="flex flex-col items-start gap-5">

            <TitleForm todo={todo} />

            <DescriptionForm todo={todo} />

            <DialogFooter className="flex items-center gap-5">
                <StatusForm todo={todo} />
                <PriorityForm todo={todo} />
                <DueDateForm todo={todo} />
            </DialogFooter>
        </div>
    )
}
export default ViewEditDialogContent